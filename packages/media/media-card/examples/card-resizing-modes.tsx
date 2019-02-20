import * as React from 'react';
import {
  StoryList,
  createStorybookMediaClientConfig,
  smallImageFileId,
  wideImageFileId,
  largeImageFileId,
} from '@atlaskit/media-test-helpers';

import { Card } from '../src';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createStorybookMediaClientConfig();
const defaultCards = [
  {
    title: 'Small',
    content: <Card identifier={smallImageFileId} />,
  },
  {
    title: 'Wide',
    content: <Card identifier={wideImageFileId} />,
  },
  {
    title: 'Large',
    content: <Card identifier={largeImageFileId} />,
  },
];
const croppedCards = [
  {
    title: 'Small',
    content: <Card identifier={smallImageFileId} resizeMode="crop" />,
  },
  {
    title: 'Wide',
    content: <Card identifier={wideImageFileId} resizeMode="crop" />,
  },
  {
    title: 'Large',
    content: <Card identifier={largeImageFileId} resizeMode="crop" />,
  },
];
const fitCards = [
  {
    title: 'Small',
    content: <Card identifier={smallImageFileId} resizeMode="fit" />,
  },
  {
    title: 'Wide',
    content: <Card identifier={wideImageFileId} resizeMode="fit" />,
  },
  {
    title: 'Large',
    content: <Card identifier={largeImageFileId} resizeMode="fit" />,
  },
];
const fullFitCards = [
  {
    title: 'Small',
    content: <Card identifier={smallImageFileId} resizeMode="full-fit" />,
  },
  {
    title: 'Wide',
    content: <Card identifier={wideImageFileId} resizeMode="full-fit" />,
  },
  {
    title: 'Large',
    content: <Card identifier={largeImageFileId} resizeMode="full-fit" />,
  },
];

export default () => (
  <MediaClientConfigContext.Provider value={mediaClientConfig}>
    <h3>Default</h3>
    <StoryList>{defaultCards}</StoryList>
    <h3>Crop</h3>
    <StoryList>{croppedCards}</StoryList>
    <h3>Fit</h3>
    <StoryList>{fitCards}</StoryList>
    <h3>Full Fit</h3>
    <StoryList>{fullFitCards}</StoryList>
  </MediaClientConfigContext.Provider>
);
