import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Identifier,
  FileIdentifier,
  FileDetails,
  isPreviewableType,
  isFileIdentifier,
  isExternalImageIdentifier,
  isDifferentIdentifier,
  MediaClient,
  WithMediaClientProps,
  isImageRepresentationReady,
} from '@atlaskit/media-client';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import { Subscription } from 'rxjs/Subscription';
import { IntlProvider } from 'react-intl';
import { MediaViewer, MediaViewerDataSource } from '@atlaskit/media-viewer';
import {
  CardAnalyticsContext,
  CardAction,
  CardDimensions,
  BaseCardProps,
  CardState,
  CardEvent,
} from '../..';
import { CardView } from '../cardView';
import { LazyContent } from '../../utils/lazyContent';
import { getBaseAnalyticsContext } from '../../utils/analyticsUtils';
import { getDataURIDimension } from '../../utils/getDataURIDimension';
import { getDataURIFromFileState } from '../../utils/getDataURIFromFileState';
import { extendMetadata } from '../../utils/metadata';
import { isBigger } from '../../utils/dimensionComparer';
import { getCardStatus } from './getCardStatus';
import { InlinePlayer } from '../inlinePlayer';

export type CardProps = BaseCardProps & WithMediaClientProps;

export class Card extends React.Component<CardProps, CardState> {
  private hasBeenMounted: boolean = false;
  private onClickPayload?: {
    result: CardEvent;
    analyticsEvent?: UIAnalyticsEventInterface;
  };

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
  };

  componentDidMount() {
    const { identifier, mediaClient } = this.props;
    this.hasBeenMounted = true;
    this.subscribe(identifier, mediaClient);
  }

  componentWillReceiveProps(nextProps: CardProps) {
    const {
      mediaClient: currentMediaClient,
      identifier: currentIdentifier,
      dimensions: currentDimensions,
    } = this.props;
    const {
      mediaClient: nextMediaClient,
      identifier: nextIdenfifier,
      dimensions: nextDimensions,
    } = nextProps;
    const isDifferent = isDifferentIdentifier(
      currentIdentifier,
      nextIdenfifier,
    );

    if (
      currentMediaClient !== nextMediaClient ||
      isDifferent ||
      this.shouldRefetchImage(currentDimensions, nextDimensions)
    ) {
      this.subscribe(nextIdenfifier, nextMediaClient);
    }
  }

  shouldRefetchImage = (current?: CardDimensions, next?: CardDimensions) => {
    if (!current || !next) {
      return false;
    }
    return isBigger(current, next);
  };

  componentWillUnmount() {
    this.hasBeenMounted = false;
    this.unsubscribe();
    this.releaseDataURI();
  }

  releaseDataURI = () => {
    const { dataURI } = this.state;
    if (dataURI) {
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

  async subscribe(identifier: Identifier, mediaClient: MediaClient) {
    const { isCardVisible } = this.state;
    if (!isCardVisible) {
      return;
    }

    if (identifier.mediaItemType === 'external-image') {
      const { dataURI, name } = identifier;

      this.setState({
        status: 'complete',
        dataURI,
        metadata: {
          id: dataURI,
          name: name || dataURI,
          mediaType: 'image',
        },
      });

      return;
    }

    const { id, collectionName, occurrenceKey } = identifier;
    const resolvedId = typeof id === 'string' ? id : await id;
    this.unsubscribe();
    this.subscription = mediaClient.file
      .getFileState(resolvedId, { collectionName, occurrenceKey })
      .subscribe({
        next: async fileState => {
          let currentDataURI = this.state.dataURI;
          const { metadata: currentMetadata } = this.state;
          const metadata = extendMetadata(
            fileState,
            currentMetadata as FileDetails,
          );

          if (!currentDataURI) {
            const {
              src,
              orientation: previewOrientation,
            } = await getDataURIFromFileState(fileState);
            currentDataURI = src;
            this.notifyStateChange({
              dataURI: currentDataURI,
              previewOrientation,
            });
          }
          switch (fileState.status) {
            case 'uploading':
              const { progress } = fileState;
              this.notifyStateChange({
                status: 'uploading',
                progress,
                metadata,
              });
              break;
            case 'processing':
              if (currentDataURI) {
                this.notifyStateChange({
                  progress: 1,
                  status: 'complete',
                  metadata,
                });
              } else {
                this.notifyStateChange({
                  status: 'processing',
                  metadata,
                });
              }
              break;
            case 'processed':
              this.notifyStateChange({ status: 'complete', metadata });
              break;
            case 'failed-processing':
              this.notifyStateChange({ status: 'failed-processing', metadata });
              break;
            case 'error':
              this.notifyStateChange({ status: 'error' });
          }

          if (
            !currentDataURI &&
            isImageRepresentationReady(fileState) &&
            metadata.mediaType &&
            isPreviewableType(metadata.mediaType)
          ) {
            const { appearance, dimensions, resizeMode } = this.props;
            const options = {
              appearance,
              dimensions,
              component: this,
            };
            const width = getDataURIDimension('width', options);
            const height = getDataURIDimension('height', options);
            try {
              const mode =
                resizeMode === 'stretchy-fit' ? 'full-fit' : resizeMode;
              const blob = await mediaClient.getImage(resolvedId, {
                collection: collectionName,
                mode,
                height,
                width,
                allowAnimated: true,
              });
              const dataURI = URL.createObjectURL(blob);
              this.releaseDataURI();
              if (this.hasBeenMounted) {
                this.setState({ dataURI });
              }
            } catch (e) {
              // We don't want to set status=error if the preview fails, we still want to display the metadata
            }
          }
        },
        error: error => {
          this.notifyStateChange({ error, status: 'error' });
        },
      });
  }

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

    if (this.hasBeenMounted) {
      this.setState({ dataURI: undefined });
    }
  };

  // This method is called when card fails and user press 'Retry'
  private onRetry = () => {
    const { identifier, mediaClient } = this.props;

    this.subscribe(identifier, mediaClient);
  };

  get analyticsContext(): CardAnalyticsContext {
    const { identifier } = this.props;
    const id = isExternalImageIdentifier(identifier)
      ? 'external-image'
      : identifier.id;

    return getBaseAnalyticsContext('Card', id);
  }

  get actions(): CardAction[] {
    const { actions = [], identifier } = this.props;
    const { status, metadata } = this.state;
    if (isFileIdentifier(identifier) && status === 'failed-processing') {
      actions.unshift({
        label: 'Download',
        icon: <DownloadIcon label="Download" />,
        handler: async () =>
          this.props.mediaClient.file.downloadBinary(
            await identifier.id,
            (metadata as FileDetails).name,
            identifier.collectionName,
          ),
      });
    }

    return actions;
  }

  onClick = async (
    result: CardEvent,
    analyticsEvent?: UIAnalyticsEventInterface,
  ) => {
    const {
      identifier,
      onClick,
      useInlinePlayer,
      shouldOpenMediaViewer,
    } = this.props;
    const { mediaItemDetails } = result;

    this.onClickPayload = {
      result,
      analyticsEvent,
    };

    if (onClick) {
      onClick(result, analyticsEvent);
    }
    if (!mediaItemDetails) {
      return;
    }
    const { mediaType } = mediaItemDetails as FileDetails;
    if (useInlinePlayer && mediaType === 'video') {
      this.setState({
        isPlayingFile: true,
      });
    } else if (shouldOpenMediaViewer && identifier.mediaItemType === 'file') {
      const mediaViewerSelectedItem: FileIdentifier = {
        id: await identifier.id,
        mediaItemType: 'file',
        collectionName: identifier.collectionName,
        occurrenceKey: identifier.occurrenceKey,
      };
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

  onInlinePlayerClick = () => {
    const { onClick } = this.props;
    if (onClick && this.onClickPayload) {
      onClick(this.onClickPayload.result, this.onClickPayload.analyticsEvent);
    }
  };

  renderInlinePlayer = () => {
    const { identifier, mediaClient, dimensions, selected } = this.props;

    return (
      <InlinePlayer
        mediaClient={mediaClient}
        dimensions={dimensions}
        identifier={identifier as FileIdentifier}
        onError={this.onInlinePlayerError}
        onClick={this.onInlinePlayerClick}
        selected={selected}
      />
    );
  };

  onMediaViewerClose = () => {
    this.setState({
      mediaViewerSelectedItem: undefined,
    });
  };

  // returns a valid MV data source including current the card identifier
  getMediaViewerDataSource = (): MediaViewerDataSource => {
    const { mediaViewerDataSource } = this.props;
    const { mediaViewerSelectedItem } = this.state;

    if (!mediaViewerSelectedItem) {
      return {
        list: [],
      };
    }

    if (!mediaViewerDataSource) {
      return {
        list: [mediaViewerSelectedItem],
      };
    }

    // we want to ensure the card identifier is in the list
    const { list } = mediaViewerDataSource;
    if (
      list &&
      list.length &&
      mediaViewerSelectedItem.mediaItemType === 'file'
    ) {
      const isSelectedItemInList = list.some(
        item =>
          item.mediaItemType === 'file' &&
          item.id === mediaViewerSelectedItem.id,
      );
      if (!isSelectedItemInList) {
        return {
          list: [mediaViewerSelectedItem, ...list],
        };
      }
    }

    return mediaViewerDataSource;
  };

  renderMediaViewer = () => {
    const { mediaViewerSelectedItem } = this.state;
    const { identifier } = this.props;
    if (!mediaViewerSelectedItem || identifier.mediaItemType !== 'file') {
      return;
    }

    const { collectionName = '' } = identifier;
    const dataSource = this.getMediaViewerDataSource();

    return ReactDOM.createPortal(
      <MediaViewer
        collectionName={collectionName}
        dataSource={dataSource}
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
      onMouseEnter,
      onSelectChange,
      disableOverlay,
      identifier,
    } = this.props;
    const { progress, metadata, dataURI, previewOrientation } = this.state;
    const { analyticsContext, onRetry, onClick, actions } = this;
    const status = getCardStatus(this.state, this.props);
    const card = (
      <AnalyticsContext data={analyticsContext}>
        <CardView
          status={status}
          metadata={metadata}
          dataURI={dataURI}
          mediaItemType={identifier.mediaItemType}
          appearance={appearance}
          resizeMode={resizeMode}
          dimensions={dimensions}
          actions={actions}
          selectable={selectable}
          selected={selected}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onSelectChange={onSelectChange}
          disableOverlay={disableOverlay}
          progress={progress}
          onRetry={onRetry}
          previewOrientation={previewOrientation}
        />
      </AnalyticsContext>
    );

    return isLazy ? (
      <LazyContent placeholder={card} onRender={this.onCardInViewport}>
        {card}
      </LazyContent>
    ) : (
      card
    );
  };

  render() {
    const { isPlayingFile, mediaViewerSelectedItem } = this.state;
    const content = isPlayingFile
      ? this.renderInlinePlayer()
      : this.renderCard();

    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">
        <>
          {content}
          {mediaViewerSelectedItem ? this.renderMediaViewer() : null}
        </>
      </IntlProvider>
    );
  }

  onCardInViewport = () => {
    this.setState({ isCardVisible: true }, () => {
      const { identifier, mediaClient } = this.props;
      this.subscribe(identifier, mediaClient);
    });
  };
}
