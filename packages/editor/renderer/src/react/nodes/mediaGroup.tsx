import * as React from 'react';
import { ReactElement, PureComponent } from 'react';
import {
  CardEvent,
  defaultImageCardDimensions,
  Identifier,
  LinkIdentifier,
} from '@atlaskit/media-card';
import { Filmstrip, FilmstripItem } from '@atlaskit/media-filmstrip';
import {
  EventHandlers,
  CardSurroundings,
  WithProviders,
  ProviderFactory,
} from '@atlaskit/editor-common';
import { MediaProps } from './media';
import { MediaProvider } from '../../ui/MediaCard';
import { Context } from '@atlaskit/media-core';

export interface MediaGroupProps {
  children?: React.ReactNode;
  eventHandlers?: EventHandlers;
  providers?: ProviderFactory;
}

export interface FilmstripWithProviderProps {
  items: FilmstripItem[];
  mediaProvider?: MediaProvider;
}

export interface FilmstripWithProviderState {
  context?: Context;
}

// class FilmstripWithProvider extends PureComponent<
//   FilmstripWithProviderProps,
//   FilmstripWithProviderState
// > {
//   state: FilmstripWithProviderState = {};

//   async componentDidMount() {
//     const { mediaProvider } = this.props;

//     if (!mediaProvider) {
//       return;
//     }

//     // Promise<MediaProvider>
//     // Promise<Context>
//     const provider = await mediaProvider;
//     const context = await provider.viewContext;

//     this.setState({
//       context,
//     });
//   }

//   render() {
//     const { context } = this.state;
//     const { items } = this.props;

//     return <Filmstrip items={items} context={context} />;
//   }
// }

export default class MediaGroup extends PureComponent<MediaGroupProps, {}> {
  providerFactory: ProviderFactory =
    this.props.providers || new ProviderFactory();

  render() {
    const numChildren = React.Children.count(this.props.children);

    let content;
    if (numChildren === 1) {
      const card = React.Children.toArray(
        this.props.children,
      )[0] as ReactElement<any>;
      switch (card.props.type) {
        case 'file':
          content = this.renderSingleFile(card);
          break;
        case 'link':
        default:
          content = this.renderSingleLink(card);
      }
    } else {
      content = this.renderStrip();
    }
    return <div className="MediaGroup">{content}</div>;
  }

  renderSingleFile(child: ReactElement<MediaProps>) {
    return React.cloneElement(child, {
      resizeMode: 'stretchy-fit',
      cardDimensions: defaultImageCardDimensions,
    } as MediaProps);
  }

  renderSingleLink(child: ReactElement<MediaProps>) {
    return React.cloneElement(child, {
      appearance: 'auto',
    } as MediaProps);
  }

  onCardClick = (
    child: ReactElement<MediaProps>,
    surroundingItems: Identifier[],
  ) => (event: CardEvent, analyticsEvent?: any) => {
    /**
     * // TODO: should we pass this somewhere?
     * eventHandlers: {
        ...child.props.eventHandlers
        media: {
     */
    if (
      !this.props ||
      !this.props.eventHandlers ||
      !this.props.eventHandlers.media ||
      !this.props.eventHandlers.media.onClick
    ) {
      return;
    }
    const surroundings: CardSurroundings = {
      collectionName: child.props.collection!,
      list: surroundingItems,
    };
    this.props.eventHandlers.media.onClick(event, surroundings, analyticsEvent);
  };

  renderNode = (providers: { mediaProvider?: Promise<MediaProvider> } = {}) => {
    const { mediaProvider } = providers;
    const { children } = this.props;
    const surroundingItems = React.Children.map(
      children,
      this.mapChildToIdentifier,
    );
    const items = React.Children.map<FilmstripItem>(children, child => {
      const identifier = this.mapChildToIdentifier(child);

      return {
        identifier,
        onClick: this.onCardClick(
          child as React.ReactElement<MediaProps>,
          surroundingItems,
        ),
      };
    });
    let context: undefined | Promise<Context | undefined>;
    console.log('mediaProvider', mediaProvider);
    if (mediaProvider) {
      context = mediaProvider.then(provider => provider.viewContext);
    }

    return <Filmstrip items={items} context={context} />;
    // return (
    //   <FilmstripWithProvider items={items} mediaProvider={mediaProvider} />
    // );
  };

  renderStrip() {
    return (
      <WithProviders
        providers={['mediaProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderNode}
      />
    );
  }

  private mapChildToIdentifier(child: React.ReactChild): Identifier {
    const {
      id,
      type,
      occurrenceKey,
      collection,
    } = (child as React.ReactElement<MediaProps>).props;

    switch (type) {
      case 'file':
        return {
          id: id!,
          mediaItemType: type,
          occurrenceKey,
          collectionName: collection,
        };
      case 'link':
        return {
          id: id!,
          mediaItemType: type,
          occurrenceKey,
          collectionName: collection,
        } as LinkIdentifier;
      case 'external':
        return {
          id: id!,
          mediaItemType: 'file',
          occurrenceKey,
          collectionName: collection,
        };
    }
  }
}
