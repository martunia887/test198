import * as React from 'react';
import { Component } from 'react';
import {
  CardAppearance,
  CardDimensions,
  Card,
  CardView,
  CardOnClickCallback,
  ExternalImageIdentifier,
  ImageResizeMode,
} from '@atlaskit/media-card';
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

  render() {
    const {
      eventHandlers,
      id,
      type,
      collection,
      cardDimensions,
      resizeMode,
      rendererAppearance,
      disableOverlay,
      useInlinePlayer,
    } = this.props;
    const isMobile = rendererAppearance === 'mobile';
    const shouldPlayInline =
      useInlinePlayer !== undefined ? useInlinePlayer : true;

    if (type === 'external') {
      return this.renderExternal();
    }

    // I assume we don't need to do this, because mediaClientConfig is in Context tree now
    // if (!mediaClientConfig) {
    //   return this.renderLoadingCard();
    // }

    let identifier: any = {
      id,
      mediaItemType: type,
      collectionName: collection,
    };

    return (
      <Card
        identifier={identifier}
        dimensions={cardDimensions}
        onClick={
          eventHandlers && eventHandlers.media && eventHandlers.media.onClick
        }
        resizeMode={resizeMode}
        isLazy={!isMobile}
        disableOverlay={disableOverlay}
        useInlinePlayer={isMobile ? false : shouldPlayInline}
      />
    );
  }
}

export const MediaCard = withImageLoader<MediaCardProps>(MediaCardInternal);
