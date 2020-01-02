// eslint-disable-line no-console
import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { MediaClientConfig } from '@atlaskit/media-core';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';
import {
  userAuthProvider,
  mediaPickerAuthProvider,
  defaultCollectionName,
  defaultMediaPickerCollectionName,
  createStorybookMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import Toggle from '@atlaskit/toggle';
import { MediaPicker } from '../src';
import {
  PopupContainer,
  PopupHeader,
  PopupEventsWrapper,
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
  PopupUploadEventPayloadMap,
  Popup,
} from '../src/types';
import { AuthEnvironment } from '../example-helpers/types';

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
  publicFiles: { [key: string]: PublicFile };
  isUploadingFilesVisible: boolean;
  singleSelect: boolean;
  useProxyContext: boolean;
  popup?: Popup;
}

class PopupWrapper extends Component<{}, PopupWrapperState> {
  state: PopupWrapperState = {
    collectionName: defaultMediaPickerCollectionName,
    closedTimes: 0,
    events: [],
    authEnvironment: 'client',
    publicFiles: {},
    isUploadingFilesVisible: true,
    useProxyContext: true,
    singleSelect: false,
  };

  static contextTypes = {
    // Required context in order to integrate analytics in media picker
    getAtlaskitAnalyticsEventHandlers: PropTypes.func,
  };

  async componentDidMount() {
    await this.createPopup();
  }

  componentWillUnmount() {
    const { popup } = this.state;
    if (popup) {
      popup.removeAllListeners();
    }
  }

  private async createPopup(singleSelect: boolean = this.state.singleSelect) {
    const { popup } = this.state;
    if (popup) {
      popup.removeAllListeners();
      popup.teardown();
    }

    const mediaClientConfig: MediaClientConfig = {
      authProvider: mediaPickerAuthProvider(this.state.authEnvironment),
      userAuthProvider,
    };

    const newPopup = await MediaPicker(mediaClientConfig, {
      container: document.body,
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
      singleSelect,
      // Media picker requires `proxyReactContext` to enable analytics
      // otherwise, analytics Gasv3 integrations won't work
      proxyReactContext: this.state.useProxyContext ? this.context : undefined,
    });

    newPopup.on('uploads-start', this.onUploadsStart);
    newPopup.on('upload-preview-update', this.onUploadPreview);
    newPopup.on('upload-processing', this.onUploadProcessing);
    newPopup.on('upload-end', this.onUploadEnd);
    newPopup.on('upload-error', this.onUploadError);
    newPopup.on('closed', this.onClosed);

    this.setState({
      popup: newPopup,
      singleSelect,
    });
  }

  onUploadError = (data: UploadErrorEventPayload) => {
    if (data.error.name === 'user_token_fetch_fail') {
      const authStg = confirm(
        'It looks like you are not authorized in Staging. Press OK to authorize',
      );
      // eslint-disable-next-line no-unused-expressions
      authStg
        ? window.open('https://id.stg.internal.atlassian.com', '_blank')
        : this.state.popup!.hide();
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
    this.setState({
      events: [...this.state.events, { eventName: 'uploads-start', data }],
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
    const { collectionName: collection, popup } = this.state;

    if (popup) {
      popup.setUploadParams({
        collection,
      });

      // Synchronously with next command tenantAuthProvider will be requested.
      popup.show().catch(console.error);
    }
  };

  onCollectionChange = (e: React.SyntheticEvent<HTMLElement>) => {
    const { innerText: collectionName } = e.currentTarget;

    this.setState({ collectionName });
  };

  onAuthTypeChange = (e: React.SyntheticEvent<HTMLElement>) => {
    const { innerText: authEnvironment } = e.currentTarget;

    this.setState(
      { authEnvironment: authEnvironment as AuthEnvironment },
      this.createPopup,
    );
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

  onTeardown = () => {
    const { popup } = this.state;
    if (popup) {
      popup.teardown();
      this.setState({ popup: undefined });
    }
  };

  onUploadingFilesToggle = () => {
    this.setState({
      isUploadingFilesVisible: !this.state.isUploadingFilesVisible,
    });
  };

  onCancelUpload = () => {
    const { popup } = this.state;
    if (!popup) {
      return;
    }
  };

  onEvent = (event: any) => {
    console.log(event);
  };

  onSingleSelectChange = () => {
    this.createPopup(!this.state.singleSelect);
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
    this.setState(
      ({ useProxyContext }) => ({ useProxyContext: !useProxyContext }),
      this.createPopup,
    );
  };

  render() {
    const {
      closedTimes,
      events,
      authEnvironment,
      collectionName,
      isUploadingFilesVisible,
      singleSelect,
      popup,
    } = this.state;
    const hasTorndown = !popup;

    return (
      <PopupContainer>
        <PopupHeader>
          <Button
            appearance="primary"
            onClick={this.onShow}
            isDisabled={hasTorndown}
          >
            Show
          </Button>
          <Button
            appearance="warning"
            onClick={this.onCancelUpload}
            isDisabled={hasTorndown}
          >
            Cancel uploads
          </Button>
          <Button
            appearance="danger"
            onClick={this.onTeardown}
            isDisabled={hasTorndown}
          >
            Teardown
          </Button>
          <Button
            onClick={this.onUploadingFilesToggle}
            isDisabled={hasTorndown}
          >
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
          <FilesInfoWrapper>{this.renderCards()}</FilesInfoWrapper>
        ) : (
          undefined
        )}
        <PopupEventsWrapper>{this.renderEvents(events)}</PopupEventsWrapper>
      </PopupContainer>
    );
  }
}

export default () => <PopupWrapper />;
