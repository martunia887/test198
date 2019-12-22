import * as React from 'react';
import { Provider } from '@atlaskit/smart-card';

import { default as Renderer } from '../src/ui/Renderer';

import document from './helper/smart-card.adf.json';

export default function Example() {
  return (
    <Provider>
      <Renderer document={document} appearance="full-page" />
    </Provider>
  );
}
