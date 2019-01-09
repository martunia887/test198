import * as React from 'react';
import { Component } from 'react';
import {
  CardAppearance,
  CardDimensions,
  Card,
  CardView,
  CardOnClickCallback,
  FileIdentifier,
} from '@atlaskit/media-card';
import { Context, ImageResizeMode } from '@atlaskit/media-core';
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
}

export interface State {
  context?: Context;
  // externalStatus: CardStatus;
}

export class MediaCardInternal extends Component<MediaCardProps, State> {
  state: State = {};

  async componentDidMount() {
    const { mediaProvider } = this.props;

    if (!mediaProvider) {
      return;
    }

    const provider = await mediaProvider;
    const context = await provider.viewContext;

    this.setState({
      context,
    });
  }

  private renderExternal() {
    const {
      cardDimensions,
      resizeMode,
      appearance,
      url,
      imageStatus,
      disableOverlay,
    } = this.props;

    return (
      <CardView
        status={imageStatus || 'loading'}
        dataURI={url}
        dimensions={cardDimensions}
        metadata={
          {
            mediaType: 'image',
            name: url,
          } as any
        }
        appearance={appearance}
        resizeMode={resizeMode}
        disableOverlay={disableOverlay}
      />
    );
  }

  render() {
    const { context } = this.state;
    const {
      eventHandlers,
      id,
      type,
      collection,
      occurrenceKey,
      cardDimensions,
      resizeMode,
      rendererAppearance,
      disableOverlay,
    } = this.props;

    if (type === 'external') {
      return this.renderExternal();
    }

    if (!context) {
      return (
        <CardView
          status="loading"
          mediaItemType={type}
          dimensions={cardDimensions}
        />
      );
    }

    if (!id) {
      return (
        <CardView
          status="error"
          mediaItemType={type}
          dimensions={cardDimensions}
        />
      );
    }

    // TODO do we support links still?

    let identifier: FileIdentifier = {
      id,
      mediaItemType: 'file',
      collectionName: collection,
      occurrenceKey: occurrenceKey,
    };

    console.log('renderer <Card', identifier);
    return (
      <Card
        identifier={identifier}
        context={context}
        dimensions={cardDimensions}
        onClick={
          eventHandlers && eventHandlers.media && eventHandlers.media.onClick
        }
        resizeMode={resizeMode}
        isLazy={rendererAppearance === 'mobile' ? false : true}
        disableOverlay={disableOverlay}
        useInlinePlayer={false}
      />
    );
  }
}

export const MediaCard = withImageLoader<MediaCardProps>(MediaCardInternal);
