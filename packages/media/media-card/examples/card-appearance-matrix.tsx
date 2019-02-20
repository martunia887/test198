import * as React from 'react';
import {
  Matrix,
  defaultCollectionName as collectionName,
  createStorybookMediaClientConfig,
} from '@atlaskit/media-test-helpers';

import { Card, UrlPreviewIdentifier, FileIdentifier } from '../src';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createStorybookMediaClientConfig();
const genericUrlIdentifier: UrlPreviewIdentifier = {
  mediaItemType: 'link',
  url: 'https://atlassian.com',
};

const fileIdentifier: FileIdentifier = {
  mediaItemType: 'file',
  id: 'fd4c4672-323a-4b6c-8326-223169e2a13e',
  collectionName,
};

// file cards
const imageFileCard = <Card identifier={fileIdentifier} />;

// link cards
const linkCardImage = (
  <Card identifier={genericUrlIdentifier} appearance="image" />
);
const horizontalLinkCard = (
  <Card identifier={genericUrlIdentifier} appearance="horizontal" />
);
const squareLinkCard = (
  <Card identifier={genericUrlIdentifier} appearance="square" />
);

export default () => (
  <MediaClientConfigContext.Provider value={mediaClientConfig}>
    <div style={{ margin: '40px' }}>
      <h1>Appearance matrix</h1>
      <Matrix>
        <thead>
          <tr>
            <td />
            <td>small</td>
            <td>image</td>
            <td>horizontal</td>
            <td>square</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>File Cards</td>
            <td>
              <div>{imageFileCard}</div>
            </td>
            <td>No design implemented</td>
            <td>No design implemented</td>
          </tr>
          <tr>
            <td>
              <div>Link Cards</div>
            </td>
            <td>
              <div>{linkCardImage}</div>
            </td>
            <td>
              <div>{horizontalLinkCard}</div>
            </td>
            <td>
              <div>{squareLinkCard}</div>
            </td>
          </tr>
        </tbody>
      </Matrix>
    </div>
  </MediaClientConfigContext.Provider>
);
