import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers';

import { default as Renderer } from '../src/ui/Renderer';

import Sidebar from './helper/NavigationNext';
import document from './helper/table-layout.adf.json';

const mediaProvider = storyMediaProviderFactory();
const providerFactory = ProviderFactory.create({ mediaProvider });

export default function Example() {
  return (
    <Sidebar showSidebar={true}>
      {(additionalProps: object) => (
        <Renderer
          dataProviders={providerFactory}
          document={document}
          {...additionalProps}
        />
      )}
    </Sidebar>
  );
}
