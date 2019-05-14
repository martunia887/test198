import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';
import {
  Context,
  FileDetails,
  Identifier,
  FileIdentifier,
  isPreviewableType,
  isFileIdentifier,
  isExternalImageIdentifier,
  isDifferentIdentifier,
  isImageRepresentationReady,
} from '@atlaskit/media-core';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import {
  AnalyticsContext,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next';
import { Subscription } from 'rxjs/Subscription';
import { IntlProvider } from 'react-intl';
import { MediaViewer, MediaViewerDataSource } from '@atlaskit/media-viewer';
import {
  CardAnalyticsContext,
  CardAction,
  CardDimensions,
  CardProps,
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

export class Card extends Component<CardProps, CardState> {
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
    const { identifier, context } = this.props;
    this.hasBeenMounted = true;
    this.subscribe(identifier, context);
  }

  componentWillReceiveProps(nextProps: CardProps) {
    const {
      context: currentContext,
      identifier: currentIdentifier,
      dimensions: currentDimensions,
    } = this.props;
    const {
      context: nextContext,
      identifier: nextIdenfifier,
      dimensions: nextDimensions,
    } = nextProps;
    const isDifferent = isDifferentIdentifier(
      currentIdentifier,
      nextIdenfifier,
    );

    if (
      currentContext !== nextContext ||
      isDifferent ||
      this.shouldRefetchImage(currentDimensions, nextDimensions)
    ) {
      this.subscribe(nextIdenfifier, nextContext);
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

  async subscribe(identifier: Identifier, context: Context) {
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
    this.subscription = context.file
      .getFileState(resolvedId, { collectionName, occurrenceKey })
      .subscribe({
        next: async fileState => {
          let {
            status,
            progress,
            dataURI,
            previewOrientation = 1,
          } = this.state;
          const metadata = extendMetadata(fileState, this.state.metadata);

          if (!dataURI) {
            const { src, orientation } = await getDataURIFromFileState(
              fileState,
            );
            previewOrientation = orientation || 1;
            dataURI = src;
          }

          switch (fileState.status) {
            case 'uploading':
              progress = fileState.progress;
              status = 'uploading';
              break;
            case 'processing':
              if (dataURI) {
                status = 'complete';
                progress = 1;
              } else {
                status = 'processing';
              }
              break;
            case 'processed':
              status = 'complete';
              break;
            case 'failed-processing':
              status = 'failed-processing';
              break;
            case 'error':
              status = 'error';
          }

          const shouldFetchRemotePreview =
            !dataURI &&
            isImageRepresentationReady(fileState) &&
            metadata.mediaType &&
            isPreviewableType(metadata.mediaType);
          if (shouldFetchRemotePreview) {
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
              const blob = await context.getImage(resolvedId, {
                collection: collectionName,
                mode,
                height,
                width,
                allowAnimated: true,
              });
              dataURI = URL.createObjectURL(blob);
              this.releaseDataURI();
            } catch (e) {
              // We don't want to set status=error if the preview fails, we still want to display the metadata
            }
          }

          this.notifyStateChange({
            metadata,
            status,
            progress,
            dataURI,
            previewOrientation,
          });
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
    const { identifier, context } = this.props;

    this.subscribe(identifier, context);
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
          this.props.context.file.downloadBinary(
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

    const isVideo =
      mediaItemDetails &&
      (mediaItemDetails as FileDetails).mediaType === 'video';
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

  onInlinePlayerClick = () => {
    const { onClick } = this.props;
    if (onClick && this.onClickPayload) {
      onClick(this.onClickPayload.result, this.onClickPayload.analyticsEvent);
    }
  };

  renderInlinePlayer = () => {
    const { identifier, context, dimensions, selected } = this.props;

    return (
      <InlinePlayer
        context={context}
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

  renderMediaViewer = () => {
    const { mediaViewerSelectedItem } = this.state;
    const { context, identifier, mediaViewerDataSource } = this.props;
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
        context={context}
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
      const { identifier, context } = this.props;
      this.subscribe(identifier, context);
    });
  };
}
