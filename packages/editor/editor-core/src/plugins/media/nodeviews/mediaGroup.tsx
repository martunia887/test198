import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { Filmstrip } from '@atlaskit/media-filmstrip';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
} from '../pm-plugins/main';
import { FileIdentifier } from '@atlaskit/media-client';
import { MediaClientConfigContext } from '@atlaskit/media-core';
import { setNodeSelection } from '../../../utils';
import WithPluginState from '../../../ui/WithPluginState';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import {
  pluginKey as editorDisabledPluginKey,
  EditorDisabledPluginState,
} from '../../editor-disabled';
import { EditorAppearance } from '../../../types';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export type MediaGroupProps = {
  forwardRef?: (ref: HTMLElement) => void;
  node: PMNode;
  view: EditorView;
  getPos: () => number;
  selected: number | null;
  disabled?: boolean;
  editorAppearance: EditorAppearance;
};

export default class MediaGroup extends React.Component<MediaGroupProps> {
  private mediaPluginState: MediaPluginState;
  private mediaNodes: PMNode[];

  constructor(props) {
    super(props);
    this.mediaPluginState = mediaStateKey.getState(props.view.state);
    this.setMediaItems(props);
  }

  componentWillReceiveProps(props: MediaGroupProps) {
    this.setMediaItems(props);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.node !== nextProps.node
    ) {
      return true;
    }
    return false;
  }

  setMediaItems = props => {
    const { node } = props;
    this.mediaNodes = [] as Array<PMNode>;
    node.forEach((item, childOffset) => {
      this.mediaPluginState.mediaGroupNodes[
        item.attrs.__key || item.attrs.id
      ] = {
        node: item,
        getPos: () => props.getPos() + childOffset + 1,
      };
      this.mediaNodes.push(item);
    });
  };

  renderChildNodes = () => {
    const items = this.mediaNodes.map((item, idx) => {
      const getState = this.mediaPluginState.stateManager.getState(
        item.attrs.__key || item.attrs.id,
      );
      const identifier: FileIdentifier = {
        id: getState ? getState.fileId : item.attrs.id,
        mediaItemType: 'file',
        collectionName: item.attrs.collection,
      };

      const nodePos = this.props.getPos() + idx + 1;
      return {
        identifier,
        selectable: true,
        isLazy: this.props.editorAppearance !== 'mobile',
        selected: this.props.selected === nodePos,
        onClick: () => {
          setNodeSelection(this.props.view, nodePos);
        },
        actions: [
          {
            handler: this.props.disabled
              ? {}
              : this.mediaPluginState.handleMediaNodeRemoval.bind(
                  null,
                  null,
                  () => nodePos,
                ),
            icon: <EditorCloseIcon label="delete" />,
          },
        ],
      };
    });

    return <Filmstrip items={items} />;
  };

  render() {
    return this.renderChildNodes();
  }
}

class MediaGroupNodeView extends ReactNodeView {
  render(props, forwardRef) {
    const { editorAppearance } = this.reactComponentProps;

    return (
      <WithPluginState
        editorView={this.view}
        plugins={{
          reactNodeViewState: reactNodeViewStateKey,
          editorDisabledPlugin: editorDisabledPluginKey,
        }}
        render={({
          editorDisabledPlugin,
        }: {
          editorDisabledPlugin: EditorDisabledPluginState;
        }) => {
          const mediaPluginState: MediaPluginState = mediaStateKey.getState(
            this.view.state,
          );
          const viewMediaClientConfig = mediaPluginState.mediaClientConfig;

          const nodePos = this.getPos();
          const { $anchor, $head } = this.view.state.selection;
          const isSelected =
            nodePos < $anchor.pos && $head.pos < nodePos + this.node.nodeSize;

          return (
            <MediaClientConfigContext.Provider value={viewMediaClientConfig}>
              <MediaGroup
                node={this.node}
                getPos={this.getPos}
                view={this.view}
                forwardRef={forwardRef}
                selected={isSelected ? $anchor.pos : null}
                disabled={(editorDisabledPlugin || {}).editorDisabled}
                editorAppearance={editorAppearance}
              />
            </MediaClientConfigContext.Provider>
          );
        }}
      />
    );
  }

  stopEvent(event: Event) {
    event.preventDefault();
    return true;
  }
}

export const ReactMediaGroupNode = (
  portalProviderAPI: PortalProviderAPI,
  editorAppearance: EditorAppearance,
) => (node: PMNode, view: EditorView, getPos: () => number): NodeView => {
  return new MediaGroupNodeView(node, view, getPos, portalProviderAPI, {
    editorAppearance,
  }).init();
};
