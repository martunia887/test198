import * as React from 'react';
import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, Decoration } from 'prosemirror-view';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import {
  MediaSingle,
  WithProviders,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  browser,
  ProviderFactory,
} from '@atlaskit/editor-common';
import { CardEvent } from '@atlaskit/media-card';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { NodeSelection } from 'prosemirror-state';
import { MediaClientConfig } from '@atlaskit/media-core';

import { SelectionBasedNodeView } from '../../../nodeviews/ReactNodeView';
import MediaItem from './media';
import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { setNodeSelection } from '../../../utils';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import { createDisplayGrid } from '../../../plugins/grid';
import { EventDispatcher } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
<<<<<<< HEAD
import { MediaOptions } from '../index';
import { stateKey as mediaPluginKey } from '../pm-plugins/main';
import { updateMediaNodeAttrs, replaceExternalMedia } from '../commands';

=======
import { MediaOptions } from '../';
import { replaceExternalMedia } from '../commands';
import { stateKey as mediaPluginKey, MediaProvider } from '../pm-plugins/main';
>>>>>>> Tests for external media upload
import { isMobileUploadCompleted } from '../commands/helpers';
import { MediaSingleNodeProps, MediaSingleNodeViewProps } from './types';
import { MediaNodeUpdater } from './mediaNodeUpdater';
import {
  getViewMediaClientConfigFromMediaProvider,
  getUploadMediaClientConfigFromMediaProvider,
} from '../utils/media-common';
import { getMediaClient } from '@atlaskit/media-client';

export interface MediaSingleNodeState {
  width?: number;
  height?: number;
  viewMediaClientConfig?: MediaClientConfig;
}

export default class MediaSingleNode extends Component<
  MediaSingleNodeProps,
  MediaSingleNodeState
> {
  static defaultProps: Partial<MediaSingleNodeProps> = {
    mediaOptions: {},
  };

  mediaNodeUpdater: MediaNodeUpdater;

  constructor(props: MediaSingleNodeProps) {
    super(props);

    this.mediaNodeUpdater = new MediaNodeUpdater(props);
  }

  state = {
    width: undefined,
    height: undefined,
    viewMediaClientConfig: undefined,
  };

  componentWillReceiveProps(nextProps: MediaSingleNodeProps) {
    if (nextProps.mediaProvider !== this.props.mediaProvider) {
      this.setViewMediaClientConfig(nextProps);
    }
  }

  setViewMediaClientConfig = async (props: MediaSingleNodeProps) => {
    const mediaProvider = await props.mediaProvider;
    if (mediaProvider) {
      const viewMediaClientConfig = await getViewMediaClientConfigFromMediaProvider(
        mediaProvider,
      );

      this.setState({
        viewMediaClientConfig,
      });
    }
  };

  async componentDidMount() {
    const mediaProvider = await this.props.mediaProvider;

    if (!mediaProvider) {
      return;
    }
    await this.uploadExternalMedia(mediaProvider);
    await this.updateRemoteDimensions(mediaProvider);
  }

  private onExternalImageLoaded = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
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

  updateRemoteDimensions = async (mediaProvider: MediaProvider) => {
    const viewMediaClientConfig = await getViewMediaClientConfigFromMediaProvider(
      mediaProvider,
    );

    this.setState({
      viewMediaClientConfig,
    });

    const { node } = this.props;
    const childNode = node.firstChild;

    if (!childNode || childNode.attrs.type === 'external') {
      return;
    }

    const updatedDimensions = await this.mediaNodeUpdater.getRemoteDimensions();
    if (updatedDimensions) {
      this.mediaNodeUpdater.updateDimensions(updatedDimensions);
    }

    const contextId = this.mediaNodeUpdater.getCurrentContextId();
    if (!contextId) {
      await this.mediaNodeUpdater.updateContextId();
    }

    const isNodeFromDifferentCollection = await this.mediaNodeUpdater.isNodeFromDifferentCollection();

    if (isNodeFromDifferentCollection) {
      this.mediaNodeUpdater.copyNode();
    }
  };

  uploadExternalMedia = async (mediaProvider: MediaProvider) => {
    const { firstChild } = this.props.node;

    if (
      firstChild &&
      firstChild.attrs.type === 'external' &&
      !firstChild.attrs.__external
    ) {
      const uploadMediaClientConfig = await getUploadMediaClientConfigFromMediaProvider(
        mediaProvider,
      );
      if (!uploadMediaClientConfig) {
        return;
      }
      const mediaClient = getMediaClient({
        mediaClientConfig: uploadMediaClientConfig,
      });

      const collection =
        mediaProvider.uploadParams && mediaProvider.uploadParams.collection;

      try {
        const {
          uploadableFileUpfrontIds,
          dimensions,
        } = await mediaClient.file.uploadExternal(
          firstChild.attrs.url,
          collection,
        );

        replaceExternalMedia(this.props.getPos(), {
          id: uploadableFileUpfrontIds.id,
          collection,
          height: dimensions.height,
          width: dimensions.width,
        })(this.props.view.state, this.props.view.dispatch);
      } catch (e) {
        //keep it an external image
      }
    }
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
      mediaPluginOptions,
      fullWidthMode,
    } = this.props;

    const { layout, width: mediaSingleWidth } = node.attrs;
    const childNode = node.firstChild!;

    let { width, height, type } = childNode.attrs;

    if (type === 'external') {
      const { width: stateWidth, height: stateHeight } = this.state;

      if (width === null) {
        width = stateWidth || DEFAULT_IMAGE_WIDTH;
      }

      if (height === null) {
        height = stateHeight || DEFAULT_IMAGE_HEIGHT;
      }
    }

    let canResize = !!this.props.mediaOptions.allowResizing;

    const pos = getPos();
    if (pos) {
      const $pos = state.doc.resolve(pos);
      const { table } = state.schema.nodes;
      const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [table]);
      canResize = canResize && !disabledNode;
    }

    if (width === null || height === null) {
      width = DEFAULT_IMAGE_WIDTH;
      height = DEFAULT_IMAGE_HEIGHT;
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

      fullWidthMode,
    };

    const uploadComplete = isMobileUploadCompleted(
      this.props.mediaPluginState,
      childNode.attrs.id,
    );

    const MediaChild = (
      <MediaItem
        view={this.props.view}
        node={childNode}
        getPos={this.props.getPos}
        cardDimensions={cardDimensions}
        viewMediaClientConfig={this.state.viewMediaClientConfig}
        selected={selected()}
        onClick={this.selectMediaSingle}
        onExternalImageLoaded={this.onExternalImageLoaded}
        allowLazyLoading={
          mediaPluginOptions && mediaPluginOptions.allowLazyLoading
        }
        uploadComplete={uploadComplete}
        url={childNode.attrs.url}
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
        viewMediaClientConfig={this.state.viewMediaClientConfig}
        state={this.props.view.state}
        allowBreakoutSnapPoints={
          mediaPluginOptions && mediaPluginOptions.allowBreakoutSnapPoints
        }
        selected={this.props.selected()}
      >
        {MediaChild}
      </ResizableMediaSingle>
    ) : (
      <MediaSingle {...props}>{MediaChild}</MediaSingle>
    );
  }
}

