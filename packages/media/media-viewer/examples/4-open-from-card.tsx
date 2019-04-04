import * as React from 'react';
import { Card } from '@atlaskit/media-card';
import {
  createStorybookMediaClientConfig,
  externalImageIdentifier,
  externalSmallImageIdentifier,
  imageFileId,
  docFileId,
  animatedFileId,
  defaultCollectionName,
} from '@atlaskit/media-test-helpers';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createStorybookMediaClientConfig();
const defaultList = [
  animatedFileId,
  imageFileId,
  externalSmallImageIdentifier,
  docFileId,
];
const listWithCurrentIdentifier = [externalImageIdentifier, ...defaultList];
const listWithoutCurrentIdentifier = [...defaultList];

export default () => (
  <MediaClientConfigContext.Provider value={mediaClientConfig}>
    <div>
      <h1>Datasource with current identifier</h1>
      <Card
        shouldOpenMediaViewer
        identifier={externalImageIdentifier}
        mediaViewerDataSource={{ list: listWithCurrentIdentifier }}
      />
      <h1>Datasource without current identifier</h1>
      <Card
        shouldOpenMediaViewer
        identifier={externalImageIdentifier}
        mediaViewerDataSource={{ list: listWithoutCurrentIdentifier }}
      />
      <h1>With collection data source</h1>
      <Card
        shouldOpenMediaViewer
        identifier={externalImageIdentifier}
        mediaViewerDataSource={{ collectionName: defaultCollectionName }}
      />
    </div>
  </MediaClientConfigContext.Provider>
);
