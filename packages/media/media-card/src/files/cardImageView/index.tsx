import * as React from 'react';
import { Component, ReactNode } from 'react';
import { MediaType, ImageResizeMode } from '@atlaskit/media-client';
import { Ellipsify, MediaImage } from '@atlaskit/media-ui';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';

import { CardDimensions, CardState, CardStatus } from '../../index';
import { CardAction } from '../../actions';

import { CardOverlay } from './cardOverlay';
import {
  PlayIconWrapper,
  Wrapper,
  ProgressBarWrapper,
  Body,
  CardActionsWrapper,
  Overlay,
  ProgressWrapper,
  Title,
} from './styled';
import { isLoadingImage } from '../../utils/isLoadingImage';
import { CardLoading } from '../../utils/lightCards/cardLoading';
import { shouldDisplayImageThumbnail } from '../../utils/shouldDisplayImageThumbnail';
import { ProgressBar } from '../../utils/progressBar';
import CardActions from '../../utils/cardActions';
import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { createAndFireCustomMediaEvent } from '../../utils/analytics';
import { AnalyticsLoadingAction } from '../../root/card/getCardStatus';

export interface FileCardImageViewProps {
  readonly mediaName?: string;
  readonly mediaType?: MediaType;
  readonly fileSize?: string;

  readonly dataURI?: string;
  readonly alt?: string;
  readonly progress?: number;
  readonly status: CardStatus;

  readonly dimensions?: CardDimensions;
  readonly resizeMode?: ImageResizeMode;

  readonly disableOverlay?: boolean;
  readonly selectable?: boolean;
  readonly selected?: boolean;

  readonly error?: ReactNode;

  readonly actions?: CardAction[];
  readonly onRetry?: () => void;
  readonly onDisplayImage?: () => void;
  readonly previewOrientation?: number;
  readonly animationState?: CardState['animationState'];
}

