import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  storyMediaProviderConfig,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';
import { default as Renderer } from '../src/ui/Renderer';
import document from './helper/media-layout.adf.json';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaProvider = storyMediaProviderFactory();
const mediaClientConfig = storyMediaProviderConfig();
const providerFactory = ProviderFactory.create({ mediaProvider });

export default function Example() {
  return (
    <MediaClientConfigContext.Provider value={mediaClientConfig}>
      <Renderer
        dataProviders={providerFactory}
        document={document}
        appearance="full-page"
      />
    </MediaClientConfigContext.Provider>
  );
}
