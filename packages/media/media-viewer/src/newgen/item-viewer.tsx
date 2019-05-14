import * as React from 'react';
import {
  Context,
  FileState,
  Identifier,
  isExternalImageIdentifier,
  isFileIdentifier,
} from '@atlaskit/media-core';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { Outcome, MediaViewerFeatureFlags } from './domain';
import { ImageViewer } from './viewers/image';
import { VideoViewer } from './viewers/video';
import { DocViewer } from './viewers/doc';
import { Spinner } from './loading';
import { Subscription } from 'rxjs/Subscription';
import deepEqual from 'deep-equal';
import ErrorMessage, {
  createError,
  MediaViewerError,
  ErrorName,
} from './error';
import { ErrorViewDownloadButton } from './download';
import {
  withAnalyticsEvents,
  WithAnalyticsEventProps,
} from '@atlaskit/analytics-next';
import {
  ViewerLoadPayload,
  mediaFileCommencedEvent,
  mediaFileLoadSucceededEvent,
  mediaFileLoadFailedEvent,
} from './analytics/item-viewer';
import { channel } from './analytics/index';
import {
  GasPayload,
  GasScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { AudioViewer } from './viewers/audio';
import { InteractiveImg } from './viewers/image/interactive-img';

export type Props = Readonly<{
  identifier: Identifier;
  context: Context;
  featureFlags?: MediaViewerFeatureFlags;
  showControls?: () => void;
  onClose?: () => void;
  previewCount: number;
}> &
  WithAnalyticsEventProps;

export type State = {
  item: Outcome<FileState, MediaViewerError>;
};

const initialState: State = {
  item: Outcome.pending(),
};
export class ItemViewerBase extends React.Component<Props, State> {
  state: State = initialState;

  private subscription?: Subscription;

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.needsReset(this.props, nextProps)) {
      this.release();
      this.setState(initialState);
    }
  }

  componentDidUpdate(oldProps: Props) {
    if (this.needsReset(oldProps, this.props)) {
      this.init(this.props);
    }
  }

  componentWillUnmount() {
    this.release();
  }

  componentDidMount() {
    this.init(this.props);
  }

  private onViewerLoaded = async (payload: ViewerLoadPayload) => {
    const { item } = this.state;
    // the item.whenFailed case is handled in the "init" method
    item.whenSuccessful(async file => {
      if (file.status === 'processed') {
        const { identifier } = this.props;
        if (payload.status === 'success') {
          this.fireAnalytics(mediaFileLoadSucceededEvent(file));
        } else if (payload.status === 'error' && isFileIdentifier(identifier)) {
          const id =
            typeof identifier.id === 'string'
              ? identifier.id
              : await identifier.id;
          this.fireAnalytics(
            mediaFileLoadFailedEvent(
              id,
              payload.errorMessage || 'Viewer error',
              file,
            ),
          );
        }
      }
    });
  };

  private onCanPlay = (fileState: FileState) => () => {
    if (fileState.status === 'processed') {
      this.fireAnalytics(mediaFileLoadSucceededEvent(fileState));
    }
  };

  private onError = (fileState: FileState) => () => {
    if (fileState.status === 'processed') {
      this.fireAnalytics(
        mediaFileLoadFailedEvent(fileState.id, 'Playback failed', fileState),
      );
    }
  };

  private renderFileState(item: FileState) {
    if (item.status === 'error') {
      return this.renderError('previewFailed', item);
    }

    const {
      context,
      identifier,
      featureFlags,
      showControls,
      onClose,
      previewCount,
    } = this.props;
    const collectionName = isFileIdentifier(identifier)
      ? identifier.collectionName
      : undefined;
    const viewerProps = {
      context,
      item,
      collectionName,
      onClose,
      previewCount,
    };

    switch (item.mediaType) {
      case 'image':
        return <ImageViewer onLoad={this.onViewerLoaded} {...viewerProps} />;
      case 'audio':
        return (
          <AudioViewer
            showControls={showControls}
            featureFlags={featureFlags}
            onCanPlay={this.onCanPlay(item)}
            onError={this.onError(item)}
            {...viewerProps}
          />
        );
      case 'video':
        return (
          <VideoViewer
            showControls={showControls}
            featureFlags={featureFlags}
            onCanPlay={this.onCanPlay(item)}
            onError={this.onError(item)}
            {...viewerProps}
          />
        );
      case 'doc':
        return <DocViewer {...viewerProps} />;
      default:
        return this.renderError('unsupported', item);
    }
  }

  private renderError(errorName: ErrorName, file?: FileState) {
    if (file) {
      const err = createError(errorName, undefined, file);
      return (
        <ErrorMessage error={err}>
          <p>
            <FormattedMessage {...messages.try_downloading_file} />
          </p>
          {this.renderDownloadButton(file, err)}
        </ErrorMessage>
      );
    } else {
      return <ErrorMessage error={createError(errorName)} />;
    }
  }

  render() {
    const { identifier } = this.props;
    const { item } = this.state;
    if (isExternalImageIdentifier(identifier)) {
      const { dataURI } = identifier;
      return <InteractiveImg src={dataURI} />;
    }

    return item.match({
      successful: item => {
        switch (item.status) {
          case 'processed':
          case 'uploading':
          case 'processing':
            return this.renderFileState(item);
          case 'failed-processing':
          case 'error':
            return this.renderError('previewFailed', item);
          default:
            return <Spinner />;
        }
      },
      pending: () => <Spinner />,
      failed: err => this.renderError(err.errorName, item.data),
    });
  }

  private renderDownloadButton(state: FileState, err: MediaViewerError) {
    const { context, identifier } = this.props;
    const collectionName = isFileIdentifier(identifier)
      ? identifier.collectionName
      : undefined;
    return (
      <ErrorViewDownloadButton
        state={state}
        context={context}
        err={err}
        collectionName={collectionName}
      />
    );
  }

  private async init(props: Props) {
    const { context, identifier } = props;

    if (isExternalImageIdentifier(identifier)) {
      return;
    }

    const id =
      typeof identifier.id === 'string' ? identifier.id : await identifier.id;
    this.fireAnalytics(mediaFileCommencedEvent(id));
    this.subscription = context.file
      .getFileState(id, {
        collectionName: identifier.collectionName,
      })
      .subscribe({
        next: file => {
          this.setState({
            item: Outcome.successful(file),
          });
        },
        error: err => {
          this.setState({
            item: Outcome.failed(createError('metadataFailed', err)),
          });
          this.fireAnalytics(
            mediaFileLoadFailedEvent(id, 'Metadata fetching failed'),
          );
        },
      });
  }

  private fireAnalytics = (payload: GasPayload | GasScreenEventPayload) => {
    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent) {
      const ev = createAnalyticsEvent(payload);
      ev.fire(channel);
    }
  };

  // It's possible that a different identifier or context was passed.
  // We therefore need to reset Media Viewer.
  private needsReset(propsA: Props, propsB: Props) {
    return (
      !deepEqual(propsA.identifier, propsB.identifier) ||
      propsA.context !== propsB.context
    );
  }

  private release() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export const ItemViewer = withAnalyticsEvents()(ItemViewerBase);
