import * as React from 'react';
import { Provider, Client } from '@atlaskit/smart-card';
import RendererDemo from './helper/RendererDemo';

export default function Example() {
  return (
    <Provider client={new Client('staging')}>
      <RendererDemo allowColumnSorting={true} serializer="react" />
    </Provider>
  );
}
