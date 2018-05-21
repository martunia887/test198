import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import {
  MediaItem,
  MediaCollection,
  MediaCollectionItem,
  Context,
  DataUriService,
  isError,
  isCollectionNotFoundError,
} from '@atlaskit/media-core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { LazyContent } from '../utils/lazyContent';
import { CardListEvent, CardEvent } from '..';
import { Provider, MediaCard, CardView } from '../root';
import { CollectionAction } from '../actions';
import { InfiniteScroll } from './infinite-scroll';
import { CardListItemWrapper, Spinner } from './styled';

export interface CardListProps {
  context: Context;
  collectionName: string;

  height?: number;
  minPageSize?: number;

  onCardClick?: (result: CardListEvent) => void;
  actions?: Array<CollectionAction>;

  // Infinite scrolling is only enabled when height has also been specified!
  errorComponent?: JSX.Element;
  loadingComponent?: JSX.Element;
  emptyComponent?: JSX.Element;
}

export interface CardListState {
  loading: boolean;
  shouldAnimate: boolean;
  firstItemKey?: string;
  subscription?: Subscription;
  loadNextPage?: () => void;
  collection?: MediaCollection;
  error?: Error;
}

// FIXME: these aren't "components", they're actually "elements"... we should rename these or change the signature to be a "component" e.g. () => (<Spinner.../>);. Will clean up the tests a bit too.
const LoadingComponent = (
  <Spinner className="spinner" style={{ width: '100%', height: '100%' }}>
    loading...
  </Spinner>
);
const EmptyComponent = <div>No items</div>;
const ErrorComponent = <div>ERROR</div>;

export class CardList extends Component<CardListProps, CardListState> {
  static defaultPageSize = 50;

  static defaultProps = {
    pageSize: CardList.defaultPageSize,
    actions: [],
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
    emptyComponent: EmptyComponent,
  };

  state: CardListState = {
    loading: true,
    shouldAnimate: false,
  };

  providersByMediaItemId: { [id: string]: Provider } = {};
  private dataURIService: DataUriService;

