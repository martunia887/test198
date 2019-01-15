import * as React from 'react';
import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, ImageLoaderProps } from '@atlaskit/editor-common';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
} from '../pm-plugins/main';
import {
  Context,
  ImageResizeMode,
  isAsapBasedAuth,
} from '@atlaskit/media-core';
import { MediaProvider } from '../pm-plugins/main';
import {
  Card,
  CardDimensions,
  CardView,
  CardEventHandler,
  CardOnClickCallback,
  Identifier,
  OnLoadingChangeState,
} from '@atlaskit/media-card';
import { MediaType, MediaBaseAttributes } from '@atlaskit/adf-schema';
import { withImageLoader, ImageStatus } from '@atlaskit/editor-common';

import { EditorAppearance } from '../../../types';

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

export interface MediaNodeProps extends ReactNodeProps {
  getPos: ProsemirrorGetPosHandler;
  view: EditorView;
  node: PMNode;
  providerFactory?: ProviderFactory;
  cardDimensions: CardDimensions;
  isMediaSingle?: boolean;
  mediaProvider?: Promise<MediaProvider>;
  onClick?: CardOnClickCallback;
  onExternalImageLoaded?: (
    dimensions: { width: number; height: number },
  ) => void;
  editorAppearance: EditorAppearance;
}

export interface Props extends Partial<MediaBaseAttributes> {
  type: MediaType;
  mediaProvider?: Promise<MediaProvider>;
  cardDimensions?: CardDimensions;
  onClick?: CardOnClickCallback;
  onDelete?: CardEventHandler;
  resizeMode?: ImageResizeMode;
  appearance?: Appearance;
  selected?: boolean;
  url?: string;
  imageStatus?: ImageStatus;
  context: Context;
  disableOverlay?: boolean;
}

export interface MediaNodeState {
  viewContext?: Context;
}

class MediaNode extends Component<
  MediaNodeProps & ImageLoaderProps,
  MediaNodeState
> {
  private pluginState: MediaPluginState;
  private mediaProvider: Promise<MediaProvider>;
  private hasBeenMounted: boolean = false;

  state = {
    viewContext: undefined,
  };

  constructor(props) {
    super(props);
    const { view } = this.props;
    this.pluginState = mediaStateKey.getState(view.state);
    this.mediaProvider = props.mediaProvider;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.selected !== nextProps.selected ||
      this.state.viewContext !== nextState.viewContext ||
      this.props.node.attrs.id !== nextProps.node.attrs.id ||
      this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
      this.props.cardDimensions !== nextProps.cardDimensions
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.hasBeenMounted = true;
    this.handleNewNode(this.props);
    this.updateMediaContext();
  }

  componentWillUnmount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeUnmount(node);
    this.hasBeenMounted = false;
  }

  componentDidUpdate() {
    this.pluginState.updateElement();
  }

  private updateMediaContext = async () => {
    const mediaProvider = await this.mediaProvider;
    if (mediaProvider) {
      const viewContext = await mediaProvider.viewContext;
      if (viewContext && this.hasBeenMounted) {
        this.setState({ viewContext });
      }
    }
  };

  render() {
    const {
      node,
      selected,
      cardDimensions,
      onClick,
      editorAppearance,
    } = this.props;
    const { id, type, collection, url, __key } = node.attrs;

    if (!this.state.viewContext) {
      return <CardView status="loading" dimensions={cardDimensions} />;
    }

    /** For new images, the media state will be loaded inside the plugin state */
    const getState = this.pluginState.getMediaNodeState(__key);
    const fileId = getState && getState.fileId ? getState.fileId : id;

    const identifier: Identifier =
      type === 'external'
        ? {
            dataURI: url!,
            name: url,
            mediaItemType: 'external-image',
          }
        : {
            id: fileId,
            mediaItemType: 'file',
            collectionName: collection!,
          };

    return (
      <Card
        context={this.state.viewContext!}
        resizeMode="stretchy-fit"
        dimensions={cardDimensions}
        identifier={identifier}
        selectable={true}
        selected={selected}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={false}
        isLazy={editorAppearance !== 'mobile'}
        onLoadingChange={this.onCardLoadingChange}
      />
    );
  }

  private onCardLoadingChange = async (state: OnLoadingChangeState) => {
    const { node } = this.props;
    const { id, collection } = node.attrs;
    const { viewContext, uploadParams } = await this.mediaProvider;
    const uploadContext = viewContext; // TODO: use real uploadContext

    if (state.type === 'error' && uploadContext) {
      const resolvedUploadContext = await uploadContext;
      const auth = await resolvedUploadContext.config.authProvider({
        collectionName: collection,
      });

      // TODO: add ClientAltBasedAuth support
      if (isAsapBasedAuth(auth)) {
        resolvedUploadContext.file.copyWithToken(
          {
            sourceFile: {
              owner: auth,
              id,
              collection,
            },
          },
          {
            collection: uploadParams && uploadParams.collection,
          },
        );
      }
    }
  };

  private handleNewNode = (props: MediaNodeProps) => {
    const { node } = props;

    // +1 indicates the media node inside the mediaSingle nodeview
    this.pluginState.handleMediaNodeMount(node, () => this.props.getPos() + 1);
  };
}

export default withImageLoader<MediaNodeProps>(MediaNode);
