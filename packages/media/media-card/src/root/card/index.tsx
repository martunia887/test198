import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';

import {
  AnalyticsContext,
  UIAnalyticsEvent,
  withAnalyticsEvents,
  withAnalyticsContext,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import {
  MediaClient,
  FileDetails,
  Identifier,
  FileIdentifier,
  isPreviewableType,
  isFileIdentifier,
  isDifferentIdentifier,
  isImageRepresentationReady,
  addFileAttrsToUrl,
  FileState,
  ExternalImageIdentifier,
  globalMediaEventEmitter,
  MediaViewedEventPayload,
  RECENTS_COLLECTION,
} from '@atlaskit/media-client';
import { MediaViewer, MediaViewerDataSource } from '@atlaskit/media-viewer';

import { Subscription } from 'rxjs/Subscription';
import { IntlProvider } from 'react-intl';
import {
  CardAction,
  CardProps,
  CardState,
  CardStatus,
  defaultImageCardDimensions,
} from '../..';
import { CardView, CardViewBase } from '../cardView';
import { LazyContent } from '../../utils/lazyContent';
import {
  getComponentDimensions,
  getRetinaValue,
  Dimensions,
} from '../../utils/getDataURIDimension';
import { getDataURIFromFileState } from '../../utils/getDataURIFromFileState';
import { extendMetadata } from '../../utils/metadata';
import { isBigger } from '../../utils/dimensionComparer';
import {
  getCardStatus,
  getCardStatusFromFileState,
  getAnalyticsStatusFromCardStatus,
  getCardProgressFromFileState,
  getAnalyticsErrorStateAttributes,
  AnalyticsErrorStateAttributes,
  AnalyticsLoadingAction,
} from './getCardStatus';
import { InlinePlayer, InlinePlayerBase } from '../inlinePlayer';
import {
  getUIAnalyticsContext,
  getBaseAnalyticsContext,
  createAndFireCustomMediaEvent,
  getFileAttributes,
} from '../../utils/analytics';
import { createResizeObserver } from '../../utils/resizeObserver';
import debounce from 'lodash.debounce';

const DELAY_SUBSCRIPTION = 1000; // ms

export type CardWithAnalyticsEventsProps = CardProps & WithAnalyticsEventsProps;
export class CardBase extends Component<
  CardWithAnalyticsEventsProps,
  CardState
> {
  private hasBeenMounted: boolean = false;
  private lastAction?: AnalyticsLoadingAction = undefined;
  private lastErrorState?: AnalyticsErrorStateAttributes = {};
  private resolvedId: string = '';
  // componentDimensions is calculated out of the props.
  // It needs to be stored to allow its use through the component
  // and also avoid its recalculation because it can internally perform expensive DOM operations.
  private componentDimensions: Dimensions = defaultImageCardDimensions;
  private resizeObserver?: ResizeObserver;
  // nextDataURI is used to refetch avoiding to show the placeholder in between requests
  private nextDataURI?: string;
  cardRef: React.RefObject<CardViewBase | InlinePlayerBase> = React.createRef();

  subscription?: Subscription;
  static defaultProps: Partial<CardProps> = {
    appearance: 'auto',
    resizeMode: 'crop',
    isLazy: true,
    disableOverlay: false,
  };

  state: CardState = {
    status: 'loading',
    isCardVisible: !this.props.isLazy,
    previewOrientation: 1,
    isPlayingFile: false,
    elementWidth: defaultImageCardDimensions.width,
  };

  // we add a listener for each of the cards on the page
  // and then check if the triggered listener is from the card
  // that contains a div in current window.getSelection()
  // won't work in IE11
  onCopyListener = () => {
    if (typeof window.getSelection === 'function') {
      const selection = window.getSelection();

      if (
        this.cardRef.current &&
        this.cardRef.current.divRef.current instanceof Node &&
        selection &&
        selection.containsNode &&
        selection.containsNode(this.cardRef.current.divRef.current, true)
      ) {
        this.fireAnalytics();
      }
    }
  };

  fireAnalytics = async () => {
    const { createAnalyticsEvent, identifier } = this.props;

    createAndFireCustomMediaEvent(
      {
        eventType: 'ui',
        action: 'copied',
        actionSubject: 'file',
        actionSubjectId:
          identifier.mediaItemType === 'file'
            ? await identifier.id
            : identifier.mediaItemType,
      },
      createAnalyticsEvent,
    );
  };

  componentDidMount() {
    const { identifier, mediaClient, dimensions, appearance } = this.props;
    this.hasBeenMounted = true;
    this.resizeObserver = createResizeObserver(this, this.onComponentResize);
    // The underlying opperation to find dataURIDimensions is expensive.
    // Therefore, it needs to be called only once and be stored for further reference.
    // Has to be set before subscribe
    this.componentDimensions = getComponentDimensions({
      component: this,
      dimensions,
      appearance,
    });

    this.setState({
      elementWidth: this.componentDimensions.width,
    });

    this.subscribe(identifier, mediaClient);
    document.addEventListener('copy', this.onCopyListener);
  }

  // If ResizeObserver is not supported, we need to debounce this function to avoid
  // expensive DOM opperations by calling getComponentDimensions on every single update
  UNSAFE_componentWillReceiveProps = debounce(
    (nextProps: CardProps) => {
      const {
        mediaClient: currentMediaClient,
        identifier: currentIdentifier,
      } = this.props;
      const {
        mediaClient: nextMediaClient,
        identifier: nextIdenfifier,
        dimensions: nextDimensions,
        appearance: nextAppearance,
      } = nextProps;

      // A resize in the parent component might trigger a component update.
      // If ResizeObserver is supported, we don't need to calculate the dimensions here.
      // This way, newComponentDimensions take the current componentDimensions to prevent a
      // resubscription by resize.
      let newComponentDimensions = this.componentDimensions;
      if (!this.resizeObserver) {
        newComponentDimensions = getComponentDimensions({
          component: this,
          dimensions: nextDimensions,
          appearance: nextAppearance,
        });

        this.setState({
          elementWidth: newComponentDimensions.width,
        });
      }

      if (
        currentMediaClient !== nextMediaClient ||
        isDifferentIdentifier(currentIdentifier, nextIdenfifier) ||
        isBigger(this.componentDimensions, newComponentDimensions)
      ) {
        this.componentDimensions = newComponentDimensions; // Has to be set before subscribe
        this.subscribe(nextIdenfifier, nextMediaClient);
      }
    },
    DELAY_SUBSCRIPTION,
    { leading: true, trailing: true },
  );

  onComponentResize = debounce(
    (newDimensions: Dimensions) => {
      const { mediaClient, identifier } = this.props;
      if (isBigger(this.componentDimensions, newDimensions)) {
        this.componentDimensions = newDimensions; // Has to be set before subscribe
        this.subscribe(identifier, mediaClient);
      }
      this.setState({
        elementWidth: newDimensions.width,
      });
    },
    DELAY_SUBSCRIPTION,
    { leading: true, trailing: true },
  );

  componentWillUnmount() {
    this.hasBeenMounted = false;
    this.unsubscribe();
    this.releaseDataURI();
    document.removeEventListener('copy', this.onCopyListener);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  releaseDataURI = () => {
    const { identifier } = this.props;
    const { dataURI } = this.state;
    // we don't want to release external previews, since it might be reused later on
    if (dataURI && identifier.mediaItemType !== 'external-image') {
      URL.revokeObjectURL(dataURI);
    }
  };

  private onLoadingChangeCallback = () => {
    const { onLoadingChange } = this.props;
    if (onLoadingChange) {
      const { status, error, metadata } = this.state;
      const state = {
        type: status,
        payload: error || metadata,
      };
      onLoadingChange(state);
    }
  };

  subscribe = debounce(
    (identifier: Identifier, mediaClient: MediaClient) => {
      const { isCardVisible } = this.state;
      if (!isCardVisible) {
        return;
      }
      if (identifier.mediaItemType === 'external-image') {
        this.subscribeExternalFile(identifier);
      } else {
        this.subscribeInternalFile(identifier, mediaClient);
      }
    },
    DELAY_SUBSCRIPTION,
    { leading: true, trailing: true },
  );

  subscribeExternalFile(identifier: ExternalImageIdentifier) {
    const { createAnalyticsEvent } = this.props;
    const { dataURI, name, mediaItemType } = identifier;
    this.resolvedId = mediaItemType;

    createAndFireCustomMediaEvent(
      {
        eventType: 'operational',
        action: 'commenced',
        actionSubject: 'mediaCardRender',
        actionSubjectId: mediaItemType,
      },
      createAnalyticsEvent,
    );

    this.setState({
      status: 'complete',
      dataURI,
      metadata: {
        id: mediaItemType,
        name: name || dataURI,
        mediaType: 'image',
      },
    });
  }

  async subscribeInternalFile(
    identifier: FileIdentifier,
    mediaClient: MediaClient,
  ) {
    const { id, collectionName, occurrenceKey } = identifier;
    const { createAnalyticsEvent } = this.props;
    this.resolvedId = await id;

    createAndFireCustomMediaEvent(
      {
        eventType: 'operational',
        action: 'commenced',
        actionSubject: 'mediaCardRender',
        actionSubjectId: this.resolvedId,
      },
      createAnalyticsEvent,
    );

    this.unsubscribe();
    this.subscription = mediaClient.file
      .getFileState(this.resolvedId, { collectionName, occurrenceKey })
      .subscribe({
        next: async fileState => {
          let { status, progress, previewOrientation = 1 } = this.state;
          const { contextId, alt } = this.props;
          const metadata = extendMetadata(fileState, this.state.metadata);

          if (!this.nextDataURI) {
            const { src, orientation } = await getDataURIFromFileState(
              fileState,
            );
            previewOrientation = orientation || 1;
            this.nextDataURI = src;
            if (this.nextDataURI && contextId) {
              this.nextDataURI = addFileAttrsToUrl(this.nextDataURI, {
                id: this.resolvedId,
                collection: collectionName,
                contextId,
                mimeType: metadata.mimeType,
                name: metadata.name,
                size: metadata.size,
                alt,
              });
            }
          }

          const shouldFetchRemotePreview =
            !this.nextDataURI &&
            isImageRepresentationReady(fileState) &&
            metadata.mediaType &&
            isPreviewableType(metadata.mediaType);
          if (shouldFetchRemotePreview) {
            const { width, height } = getRetinaValue(this.componentDimensions);
            const { resizeMode, alt } = this.props;
            try {
              const mode =
                resizeMode === 'stretchy-fit' ? 'full-fit' : resizeMode;
              const blob = await mediaClient.getImage(this.resolvedId, {
                collection: collectionName,
                mode,
                width,
                height,
                allowAnimated: true,
              });
              this.nextDataURI = URL.createObjectURL(blob);
              if (contextId) {
                this.nextDataURI = addFileAttrsToUrl(this.nextDataURI, {
                  id: this.resolvedId,
                  collection: collectionName,
                  contextId,
                  mimeType: metadata.mimeType,
                  name: metadata.name,
                  size: metadata.size,
                  width,
                  height,
                  alt,
                });
              }
              this.releaseDataURI();
            } catch (e) {
              // We don't want to set status=error if the preview fails, we still want to display the metadata
            }
          }

          status = getCardStatusFromFileState(fileState, this.nextDataURI);
          progress =
            getCardProgressFromFileState(fileState, this.nextDataURI) ||
            progress;

          this.fireLoadingStatusAnalyticsEvent({
            resolvedId: this.resolvedId,
            status,
            fileState,
            metadata,
          });

          this.notifyStateChange({
            metadata,
            status,
            progress,
            dataURI: this.nextDataURI,
            previewOrientation,
          });
        },
        error: error => {
          this.fireLoadingStatusAnalyticsEvent({
            resolvedId: this.resolvedId,
            status: 'error',
            error,
          });
          this.notifyStateChange({ error, status: 'error' });
        },
      });
  }

  shouldFireAnalyticsEvent = (
    action: AnalyticsLoadingAction,
    errorState: AnalyticsErrorStateAttributes,
  ) => {
    const previousFailReason =
      this.lastErrorState && this.lastErrorState.failReason;
    const previousErrorMessage =
      this.lastErrorState && this.lastErrorState.error;

    const isDifferentErrorState =
      errorState.failReason !== previousFailReason ||
      errorState.error !== previousErrorMessage;

    const isDifferentAction = action !== this.lastAction;

    return isDifferentAction || isDifferentErrorState;
  };

  fireLoadingStatusAnalyticsEvent = ({
    resolvedId,
    status,
    fileState,
    metadata,
    error,
  }: {
    resolvedId: string;
    status: CardStatus;
    fileState?: FileState;
    metadata?: FileDetails;
    error?: Error;
  }) => {
    const { createAnalyticsEvent } = this.props;
    const action = getAnalyticsStatusFromCardStatus(status);
    const errorState = getAnalyticsErrorStateAttributes(fileState, error);

    if (action && this.shouldFireAnalyticsEvent(action, errorState)) {
      this.lastAction = action;
      this.lastErrorState = errorState;
      createAndFireCustomMediaEvent(
        {
          eventType: 'operational',
          action,
          actionSubject: 'mediaCardRender',
          actionSubjectId: resolvedId,
          attributes: {
            fileAttributes: getFileAttributes(metadata),
            ...errorState,
          },
        },
        createAnalyticsEvent,
      );
    }
  };

  notifyStateChange = (state: Partial<CardState>) => {
    if (this.hasBeenMounted) {
      this.setState(
        state as Pick<CardState, keyof CardState>,
        this.onLoadingChangeCallback,
      );
    }
  };

  unsubscribe = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.nextDataURI = undefined;
    this.lastAction = undefined;
    this.lastErrorState = {};
  };

  // This method is called when card fails and user press 'Retry'
  private onRetry = () => {
    const { identifier, mediaClient } = this.props;
    this.lastAction = undefined;
    this.lastErrorState = {};
    this.subscribe(identifier, mediaClient);
  };

  get actions(): CardAction[] {
    const { actions = [], identifier } = this.props;
    const { status, metadata } = this.state;
    if (isFileIdentifier(identifier) && status === 'failed-processing') {
      const downloadAction = {
        label: 'Download',
        icon: <DownloadIcon label="Download" />,
        handler: async () =>
          this.props.mediaClient.file.downloadBinary(
            await identifier.id,
            (metadata as FileDetails).name,
            identifier.collectionName,
          ),
      };
      return [downloadAction, ...actions];
    } else {
      return actions;
    }
  }

  onCardViewClick = async (
    event: React.MouseEvent<HTMLDivElement>,
    analyticsEvent?: UIAnalyticsEvent,
  ) => {
    const { identifier, useInlinePlayer, shouldOpenMediaViewer } = this.props;
    const { metadata } = this.state;

    this.onClick(event, analyticsEvent);

    if (!metadata) {
      return;
    }

    const isVideo = metadata && (metadata as FileDetails).mediaType === 'video';
    if (useInlinePlayer && isVideo) {
      this.setState({
        isPlayingFile: true,
      });
    } else if (shouldOpenMediaViewer) {
      let mediaViewerSelectedItem: Identifier | undefined;

      if (isFileIdentifier(identifier)) {
        mediaViewerSelectedItem = {
          id: await identifier.id,
          mediaItemType: 'file',
          collectionName: identifier.collectionName,
          occurrenceKey: identifier.occurrenceKey,
        };
      } else {
        mediaViewerSelectedItem = {
          mediaItemType: 'external-image',
          dataURI: identifier.dataURI,
          name: identifier.name,
        };
      }

      this.setState({
        mediaViewerSelectedItem,
      });
    }
  };

  onInlinePlayerError = () => {
    this.setState({
      isPlayingFile: false,
    });
  };

  renderInlinePlayer = () => {
    const { identifier, mediaClient, dimensions, selected } = this.props;

    return (
      <InlinePlayer
        mediaClient={mediaClient}
        dimensions={dimensions || {}}
        identifier={identifier as FileIdentifier}
        onError={this.onInlinePlayerError}
        onClick={this.onClick}
        selected={selected}
        ref={this.cardRef}
      />
    );
  };

  onMediaViewerClose = () => {
    this.setState({
      mediaViewerSelectedItem: undefined,
    });
  };

  private onDisplayImage = async () => {
    const { identifier } = this.props;
    let payloadPart: Pick<
      MediaViewedEventPayload,
      'fileId' | 'isUserCollection'
    >;
    if (isFileIdentifier(identifier)) {
      payloadPart = {
        fileId: await identifier.id,
        isUserCollection: identifier.collectionName === RECENTS_COLLECTION,
      };
    } else {
      payloadPart = {
        fileId: identifier.dataURI,
        isUserCollection: false,
      };
    }

    globalMediaEventEmitter.emit('media-viewed', {
      viewingLevel: 'minimal',
      ...payloadPart,
    });
  };

  renderMediaViewer = (): React.ReactPortal | undefined => {
    const { mediaViewerSelectedItem } = this.state;
    const { mediaClient, identifier, mediaViewerDataSource } = this.props;
    if (!mediaViewerSelectedItem) {
      return;
    }

    const collectionName = isFileIdentifier(identifier)
      ? identifier.collectionName || ''
      : '';
    const dataSource: MediaViewerDataSource = mediaViewerDataSource || {
      list: [],
    };

    return ReactDOM.createPortal(
      <MediaViewer
        collectionName={collectionName}
        dataSource={dataSource}
        mediaClientConfig={mediaClient.config}
        selectedItem={mediaViewerSelectedItem}
        onClose={this.onMediaViewerClose}
      />,
      document.body,
    );
  };

  renderCard = () => {
    const {
      isLazy,
      appearance,
      resizeMode,
      dimensions,
      selectable,
      selected,
      onSelectChange,
      disableOverlay,
      alt,
    } = this.props;
    const {
      progress,
      metadata,
      dataURI,
      previewOrientation,
      elementWidth,
    } = this.state;
    const {
      onRetry,
      onCardViewClick,
      onDisplayImage,
      actions,
      onMouseEnter,
    } = this;
    const status = getCardStatus(this.state, this.props);

    const card = (
      <CardView
        status={status}
        metadata={metadata}
        dataURI={dataURI}
        alt={alt}
        appearance={appearance}
        resizeMode={resizeMode}
        dimensions={dimensions}
        elementWidth={elementWidth}
        actions={actions}
        selectable={selectable}
        selected={selected}
        onClick={onCardViewClick}
        onMouseEnter={onMouseEnter}
        onSelectChange={onSelectChange}
        disableOverlay={disableOverlay}
        progress={progress}
        onRetry={onRetry}
        onDisplayImage={onDisplayImage}
        previewOrientation={previewOrientation}
        ref={this.cardRef}
      />
    );

    return isLazy ? (
      <LazyContent placeholder={card} onRender={this.onCardInViewport}>
        {card}
      </LazyContent>
    ) : (
      card
    );
  };

  renderContent() {
    const { isPlayingFile, mediaViewerSelectedItem } = this.state;
    const innerContent = isPlayingFile
      ? this.renderInlinePlayer()
      : this.renderCard();

    return this.context.intl ? (
      innerContent
    ) : (
      <IntlProvider locale="en">
        <>
          {innerContent}
          {mediaViewerSelectedItem ? this.renderMediaViewer() : null}
        </>
      </IntlProvider>
    );
  }

  render() {
    const { metadata } = this.state;
    return (
      /*
          Second context provides data to be merged with any other context down in the tree and the event's payload.
          This data is usually not available at the time of firing the event, though it is needed to be sent to the backend.
       */
      <AnalyticsContext data={getUIAnalyticsContext(this.resolvedId, metadata)}>
        {this.renderContent()}
      </AnalyticsContext>
    );
  }

  onCardInViewport = () => {
    this.setState({ isCardVisible: true }, () => {
      const { identifier, mediaClient } = this.props;
      this.subscribe(identifier, mediaClient);
    });
  };

  onClick = (
    event: React.MouseEvent<HTMLDivElement>,
    analyticsEvent?: UIAnalyticsEvent,
  ) => {
    const { onClick } = this.props;
    const { metadata } = this.state;
    if (onClick) {
      const cardEvent = {
        event,
        mediaItemDetails: metadata,
      };
      onClick(cardEvent, analyticsEvent);
    }
  };

  onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onMouseEnter } = this.props;
    const { metadata } = this.state;
    if (onMouseEnter) {
      const cardEvent = {
        event,
        mediaItemDetails: metadata,
      };
      onMouseEnter(cardEvent);
    }
  };
}

/*
  This Context provides data needed to build packageHierarchy in Atlaskit Analytics Listener and Media Analytics Listener.
  This data is not added to the final GASv3 payload
*/
export const Card: React.ComponentType<
  CardWithAnalyticsEventsProps
> = withAnalyticsContext(getBaseAnalyticsContext())(
  withAnalyticsEvents()(CardBase),
);