  private unsubscribe() {
    const { subscription } = this.state;
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  handleNextItems(nextProps: CardListProps) {
    const { collectionName, context } = nextProps;

    return (value: MediaCollection | Error) => {
      if (isError(value)) {
        this.setState({ collection: undefined, error: value, loading: false });
      } else {
        const { firstItemKey } = this.state;
        const newFirstItemKey = value.items[0]
          ? this.getItemKey(value.items[0])
          : undefined;
        const shouldAnimate =
          !!firstItemKey && firstItemKey !== newFirstItemKey;
        this.providersByMediaItemId = {};
        value.items.forEach(mediaItem => {
          if (!mediaItem.details) {
            return;
          }

          this.providersByMediaItemId[
            mediaItem.details.id
          ] = context.getMediaItemProvider(
            mediaItem.details.id,
            mediaItem.type,
            collectionName,
            mediaItem,
          );
        });

        this.setState({
          collection: value,
          shouldAnimate,
          loading: false,
          firstItemKey: newFirstItemKey,
          error: undefined,
        });
      }
    };
  }

  private subscribe(nextProps: CardListProps) {
    const { collectionName, context } = nextProps;
    const pageSize = this.props.minPageSize || CardList.defaultPageSize;
    const provider = context.getMediaCollectionProvider(
      collectionName,
      pageSize,
      'file',
    );

    const subscription = provider.observable().subscribe({
      next: this.handleNextItems(nextProps),
    });

    this.setState({ subscription });
  }

  private shouldUpdateState(nextProps: CardListProps): boolean {
    return (
      nextProps.collectionName !== this.props.collectionName ||
      nextProps.context !== this.props.context ||
      nextProps.minPageSize !== this.props.minPageSize
    );
  }

  private updateState(nextProps: CardListProps): void {
    const { collectionName, context } = nextProps;
    const pageSize = this.props.minPageSize || CardList.defaultPageSize;
    const provider = context.getMediaCollectionProvider(
      collectionName,
      pageSize,
      'file',
    );

    this.unsubscribe();

    this.dataURIService = context.getDataUriService(collectionName);

    // Setting the subscription after the state has been applied
    this.setState(
      {
        loadNextPage: () => provider.loadNextPage(),
        error: undefined,
        collection: undefined,
        firstItemKey: undefined,
      },
      () => this.subscribe(nextProps),
    );
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: CardListProps): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  private handleInfiniteScrollThresholdReached = () => {
    this.loadNextPage();
  };

  render(): JSX.Element {
    const { height } = this.props;
    const { loading, error, collection } = this.state;
    const emptyComponent = this.props.emptyComponent || EmptyComponent;
    const loadingComponent = this.props.loadingComponent || LoadingComponent;
    const errorComponent = this.props.errorComponent || ErrorComponent;

    if (loading) {
      return loadingComponent;
    }

    if (error) {
      if (isCollectionNotFoundError(error)) {
        return emptyComponent;
      } else {
        return errorComponent;
      }
    }

    if (!collection) {
      return loadingComponent;
    }

    return (
      <InfiniteScroll
        height={height}
        onThresholdReached={this.handleInfiniteScrollThresholdReached}
      >
        {this.renderList()}
      </InfiniteScroll>
    );
  }

  private renderList(): JSX.Element {
    const { collection, shouldAnimate } = this.state;
    const {
      providersByMediaItemId,
      dataURIService,
      handleCardClick,
      placeholder,
    } = this;
    const actions = this.props.actions || [];
    const cardActions = (collectionItem: MediaCollectionItem) =>
      actions.map(action => {
        return {
          label: action.label,
          handler: (item: MediaItem, event: Event) => {
            if (collection) {
              action.handler(collectionItem, collection, event);
            }
          },
        };
      });

    const cards = collection
      ? collection.items.map(mediaItem => {
          const key = this.getItemKey(mediaItem);
          const cardListItem = (
            <CSSTransition
              key={key}
              classNames="card-list-item"
              timeout={{ enter: 750 }}
              exit={false}
              component="div"
              className="card-list"
            >
              <CardListItemWrapper
                shouldAnimate={shouldAnimate}
                cardWidth="100%"
              >
                <MediaCard
                  provider={providersByMediaItemId[mediaItem.details.id]}
                  dataURIService={dataURIService}
                  appearance="small"
                  onClick={handleCardClick.bind(this, mediaItem)}
                  actions={cardActions(mediaItem)}
                />
              </CardListItemWrapper>
            </CSSTransition>
          );
          // We don't want to wrap new items into LazyContent aka lazy load new items
          return shouldAnimate ? (
            cardListItem
          ) : (
            <LazyContent key={key} placeholder={placeholder}>
              {cardListItem}
            </LazyContent>
          );
        })
      : null;

    return <TransitionGroup>{cards}</TransitionGroup>;
  }

  private handleCardClick(oldItem: MediaCollectionItem, cardEvent: CardEvent) {
    const { collectionName, onCardClick } = this.props;

    if (!onCardClick) {
      return;
    }

    const { event, mediaItemDetails } = cardEvent;

    // need to merge the new details with the old details (as the old details may be out of date) and we need the occurrenceKey
    const newItem: MediaCollectionItem = {
      type: oldItem.type,
      details: {
        ...oldItem.details,
        ...mediaItemDetails,
      },
    } as MediaCollectionItem;

    const cardListEvent: CardListEvent = {
      event,
      collectionName,
      mediaCollectionItem: newItem,
    };

    onCardClick(cardListEvent);
  }

  private getItemKey(item: MediaCollectionItem): string {
    return `${item.details.id}-${item.details.occurrenceKey}`;
  }

  private get placeholder(): JSX.Element {
    return (
      <CardListItemWrapper cardWidth="100%">
        <CardView status="loading" appearance="small" />
      </CardListItemWrapper>
    );
  }

  loadNextPage = (): void =>
    this.state.loadNextPage && this.state.loadNextPage();
}
