// eslint-disable-line no-console
import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';
import AKListeners from '@atlaskit/analytics-listeners';
import {
  userAuthProvider,
  defaultCollectionName,
  defaultMediaPickerCollectionName,
  createStorybookMediaClientConfig,
  createStorybookMediaClient,
  mediaPickerAuthProvider,
} from '@atlaskit/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import Toggle from '@atlaskit/toggle';
import { Popup } from '../src/components/popup/popup';
import { MediaProgress } from '../src';
import {
  PopupContainer,
  PopupHeader,
  PopupEventsWrapper,
  UploadingFilesWrapper,
  FileProgress,
  FilesInfoWrapper,
  CardsWrapper,
  CardItemWrapper,
} from '../example-helpers/styled';
import {
  UploadEndEventPayload,
  UploadErrorEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadsStartEventPayload,
  UploadStatusUpdateEventPayload,
} from '../src/domain/uploadEvent';
import {
  PopupUploadEventPayloadMap,
  PopupConfig,
} from '../src/components/types';
import { AuthEnvironment } from '../example-helpers/types';
import { MediaClient } from '@atlaskit/media-client';

const cardMediaClientConfig = createStorybookMediaClientConfig();

export type PublicFile = {
  publicId: string;
};
export interface Event<K extends keyof PopupUploadEventPayloadMap> {
  readonly eventName: K;
  readonly data: PopupUploadEventPayloadMap[K];
}
export type Events = Event<keyof PopupUploadEventPayloadMap>[];
export interface PopupWrapperState {
  collectionName: string;
  closedTimes: number;
  events: Events;
  authEnvironment: AuthEnvironment;
  inflightUploads: { [key: string]: MediaProgress };
  publicFiles: { [key: string]: PublicFile };
  isUploadingFilesVisible: boolean;
  singleSelect: boolean;
  useProxyContext: boolean;
  isOpen: boolean;
}

class PopupWrapper extends Component<{}, PopupWrapperState> {
  state: PopupWrapperState = {
    collectionName: defaultMediaPickerCollectionName,
    closedTimes: 0,
    events: [],
    authEnvironment: 'client',
    inflightUploads: {},
    publicFiles: {},
    isUploadingFilesVisible: true,
    useProxyContext: true,
    singleSelect: false,
    isOpen: false,
  };

  static contextTypes = {
    getAtlaskitAnalyticsEventHandlers: PropTypes.func,
  };

  onUploadError = (data: UploadErrorEventPayload) => {
    if (data.error.name === 'user_token_fetch_fail') {
      const authStg = confirm(
        'It looks like you are not authorized in Staging. Press OK to authorize',
      );
      // eslint-disable-next-line no-unused-expressions
      authStg
        ? window.open('https://id.stg.internal.atlassian.com', '_blank')
        : this.setState({ isOpen: false });
    } else {
      console.error(JSON.stringify(data));
    }
  };

  onClosed = () => {
    this.setState({
      closedTimes: this.state.closedTimes + 1,
      events: [...this.state.events, { eventName: 'closed', data: undefined }],
    });
  };

  onUploadsStart = (data: UploadsStartEventPayload) => {
    const newInflightUploads = data.files.reduce(
      (prev, { id }) => ({ ...prev, [id]: {} }),
      {},
    );

    this.setState({
      inflightUploads: {
        ...this.state.inflightUploads,
        ...newInflightUploads,
      },
      events: [...this.state.events, { eventName: 'uploads-start', data }],
    });
  };

  onUploadStatusUpdate = (data: UploadStatusUpdateEventPayload) => {
    const { inflightUploads } = this.state;
    const id = data.file.id;
    inflightUploads[id] = data.progress;
    this.setState({
      inflightUploads,
      events: [
        ...this.state.events,
        { eventName: 'upload-status-update', data },
      ],
    });
  };

  onUploadProcessing = (data: UploadProcessingEventPayload) => {
    const { publicFiles } = this.state;
    const publicFile = publicFiles[data.file.id];

    if (publicFile) {
      const publicId = data.file.id;
      publicFile.publicId = publicId;

      this.setState({
        publicFiles,
        events: [
          ...this.state.events,
          { eventName: 'upload-processing', data },
        ],
      });
    }
  };

  onUploadPreview = (data: UploadPreviewUpdateEventPayload) => {
    const preview = data.preview;

    if (preview) {
      this.setState({
        events: [
          ...this.state.events,
          { eventName: 'upload-preview-update', data },
        ],
      });
    }
  };

  onUploadEnd = (data: UploadEndEventPayload) => {
    this.setState({
      events: [...this.state.events, { eventName: 'upload-end', data }],
    });
  };

  onShow = () => {
    this.setState({
      isOpen: true,
    });
  };

  onCollectionChange = (e: React.SyntheticEvent<HTMLElement>) => {
    const { innerText: collectionName } = e.currentTarget;

    this.setState({ collectionName });
  };

  onAuthTypeChange = (e: React.SyntheticEvent<HTMLElement>) => {
    const { innerText: authEnvironment } = e.currentTarget;

    this.setState({ authEnvironment: authEnvironment as AuthEnvironment });
  };

  renderSerializedEvent(eventName: string, data: any, key: number) {
    const serializedEvent = JSON.stringify(data, undefined, 2);

    return (
      <div key={key}>
        {eventName} :&nbsp;
        <pre> {serializedEvent} </pre>
      </div>
    );
  }

