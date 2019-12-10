import * as React from 'react';
import { default as Renderer } from '../src/ui/Renderer';
import document from './helper/smart-locations-adf.json';
import { ProviderFactory } from '@atlaskit/editor-common';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers';

const mediaProvider = storyMediaProviderFactory();
const providerFactory = ProviderFactory.create({ mediaProvider });

export default function Example() {
  return (
    <Renderer
      dataProviders={providerFactory}
      document={document}
      appearance="full-page"
    />
  );
}
