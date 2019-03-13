import * as React from 'react';
import { MediaClient, FileState, FileIdentifier } from '@atlaskit/media-client';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { Outcome, MediaViewerFeatureFlags } from './domain';
import { ImageViewer } from './viewers/image';
import { VideoViewer } from './viewers/video';
import { DocViewer } from './viewers/doc';
import { Spinner } from './loading';
import { Subscription } from 'rxjs/Subscription';
import * as deepEqual from 'deep-equal';
import ErrorMessage, {
  createError,
  MediaViewerError,
  ErrorName,
} from './error';
import { ErrorViewDownloadButton } from './download';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
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

export type Props = Readonly<{
  identifier: FileIdentifier;
  mediaClient: MediaClient;
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
        if (payload.status === 'success') {
          this.fireAnalytics(mediaFileLoadSucceededEvent(file));
        } else if (payload.status === 'error') {
          const { identifier } = this.props;
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

  private renderFileState(item: FileState) {
    if (item.status === 'error') {
      return this.renderError('previewFailed', item);
    }

    const {
      mediaClient,
      identifier,
      featureFlags,
      showControls,
      onClose,
      previewCount,
    } = this.props;

    const viewerProps = {
      mediaClient,
      item,
      collectionName: identifier.collectionName,
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
            {...viewerProps}
          />
        );
      case 'video':
        return (
          <VideoViewer
            showControls={showControls}
            featureFlags={featureFlags}
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
    return this.state.item.match({
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
      failed: err => this.renderError(err.errorName, this.state.item.data),
    });
  }

  private renderDownloadButton(state: FileState, err: MediaViewerError) {
    const { mediaClient, identifier } = this.props;
    return (
      <ErrorViewDownloadButton
        state={state}
        mediaClient={mediaClient}
        err={err}
        collectionName={identifier.collectionName}
      />
    );
  }

  private async init(props: Props) {
    const { mediaClient, identifier } = props;
    const id =
      typeof identifier.id === 'string' ? identifier.id : await identifier.id;
    this.fireAnalytics(mediaFileCommencedEvent(id));
    this.subscription = mediaClient.file
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

  // It's possible that a different identifier or mediaClient was passed.
  // We therefore need to reset Media Viewer.
  private needsReset(propsA: Props, propsB: Props) {
    return (
      !deepEqual(propsA.identifier, propsB.identifier) ||
      propsA.mediaClient !== propsB.mediaClient
    );
  }

  private release() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export const ItemViewer = withAnalyticsEvents()(ItemViewerBase);