class MediaSingleNodeView extends SelectionBasedNodeView<
  MediaSingleNodeViewProps
> {
  lastOffsetLeft = 0;
  forceViewUpdate = false;

  createDomRef(): HTMLElement {
    const domRef = document.createElement('div');
    if (
      browser.chrome &&
      this.reactComponentProps.mediaPluginOptions &&
      this.reactComponentProps.mediaPluginOptions.allowMediaSingleEditable
    ) {
      // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
      // see also: https://github.com/ProseMirror/prosemirror/issues/884
      domRef.contentEditable = 'true';
    }
    return domRef;
  }

  viewShouldUpdate(nextNode: PMNode) {
    if (this.forceViewUpdate) {
      this.forceViewUpdate = false;
      return true;
    }

    if (this.node.attrs !== nextNode.attrs) {
      return true;
    }

    return super.viewShouldUpdate(nextNode);
  }

  getNodeMediaId(node: PMNode): string | undefined {
    if (node.firstChild) {
      return node.firstChild.attrs.id;
    }
    return undefined;
  }

  update(
    node: PMNode,
    decorations: Decoration[],
    isValidUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean,
  ) {
    if (!isValidUpdate) {
      isValidUpdate = (currentNode, newNode) =>
        this.getNodeMediaId(currentNode) === this.getNodeMediaId(newNode);
    }
    return super.update(node, decorations, isValidUpdate);
  }

  render() {
    const {
      eventDispatcher,
      fullWidthMode,
      providerFactory,
      mediaOptions,
      mediaPluginOptions,
    } = this.reactComponentProps;

    return (
      <WithProviders
        providers={['mediaProvider', 'contextIdentifierProvider']}
        providerFactory={providerFactory}
        renderNode={({ mediaProvider, contextIdentifierProvider }) => {
          return (
            <WithPluginState
              editorView={this.view}
              plugins={{
                width: widthPluginKey,
                mediaPluginState: mediaPluginKey,
              }}
              render={({ width, mediaPluginState }) => {
                const { selection } = this.view.state;
                const isSelected = () =>
                  this.isSelectionInsideNode(selection.from, selection.to) ||
                  (selection instanceof NodeSelection &&
                    selection.from === this.getPos());

                return (
                  <MediaSingleNode
                    width={width.width}
                    lineLength={width.lineLength}
                    node={this.node}
                    getPos={this.getPos}
                    mediaProvider={mediaProvider}
                    contextIdentifierProvider={contextIdentifierProvider}
                    mediaOptions={mediaOptions || {}}
                    view={this.view}
                    fullWidthMode={fullWidthMode}
                    selected={isSelected}
                    eventDispatcher={eventDispatcher}
                    mediaPluginOptions={mediaPluginOptions}
                    mediaPluginState={mediaPluginState}
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
    // DOM has changed; recalculate if we need to re-render
    if (this.dom) {
      const offsetLeft = this.dom.offsetLeft;

      if (offsetLeft !== this.lastOffsetLeft) {
        this.lastOffsetLeft = offsetLeft;
        this.forceViewUpdate = true;

        this.update(this.node, [], () => true);
      }
    }

    return true;
  }
}

export const ReactMediaSingleNode = (
  portalProviderAPI: PortalProviderAPI,
  eventDispatcher: EventDispatcher,
  providerFactory: ProviderFactory,
  mediaOptions: MediaOptions = {},
  pluginOptions?: MediaPMPluginOptions,
  fullWidthMode?: boolean,
) => (node: PMNode, view: EditorView, getPos: () => number) => {
  return new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
    eventDispatcher,
    mediaPluginOptions: pluginOptions,
    fullWidthMode,
    providerFactory,
    mediaOptions,
  }).init();
};
