import * as React from 'react';
import { Component } from 'react';
import { Card } from '../src';
import {
  imageFileId,
  gifFileId,
  videoFileId,
  largeImageFileId,
  createStorybookMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { MediaViewerDataSource } from '@atlaskit/media-viewer';
import {
  MediaViewerExampleWrapper,
  MediaViewerExampleColumn,
} from '../example-helpers/styled';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createStorybookMediaClientConfig();
const mediaViewerDataSource: MediaViewerDataSource = {
  list: [imageFileId, gifFileId, largeImageFileId, videoFileId],
};

interface ExampleState {
  shouldOpenMediaViewer: boolean;
}

class Example extends Component<{}, {}> {
  state: ExampleState = {
    shouldOpenMediaViewer: true,
  };

  render() {
    const { shouldOpenMediaViewer } = this.state;

    return (
      <MediaClientConfigContext.Provider value={mediaClientConfig}>
        <MediaViewerExampleWrapper>
          <MediaViewerExampleColumn>
            <h3>shouldOpenMediaViewer + mediaViewerDataSource</h3>
            <Card
              identifier={imageFileId}
              shouldOpenMediaViewer={shouldOpenMediaViewer}
              mediaViewerDataSource={mediaViewerDataSource}
            />
            <Card
              identifier={gifFileId}
              shouldOpenMediaViewer={shouldOpenMediaViewer}
              mediaViewerDataSource={mediaViewerDataSource}
            />
            <Card
              identifier={videoFileId}
              shouldOpenMediaViewer={shouldOpenMediaViewer}
              mediaViewerDataSource={mediaViewerDataSource}
            />
          </MediaViewerExampleColumn>
          <MediaViewerExampleColumn>
            <h3>shouldOpenMediaViewer + list without card identifier</h3>
            <Card
              identifier={imageFileId}
              shouldOpenMediaViewer={shouldOpenMediaViewer}
              mediaViewerDataSource={{ list: [gifFileId] }}
            />
          </MediaViewerExampleColumn>
          <MediaViewerExampleColumn>
            <h3>useInlinePlayer=true</h3>
            <Card
              identifier={videoFileId}
              shouldOpenMediaViewer={shouldOpenMediaViewer}
              mediaViewerDataSource={mediaViewerDataSource}
              useInlinePlayer={true}
            />
          </MediaViewerExampleColumn>
          <MediaViewerExampleColumn>
            <h3>mediaViewerDataSource=undefined</h3>
            <Card
              identifier={largeImageFileId}
              shouldOpenMediaViewer={shouldOpenMediaViewer}
            />
          </MediaViewerExampleColumn>
        </MediaViewerExampleWrapper>
      </MediaClientConfigContext.Provider>
    );
  }
}

export default () => <Example />;
