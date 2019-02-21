import * as React from 'react';
import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { MediaSingle, WithProviders } from '@atlaskit/editor-common';
import { CardEvent } from '@atlaskit/media-card';
import { MediaClientConfig } from '@atlaskit/media-core';
import { MediaClient } from '@atlaskit/media-client';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { stateKey, MediaPluginState } from '../pm-plugins/main';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import MediaItem from './media';
import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import { setNodeSelection } from '../../../utils';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import { createDisplayGrid } from '../../../plugins/grid';
import { EventDispatcher } from '../../../event-dispatcher';
import { MediaProvider } from '../types';
import { EditorAppearance } from '../../../types';

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 200;

export interface MediaSingleNodeProps {
  node: PMNode;
  eventDispatcher: EventDispatcher;
  view: EditorView;
  width: number;
  selected: Function;
  getPos: () => number;
  lineLength: number;
  editorAppearance: EditorAppearance;
  mediaProvider?: Promise<MediaProvider>;
}

export interface MediaSingleNodeState {
  width?: number;
  height?: number;
  viewMediaClientConfig?: MediaClientConfig;
}

export default class MediaSingleNode extends Component<
  MediaSingleNodeProps,
  MediaSingleNodeState
> {
  private mediaPluginState: MediaPluginState;

  state = {
    height: undefined,
    width: undefined,
    viewContext: undefined,
  };

  constructor(props) {
    super(props);
    this.mediaPluginState = stateKey.getState(
      this.props.view.state,
    ) as MediaPluginState;
  }

  async componentDidMount() {
    const mediaProvider = await this.props.mediaProvider;
    if (mediaProvider) {
      const viewMediaClientConfig = await mediaProvider.viewMediaClientConfig;
      this.setState({
        viewMediaClientConfig,
      });
    }
    const updatedDimensions = await this.getRemoteDimensions();
    if (updatedDimensions) {
      this.mediaPluginState.updateMediaNodeAttrs(
        updatedDimensions.id,
        {
          height: updatedDimensions.height,
          width: updatedDimensions.width,
        },
        true,
      );
    }
  }

  async getRemoteDimensions() {
    const mediaProvider = await this.props.mediaProvider;
    if (!mediaProvider || !this.props.node.firstChild) {
      return false;
    }
    const { id, collection, height, width } = this.props.node.firstChild.attrs;
    if (height && width) {
      return;
    }
    const viewMediaClientConfig = await mediaProvider.viewMediaClientConfig;
    const mediaClient = new MediaClient(viewMediaClientConfig);
    const state = await mediaClient.getImageMetadata(id, {
      collection,
    });

    if (!state || !state.original) {
      return false;
    }

    return {
      id,
      height: state.original.height,
      width: state.original.width,
    };
  }

  private onExternalImageLoaded = ({ width, height }) => {
    this.setState(
      {
        width,
        height,
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  selectMediaSingle = ({ event }: CardEvent) => {
    // We need to call "stopPropagation" here in order to prevent the browser from navigating to
    // another URL if the media node is wrapped in a link mark.
    event.stopPropagation();
    setNodeSelection(this.props.view, this.props.getPos());
  };

  updateSize = (width: number | null, layout: MediaSingleLayout) => {
    const { state, dispatch } = this.props.view;
    const pos = this.props.getPos();
    if (typeof pos === 'undefined') {
      return;
    }
    return dispatch(
      state.tr.setNodeMarkup(pos, undefined, {
        ...this.props.node.attrs,
        layout,
        width,
      }),
    );
  };

  render() {
    const {
      selected,
      getPos,
      node,
      view: { state },
      editorAppearance,
    } = this.props;

    const { layout, width: mediaSingleWidth } = node.attrs;
    const childNode = node.firstChild!;

    let { width, height, type } = childNode.attrs;

    if (type === 'external') {
      const { width: stateWidth, height: stateHeight } = this.state;

      if (width === null) {
        width = stateWidth || DEFAULT_WIDTH;
      }

      if (height === null) {
        height = stateHeight || DEFAULT_HEIGHT;
      }
    }

    let canResize = !!this.mediaPluginState.options.allowResizing;

    const pos = getPos();
    if (pos) {
      const $pos = state.doc.resolve(pos);
      const { table, layoutSection } = state.schema.nodes;
      const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [
        table,
        layoutSection,
      ]);
      canResize = canResize && !disabledNode;
    }

    if (width === null || height === null) {
      width = DEFAULT_WIDTH;
      height = DEFAULT_HEIGHT;
    }

    const cardWidth = this.props.width;
    const cardHeight = (height / width) * cardWidth;
    const cardDimensions = {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
    };

    const props = {
      layout,
      width,
      height,

      containerWidth: this.props.width,
      lineLength: this.props.lineLength,
      pctWidth: mediaSingleWidth,
    };

    const MediaChild = (
      <MediaItem
        node={childNode}
        view={this.props.view}
        getPos={this.props.getPos}
        cardDimensions={cardDimensions}
        viewMediaClientConfig={this.state.viewContext}
        selected={selected()}
        onClick={this.selectMediaSingle}
        onExternalImageLoaded={this.onExternalImageLoaded}
        editorAppearance={editorAppearance}
      />
    );

    return canResize ? (
      <ResizableMediaSingle
        {...props}
        view={this.props.view}
        getPos={getPos}
        updateSize={this.updateSize}
        displayGrid={createDisplayGrid(this.props.eventDispatcher)}
        gridSize={12}
        viewMediaClientConfig={this.state.viewContext}
        state={this.props.view.state}
        appearance={this.mediaPluginState.options.appearance}
        selected={this.props.selected()}
      >
        {MediaChild}
      </ResizableMediaSingle>
    ) : (
      <MediaSingle {...props}>{MediaChild}</MediaSingle>
    );
  }
}

class MediaSingleNodeView extends ReactNodeView {
  lastOffsetLeft = 0;

  render() {
    const { eventDispatcher, editorAppearance } = this.reactComponentProps;
    const mediaPluginState = stateKey.getState(
      this.view.state,
    ) as MediaPluginState;

    return (
      <WithProviders
        providers={['mediaProvider']}
        providerFactory={mediaPluginState.options.providerFactory}
        renderNode={({ mediaProvider }) => {
          return (
            <WithPluginState
              editorView={this.view}
              plugins={{
                width: widthPluginKey,
                reactNodeViewState: reactNodeViewStateKey,
              }}
              render={({ width, reactNodeViewState }) => {
                return (
                  <MediaSingleNode
                    width={width.width}
                    lineLength={width.lineLength}
                    node={this.node}
                    getPos={this.getPos}
                    mediaProvider={mediaProvider}
                    view={this.view}
                    selected={() => this.getPos() === reactNodeViewState}
                    eventDispatcher={eventDispatcher}
                    editorAppearance={editorAppearance}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }

  ignoreMutation() {
    if (this.dom) {
      const offsetLeft = this.dom.offsetLeft;

      if (offsetLeft !== this.lastOffsetLeft) {
        this.lastOffsetLeft = offsetLeft;
        this.update(this.node, [], () => true);
      }
    }

    return true;
  }
}

export const ReactMediaSingleNode = (
  portalProviderAPI,
  eventDispatcher,
  editorAppearance,
) => (node: PMNode, view: EditorView, getPos: () => number) => {
  return new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
    eventDispatcher,
    editorAppearance,
  }).init();
};