interface FileCardImageViewState {
  absolutePositionData?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export class FileCardImageViewBase extends Component<
  FileCardImageViewProps & WithAnalyticsEventsProps,
  FileCardImageViewState
> {
  state: FileCardImageViewState = {};
  divRef: React.RefObject<HTMLDivElement> = React.createRef();
  private wasThumbnailDisplayed = false;
  private lastAnalyticsAction: AnalyticsLoadingAction | undefined;
  static defaultProps = {
    resizeMode: 'crop',
    disableOverlay: false,
  };

  componentDidMount(): void {
    this.updateAbsolutePositionData();
  }

  componentDidUpdate(
    prevProps: Readonly<FileCardImageViewProps & WithAnalyticsEventsProps>,
    prevState: Readonly<FileCardImageViewState>,
    snapshot?: any,
  ): void {
    this.updateAbsolutePositionData();
  }

  private updateAbsolutePositionData() {
    const { absolutePositionData } = this.state;
    if (!absolutePositionData && this.divRef.current) {
      const {
        left,
        top,
        width,
        height,
      }: ClientRect = this.divRef.current.getBoundingClientRect();
      this.setState({
        absolutePositionData: {
          left,
          top,
          width,
          height,
        },
      });
    }
  }

  render() {
    const {
      disableOverlay,
      selectable,
      selected,
      mediaType,
      progress,
      status,
      animationState,
    } = this.props;
    const { absolutePositionData } = this.state;

    const className = animationState
      ? `is-expanding-animation-${animationState}`
      : '';
    let style: React.CSSProperties = {};
    if (absolutePositionData) {
      const { left, top, width, height } = absolutePositionData;
      if (animationState === 'start') {
        style['left'] = left;
        style['top'] = top;
        style['width'] = width;
        style['height'] = height;
      }
      if (animationState === 'progress') {
        const { innerHeight, innerWidth } = window;

        const isScreenMoreLandscapy = innerWidth / innerHeight > width / height;
        if (isScreenMoreLandscapy) {
          style['height'] = innerHeight;
          style['width'] = (style['height'] * width) / height;
          style['top'] = 0;
          style['left'] = innerWidth / 2 - style['width'] / 2;
        } else {
          throw new Error('Implement me!');
        }
      }
    }

    return (
      <Wrapper
        data-testid="media-file-card-view"
        data-test-status={status}
        data-test-progress={progress}
        data-test-selected={selected ? true : undefined}
        className={className}
        style={style}
        disableOverlay={disableOverlay}
        selectable={selectable}
        selected={selected}
        mediaType={mediaType}
        innerRef={this.divRef}
      >
        {this.renderCardContents()}
      </Wrapper>
    );
  }

  private renderCardContents = (): Array<JSX.Element> | JSX.Element => {
    const { status } = this.props;

    if (status === 'error') {
      return this.renderErrorContents();
    } else if (status === 'failed-processing') {
      return this.renderFailedContents();
    }

    if (this.isImageNotReadyForDisplay) {
      return this.renderLoadingContents();
    }

    return this.renderSuccessCardContents();
  };

  private renderLoadingContents = () => {
    return (
      <div className="wrapper">
        <div className="img-wrapper">
          <CardLoading />
        </div>
      </div>
    );
  };

  private renderErrorContents = (): JSX.Element => {
    const {
      error,
      mediaName,
      mediaType,
      onRetry,
      actions,
      fileSize,
    } = this.props;

    return (
      <>
        <div className="wrapper" />
        <CardOverlay
          persistent={true}
          mediaName={mediaName}
          mediaType={mediaType}
          error={error}
          onRetry={onRetry}
          actions={actions}
          subtitle={fileSize}
        />
      </>
    );
  };

  private renderFailedContents = () => {
    const { mediaName, mediaType, actions, fileSize } = this.props;

    return (
      <>
        <div className="wrapper" />
        <CardOverlay
          noHover={true}
          persistent={true}
          mediaName={mediaName}
          mediaType={mediaType}
          actions={actions}
          subtitle={fileSize}
        />
      </>
    );
  };

  private renderUploadingCardOverlay = (): JSX.Element => {
    const { mediaType, dataURI, selectable, selected } = this.props;
    const isPersistent = mediaType === 'doc' || !dataURI;

    return (
      <CardOverlay
        persistent={isPersistent}
        selectable={selectable}
        selected={selected}
      />
    );
  };

  private renderPlayButton = () => {
    const { mediaType } = this.props;
    if (mediaType !== 'video') {
      return null;
    }

    return (
      <PlayIconWrapper>
        <VidPlayIcon label="play" size="large" />
      </PlayIconWrapper>
    );
  };

  onImageLoad = () => {
    this.fireLoadingStatusAnalyticsEvent('succeeded');
  };

  onImageError = () => {
    this.fireLoadingStatusAnalyticsEvent('failed');
  };

  private renderMediaImage = () => {
    const {
      dataURI,
      mediaType,
      previewOrientation,
      onDisplayImage,
      alt,
      animationState,
    } = this.props;

    if (!shouldDisplayImageThumbnail(dataURI, mediaType)) {
      this.fireLoadingStatusAnalyticsEvent('succeeded');
      return null;
    }

    if (
      !this.wasThumbnailDisplayed &&
      onDisplayImage &&
      mediaType === 'image'
    ) {
      onDisplayImage();
      this.wasThumbnailDisplayed = true;
    }

    return (
      <MediaImage
        dataURI={dataURI}
        alt={alt}
        crop={this.isCropped}
        stretch={!!animationState || this.isStretched}
        previewOrientation={previewOrientation}
        onImageLoad={this.onImageLoad}
        onImageError={this.onImageError}
      />
    );
  };
  shouldFireLoadingStatusAnalyticsEvent = (action: AnalyticsLoadingAction) =>
    !this.lastAnalyticsAction || this.lastAnalyticsAction !== action;

  fireLoadingStatusAnalyticsEvent = (action: AnalyticsLoadingAction) => {
    const { createAnalyticsEvent } = this.props;

    if (this.shouldFireLoadingStatusAnalyticsEvent(action)) {
      this.lastAnalyticsAction = action;

      createAndFireCustomMediaEvent(
        {
          eventType: 'operational',
          action,
          actionSubject: 'mediaCardRender',
          ...(action === 'failed'
            ? {
                attributes: {
                  failReason: 'file-uri-error',
                  error: 'unknown error',
                },
              }
            : {}),
        },
        createAnalyticsEvent,
      );
    }
  };

  private renderProgressBar = () => {
    const { mediaName, progress, actions, status } = this.props;

    if (status !== 'uploading') {
      return null;
    }

    return (
      <ProgressBarWrapper>
        <Overlay>
          <Title>
            <Ellipsify
              testId="media-card-file-name"
              text={mediaName || ''}
              lines={2}
            />
          </Title>
          <Body>
            <ProgressWrapper>
              <ProgressBar progress={progress} />
            </ProgressWrapper>
            <CardActionsWrapper>
              {actions ? (
                <CardActions actions={actions} triggerColor="white" />
              ) : null}
            </CardActionsWrapper>
          </Body>
        </Overlay>
      </ProgressBarWrapper>
    );
  };

  private renderSuccessCardContents = (): JSX.Element => {
    const { disableOverlay, selectable, status } = this.props;

    let overlay: JSX.Element | null = null;
    if (!disableOverlay) {
      if (status === 'uploading') {
        if (selectable) {
          overlay = this.renderUploadingCardOverlay();
        }
      } else {
        overlay = this.renderSuccessCardOverlay();
      }
    }

    return (
      <div className="wrapper">
        <div className="img-wrapper">
          {this.renderMediaImage()}
          {this.renderProgressBar()}
          {this.renderPlayButton()}
        </div>
        {overlay}
      </div>
    );
  };

  private renderSuccessCardOverlay = (): JSX.Element => {
    const {
      mediaName,
      mediaType,
      fileSize,
      dataURI,
      selectable,
      selected,
      actions,
    } = this.props;
    const isPersistent = mediaType === 'doc' || !dataURI;

    return (
      <CardOverlay
        persistent={isPersistent}
        selectable={selectable}
        selected={selected}
        mediaName={mediaName}
        mediaType={mediaType}
        subtitle={fileSize}
        actions={actions}
      />
    );
  };

  private get isImageNotReadyForDisplay() {
    const { status, dataURI, mediaType } = this.props;

    if (dataURI) {
      return false;
    }

    return (
      status === 'loading' ||
      status === 'processing' ||
      isLoadingImage(mediaType, dataURI)
    );
  }

  private get isCropped() {
    const { resizeMode } = this.props;

    return resizeMode === 'crop';
  }

  private get isStretched() {
    const { resizeMode } = this.props;

    return resizeMode === 'stretchy-fit';
  }
}

export const FileCardImageView = withAnalyticsEvents()(FileCardImageViewBase);
