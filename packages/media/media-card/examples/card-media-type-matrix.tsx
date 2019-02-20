import * as React from 'react';
import {
  Matrix,
  createStorybookMediaClientConfig,
  videoUrlPreviewId,
  audioUrlPreviewId,
  imageUrlPreviewId,
  docUrlPreviewId,
  unknownUrlPreviewId,
  videoFileId,
  audioFileId,
  imageFileId,
  docFileId,
  unknownFileId,
} from '@atlaskit/media-test-helpers';

import { Card } from '../src';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createStorybookMediaClientConfig();
// link cards
const videoLinkCard = <Card identifier={videoUrlPreviewId} />;
const imageLinkCard = <Card identifier={imageUrlPreviewId} />;
const audioLinkCard = <Card identifier={audioUrlPreviewId} />;
const docLinkCard = <Card identifier={docUrlPreviewId} />;
const unknownLinkCard = <Card identifier={unknownUrlPreviewId} />;

// file cards
const videoFileCard = <Card identifier={videoFileId} />;
const imageFileCard = <Card identifier={imageFileId} />;
const audioFileCard = <Card identifier={audioFileId} />;
const docFileCard = <Card identifier={docFileId} />;
const unknownFileCard = <Card identifier={unknownFileId} />;

export default () => (
  <MediaClientConfigContext.Provider value={mediaClientConfig}>
    <div style={{ margin: '40px' }}>
      <h1>Media type matrix</h1>
      <Matrix>
        <thead>
          <tr>
            <td />
            <td>File Cards</td>
            <td>Link Cards</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>video</td>
            <td>
              <div>{videoFileCard}</div>
            </td>
            <td>
              <div>{videoLinkCard}</div>
            </td>
          </tr>
          <tr>
            <td>image</td>
            <td>
              <div>{imageFileCard}</div>
            </td>
            <td>
              <div>{imageLinkCard}</div>
            </td>
          </tr>
          <tr>
            <td>audio</td>
            <td>
              <div>{audioFileCard}</div>
            </td>
            <td>
              <div>{audioLinkCard}</div>
            </td>
          </tr>
          <tr>
            <td>doc</td>
            <td>
              <div>{docFileCard}</div>
            </td>
            <td>
              <div>{docLinkCard}</div>
            </td>
          </tr>
          <tr>
            <td>unknown</td>
            <td>
              <div>{unknownFileCard}</div>
            </td>
            <td>
              <div>{unknownLinkCard}</div>
            </td>
          </tr>
        </tbody>
      </Matrix>
    </div>
  </MediaClientConfigContext.Provider>
);
