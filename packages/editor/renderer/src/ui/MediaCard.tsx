import * as React from 'react';
import { Component } from 'react';

import { filter, ADFEntity } from '@atlaskit/adf-utils';
import {
  CardAppearance,
  CardDimensions,
  Card,
  CardLoading,
  CardError,
  CardOnClickCallback,
} from '@atlaskit/media-card';
import {
  Context,
  ImageResizeMode,
  FileIdentifier,
  ExternalImageIdentifier,
  Identifier,
} from '@atlaskit/media-core';
import { MediaType } from '@atlaskit/adf-schema';
import {
  withImageLoader,
  ImageStatus,
  // @ts-ignore
  ImageLoaderProps,
  // @ts-ignore
  ImageLoaderState,
} from '@atlaskit/editor-common';
import { RendererAppearance } from './Renderer';
import { RendererContext } from '../react';

export interface MediaProvider {
  viewContext?: Context;
}

export interface MediaCardProps {
  id?: string;
  mediaProvider?: MediaProvider;
  eventHandlers?: {
    media?: {
      onClick?: CardOnClickCallback;
    };
  };
  type: MediaType;
  collection?: string;
  url?: string;
  cardDimensions?: CardDimensions;
  resizeMode?: ImageResizeMode;
  appearance?: CardAppearance;
  rendererAppearance?: RendererAppearance;
  occurrenceKey?: string;
  imageStatus?: ImageStatus;
  disableOverlay?: boolean;
  useInlinePlayer?: boolean;
  rendererContext?: RendererContext;
}

export interface State {
  context?: Context;
}

const mediaIdentifierMap: Map<string, Identifier> = new Map();

export const getListOfIdentifiersFromDoc = (doc?: ADFEntity): Identifier[] => {
  if (!doc) {
    return [];
  }
  return filter(doc, node => node.type === 'media').reduce(
    (identifierList: Identifier[], mediaNode) => {
      if (mediaNode.attrs) {
        const { type, url: dataURI, id } = mediaNode.attrs;

        if (type === 'file' && id) {
          identifierList.push({
            mediaItemType: 'file',
            id,
          });
        } else if (type === 'external' && dataURI) {
          identifierList.push({
            mediaItemType: 'external-image',
            dataURI,
            name: dataURI,
          });
        }
      }
      return identifierList;
    },
    [],
  );
};

export class MediaCardInternal extends Component<MediaCardProps, State> {
  state: State = {};

  async componentDidMount() {
    const {
      rendererContext,
      mediaProvider,
      id,
      url,
      collection: collectionName,
    } = this.props;

    if (!mediaProvider) {
      return;
    }

    const provider = await mediaProvider;
    const context = await provider.viewContext;
    const nodeIsInCache =
      (id && mediaIdentifierMap.has(id)) ||
      (url && mediaIdentifierMap.has(url));
    if (rendererContext && rendererContext.adDoc && !nodeIsInCache) {
      getListOfIdentifiersFromDoc(rendererContext.adDoc).forEach(identifier => {
        if (identifier.mediaItemType === 'file') {
          mediaIdentifierMap.set(identifier.id as string, {
            ...identifier,
            collectionName,
          });
        } else if (identifier.mediaItemType === 'external-image') {
          mediaIdentifierMap.set(identifier.dataURI as string, identifier);
        }
      });
    }

    this.setState({
      context,
    });
  }

  componentWillUnmount() {
    const { id, url: dataURI } = this.props;

    if (id) {
      mediaIdentifierMap.delete(id);
    } else if (dataURI) {
      mediaIdentifierMap.delete(dataURI);
    }
  }

  private renderLoadingCard = () => {
    const { cardDimensions } = this.props;

    return <CardLoading dimensions={cardDimensions} />;
  };

  private renderExternal(shouldOpenMediaViewer: boolean) {
    const { context } = this.state;
    const {
      cardDimensions,
      resizeMode,
      appearance,
      url,
      imageStatus,
      disableOverlay,
    } = this.props;

    if (imageStatus === 'loading' || !url) {
      return this.renderLoadingCard();
    }

    const identifier: ExternalImageIdentifier = {
      dataURI: url,
      name: url,
      mediaItemType: 'external-image',
    };

    return (
      <Card
        context={context as any} // context is not really used when the type is external and we want to render the component asap
        identifier={identifier}
        dimensions={cardDimensions}
        appearance={appearance}
        resizeMode={resizeMode}
        disableOverlay={disableOverlay}
        shouldOpenMediaViewer={shouldOpenMediaViewer}
        mediaViewerDataSource={{
          list: Array.from(mediaIdentifierMap.values()),
        }}
      />
    );
  }

  /**
   * We want to call provided `eventHandlers.media.onClick` when it's provided,
   * but we also don't want to call it when it's a video and inline video player is enabled.
   * This is due to consumers normally process this onClick call by opening media viewer and
   * we don't want that to happened described above text.
   */
  private getOnCardClickCallback = (isInlinePlayer: boolean) => {
    const { eventHandlers } = this.props;
    if (eventHandlers && eventHandlers.media && eventHandlers.media.onClick) {
      return ((result, analyticsEvent) => {
        const isVideo =
          result.mediaItemDetails &&
          result.mediaItemDetails.mediaType === 'video';
        const isVideoWithInlinePlayer = isInlinePlayer && isVideo;
        if (
          !isVideoWithInlinePlayer &&
          eventHandlers &&
          eventHandlers.media &&
          eventHandlers.media.onClick
        ) {
          eventHandlers.media.onClick(result, analyticsEvent);
        }
      }) as CardOnClickCallback;
    }

    return undefined;
  };

  render() {
    const { context } = this.state;
    const {
      id,
      type,
      collection,
      occurrenceKey,
      cardDimensions,
      resizeMode,
      rendererAppearance,
      disableOverlay,
      useInlinePlayer,
    } = this.props;
    const isMobile = rendererAppearance === 'mobile';
    const shouldPlayInline =
      useInlinePlayer !== undefined ? useInlinePlayer : true;
    const isInlinePlayer = isMobile ? false : shouldPlayInline;

    const onCardClick = this.getOnCardClickCallback(isInlinePlayer);

    const shouldOpenMediaViewer = !isMobile && !onCardClick;

    if (type === 'external') {
      return this.renderExternal(shouldOpenMediaViewer);
    }

    if (type === 'link') {
      return null;
    }

    if (!context || !id) {
      return this.renderLoadingCard();
    }

    if (!id || type !== 'file') {
      return <CardError dimensions={cardDimensions} />;
    }

    const identifier: FileIdentifier = {
      id,
      mediaItemType: 'file',
      collectionName: collection,
      occurrenceKey,
    };

    return (
      <Card
        identifier={identifier}
        context={context}
        dimensions={cardDimensions}
        onClick={onCardClick}
        resizeMode={resizeMode}
        isLazy={!isMobile}
        disableOverlay={disableOverlay}
        useInlinePlayer={isInlinePlayer}
        shouldOpenMediaViewer={shouldOpenMediaViewer}
        mediaViewerDataSource={{
          list: Array.from(mediaIdentifierMap.values()),
        }}
      />
    );
  }
}

export const MediaCard = withImageLoader<MediaCardProps>(MediaCardInternal);
