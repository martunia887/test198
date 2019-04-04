import * as React from 'react';
import { Component } from 'react';
import {
  CardAppearance,
  CardDimensions,
  Card,
  CardView,
  CardOnClickCallback,
  ImageResizeMode,
} from '@atlaskit/media-card';
import { MediaType } from '@atlaskit/adf-schema';
import {
  FileIdentifier,
  ExternalImageIdentifier,
} from '@atlaskit/media-client';
import {
  withImageLoader,
  ImageStatus,
  // @ts-ignore
  ImageLoaderProps,
  // @ts-ignore
  ImageLoaderState,
} from '@atlaskit/editor-common';
import { RendererAppearance } from './Renderer';

export interface MediaCardProps {
  id?: string;
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
}

export class MediaCardInternal extends Component<MediaCardProps> {
  private renderLoadingCard = () => {
    const { cardDimensions } = this.props;

    return (
      <CardView
        status="loading"
        mediaItemType="file"
        dimensions={cardDimensions}
      />
    );
  };

  private renderExternal() {
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
        identifier={identifier}
        dimensions={cardDimensions}
        appearance={appearance}
        resizeMode={resizeMode}
        disableOverlay={disableOverlay}
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
      return this.renderExternal();
    }

    if (type === 'link') {
      return null;
    }

    if (!id) {
      return this.renderLoadingCard();
    }

    if (!id || type !== 'file') {
      return (
        <CardView
          status="error"
          mediaItemType={type}
          dimensions={cardDimensions}
        />
      );
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
        dimensions={cardDimensions}
        onClick={onCardClick}
        resizeMode={resizeMode}
        isLazy={!isMobile}
        disableOverlay={disableOverlay}
        useInlinePlayer={isInlinePlayer}
        shouldOpenMediaViewer={shouldOpenMediaViewer}
      />
    );
  }
}

export const MediaCard = withImageLoader<MediaCardProps>(MediaCardInternal);
