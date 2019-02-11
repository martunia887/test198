import * as React from 'react';
import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, ImageLoaderProps } from '@atlaskit/editor-common';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
  MediaProvider,
} from '../pm-plugins/main';
import { Context } from '@atlaskit/media-core';
import {
  Card,
  CardDimensions,
  CardView,
  CardOnClickCallback,
  Identifier,
} from '@atlaskit/media-card';
import { withImageLoader } from '@atlaskit/editor-common';

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
  onClick?: CardOnClickCallback;
  onExternalImageLoaded?: (
    dimensions: { width: number; height: number },
  ) => void;
  editorAppearance: EditorAppearance;
  mediaProvider?: Promise<MediaProvider>;
  viewContext?: Context;
}

export type Props = MediaNodeProps & ImageLoaderProps;

class MediaNode extends Component<Props> {
  private pluginState: MediaPluginState;

  constructor(props: Props) {
    super(props);
    const { view } = this.props;
    this.pluginState = mediaStateKey.getState(view.state);
  }

  shouldComponentUpdate(nextProps: Props) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.viewContext !== nextProps.viewContext ||
      this.props.node.attrs.id !== nextProps.node.attrs.id ||
      this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
      this.props.cardDimensions !== nextProps.cardDimensions
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.handleNewNode(this.props);
    this.checkForPastedImage();
  }

  checkForPastedImage = async () => {
    const { node, mediaProvider } = this.props;
    const { collection, __src, id } = node.attrs;
    const context = await this.getMediaContext('upload');

    if (__src && context && mediaProvider) {
      try {
        const uploadParams = (await mediaProvider).uploadParams;
        const uploadCollection = uploadParams && uploadParams.collection;
        const url = new URL(__src);
        const isSameOrigin = url.origin === location.origin;
        const isDifferentCollection = collection !== uploadCollection;
        if (isDifferentCollection && isSameOrigin) {
          const blob = await (await fetch(__src)).blob();
          // TODO v2: pass file descriptor to use file id upfront
          // TODO: pass file name
          const subscription = context.file
            .upload({
              content: blob,
              collection: uploadCollection,
              mimeType: blob.type,
            })
            .subscribe({
              next: fileState => {
                const { id: newFileId } = fileState;

                this.pluginState.updateMediaNodeAttrs(
                  id,
                  {
                    id: newFileId,
                  },
                  true,
                );
                subscription.unsubscribe();
              },
            });
        }
      } catch (e) {}
    }
  };

  componentWillUnmount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeUnmount(node);
  }

  componentDidUpdate() {
    this.pluginState.updateElement();
  }

  getMediaContext = async (
    type: 'view' | 'upload',
  ): Promise<Context | undefined> => {
    const { mediaProvider } = await this.props;
    if (mediaProvider) {
      const context =
        type === 'view'
          ? (await mediaProvider).viewContext
          : (await mediaProvider).uploadContext;

      return context;
    }

    return undefined;
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
    const { viewContext } = this.props;
    /**
     * On mobile we don't receive a collectionName until the `upload-end` event.
     * We don't want to render a proper card until we have a valid collection.
     * Render loading until we do.
     */
    const isMobile = editorAppearance === 'mobile';
    let isMobileReady = isMobile ? typeof collection === 'string' : true;

    if (!viewContext || !isMobileReady) {
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
        context={viewContext}
        resizeMode="stretchy-fit"
        dimensions={cardDimensions}
        identifier={identifier}
        selectable={true}
        selected={selected}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={!isMobile}
        isLazy={!isMobile}
      />
    );
  }

  private handleNewNode = (props: MediaNodeProps) => {
    const { node } = props;

    // +1 indicates the media node inside the mediaSingle nodeview
    this.pluginState.handleMediaNodeMount(node, () => this.props.getPos() + 1);
  };
}

export default withImageLoader<MediaNodeProps>(MediaNode);
