/* tslint:disable:no-console */
import * as React from 'react';
import { Component } from 'react';
import {
  mediaPickerAuthProvider,
  defaultMediaPickerCollectionName,
  createUploadMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import Button from '@atlaskit/button';
import {
  MediaClientConfig,
  MediaClientConfigContext,
} from '@atlaskit/media-core';
import {
  MediaPicker,
  Browser,
  BrowserConfig,
  UploadPreviewUpdateEventPayload,
} from '../src';
import {
  PreviewsWrapper,
  PopupHeader,
  PopupContainer,
  PreviewsTitle,
} from '../example-helpers/styled';
import { UploadPreview } from '../example-helpers/upload-preview';

export interface BrowserWrapperState {
  previewsData: any[];
}

const mediaClientConfig = createUploadMediaClientConfig();

class BrowserWrapper extends Component<{}, BrowserWrapperState> {
  browserComponents: Browser[] = [];
  dropzoneContainer?: HTMLDivElement;

  constructor() {
    super({});
    this.state = {
      previewsData: [],
    };
  }

  async componentDidMount() {
    this.browserComponents = (Array(5) as any).fill().map(this.createBrowse);
  }

  createBrowse = async () => {
    const mediaClientConfig: MediaClientConfig = {
      authProvider: mediaPickerAuthProvider(),
    };

    const browseConfig: BrowserConfig = {
      multiple: true,
      fileExtensions: ['image/jpeg', 'image/png'],
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
    };
    const fileBrowser = await MediaPicker(
      'browser',
      mediaClientConfig,
      browseConfig,
    );

    fileBrowser.on(
      'upload-preview-update',
      (data: UploadPreviewUpdateEventPayload) => {
        this.setState({ previewsData: [...this.state.previewsData, data] });
      },
    );

    return fileBrowser;
  };

  onOpen = (fileBrowser: Browser) => () => {
    fileBrowser.browse();
  };

  private renderPreviews = () => {
    const { previewsData } = this.state;

    return previewsData.map((previewsData, index) => (
      <UploadPreview key={`${index}`} fileId={previewsData.fileId} />
    ));
  };

  render() {
    const buttons = this.browserComponents.map((browser, key) => {
      return (
        <Button key={key} appearance="primary" onClick={this.onOpen(browser)}>
          Open
        </Button>
      );
    });

    return (
      <MediaClientConfigContext.Provider value={mediaClientConfig}>
        <PopupContainer>
          <PopupHeader>{buttons}</PopupHeader>
          <PreviewsWrapper>
            <PreviewsTitle>Upload previews</PreviewsTitle>
            {this.renderPreviews()}
          </PreviewsWrapper>
        </PopupContainer>
      </MediaClientConfigContext.Provider>
    );
  }
}

export default () => <BrowserWrapper />;