  renderEvents(events: Events) {
    return events.map(({ eventName, data: payload }, key) => {
      if (eventName === 'uploads-start') {
        const data = payload as UploadsStartEventPayload;
        return (
          <div key={key}>
            <div>
              <h2>Upload has started for {data.files.length} files</h2>
            </div>
            {this.renderSerializedEvent(eventName, data, key)}
          </div>
        );
      }

      if (eventName === 'upload-preview-update') {
        const data = payload as UploadPreviewUpdateEventPayload;
        if (!data.preview) {
          return;
        }

        // We don't want to print the original image src because it freezes the browser
        const newData: UploadPreviewUpdateEventPayload = {
          ...data,
          preview: { ...data.preview },
        };

        return (
          <div key={key}>
            {this.renderSerializedEvent(eventName, newData, key)}
          </div>
        );
      }

      return this.renderSerializedEvent(eventName, payload, key);
    });
  }

  onUploadingFilesToggle = () => {
    this.setState({
      isUploadingFilesVisible: !this.state.isUploadingFilesVisible,
    });
  };

  onCancelUpload = () => {
    const { inflightUploads } = this.state;
    Object.keys(inflightUploads).forEach(uploadId =>
      this.popupCancelUpload(uploadId),
    );

    this.setState({ inflightUploads: {} });
  };

  onEvent = (event: any) => {
    console.log(event);
  };

  onSingleSelectChange = () => {
    this.setState({
      singleSelect: !this.state.singleSelect,
    });
  };

  renderUploadingFiles = () => {
    const { inflightUploads } = this.state;
    const keys = Object.keys(inflightUploads);
    if (!keys.length) {
      return;
    }

    const uploadingFiles = keys.map(id => {
      const progress = inflightUploads[id].portion;

      return (
        <div key={id}>
          {id} <FileProgress value={progress || 0} max="1" /> : ({progress})
        </div>
      );
    });

    return (
      <UploadingFilesWrapper>
        <h1>Uploading Files</h1>
        {uploadingFiles}
      </UploadingFilesWrapper>
    );
  };

  renderCards = () => {
    const { publicFiles } = this.state;
    const publicIds = Object.keys(publicFiles)
      .map(id => publicFiles[id].publicId)
      .filter(id => !!id);

    if (!publicIds.length) {
      return;
    }

    const cards = publicIds.map((id, key) => (
      <CardItemWrapper key={key}>
        <Card
          mediaClientConfig={cardMediaClientConfig}
          isLazy={false}
          identifier={{
            mediaItemType: 'file',
            id,
          }}
        />
      </CardItemWrapper>
    ));

    return (
      <CardsWrapper>
        <h1>{'<Cards />'}</h1>
        {cards}
      </CardsWrapper>
    );
  };

  toggleProxyContext = () => {
    this.setState(({ useProxyContext }) => ({
      useProxyContext: !useProxyContext,
    }));
  };

  savePopupCancelFn = (cancel: any) => {
    this.popupCancelUpload = cancel;
  };

  render() {
    const {
      closedTimes,
      events,
      authEnvironment,
      collectionName,
      inflightUploads,
      isUploadingFilesVisible,
      singleSelect,
      isOpen,
    } = this.state;

    const isCancelButtonDisabled = Object.keys(inflightUploads).length === 0;

    const popupConfig: PopupConfig = {
      container: document.body,
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
      singleSelect,
      proxyReactContext: this.state.useProxyContext ? this.context : undefined,
    };

    const popupMediaClient = new MediaClient({
      authProvider: mediaPickerAuthProvider(this.state.authEnvironment),
      userAuthProvider,
    });

    return (
      <PopupContainer>
        <PopupHeader>
          <Button appearance="primary" onClick={this.onShow}>
            Show
          </Button>
          <Button
            appearance="warning"
            onClick={this.onCancelUpload}
            isDisabled={isCancelButtonDisabled}
          >
            Cancel uploads
          </Button>
          <Button onClick={this.onUploadingFilesToggle}>
            Toggle Uploading files
          </Button>
          <DropdownMenu trigger={collectionName} triggerType="button">
            <DropdownItem onClick={this.onCollectionChange}>
              {defaultMediaPickerCollectionName}
            </DropdownItem>
            <DropdownItem onClick={this.onCollectionChange}>
              {defaultCollectionName}
            </DropdownItem>
          </DropdownMenu>
          <DropdownMenu trigger={authEnvironment} triggerType="button">
            <DropdownItem onClick={this.onAuthTypeChange}>client</DropdownItem>
            <DropdownItem onClick={this.onAuthTypeChange}>asap</DropdownItem>
          </DropdownMenu>
          Only select single item:
          <Toggle
            isDefaultChecked={singleSelect}
            onChange={this.onSingleSelectChange}
          />
          Proxy context from Popup creator:
          <Toggle isDefaultChecked onChange={this.toggleProxyContext} />
          Closed times: {closedTimes}
        </PopupHeader>
        {isUploadingFilesVisible ? (
          <FilesInfoWrapper>
            {this.renderUploadingFiles()}
            {this.renderCards()}
          </FilesInfoWrapper>
        ) : (
          undefined
        )}
        <PopupEventsWrapper>{this.renderEvents(events)}</PopupEventsWrapper>
        <Popup
          onCancelFn={this.savePopupCancelFn}
          isOpen={isOpen}
          config={popupConfig}
          mediaClient={popupMediaClient}
          onUploadsStart={this.onUploadsStart}
          onError={this.onUploadError}
          onProcessing={this.onUploadProcessing}
          onStatusUpdate={this.onUploadStatusUpdate}
          onPreviewUpdate={this.onUploadPreview}
          onEnd={this.onUploadEnd}
        />
      </PopupContainer>
    );
  }
}

export default () => (
  <AKListeners
    client={{
      sendUIEvent: () => {},
      sendOperationalEvent: () => {},
      sendTrackEvent: () => {},
      sendScreenEvent: () => {},
    }}
  >
    <PopupWrapper />
  </AKListeners>
);
