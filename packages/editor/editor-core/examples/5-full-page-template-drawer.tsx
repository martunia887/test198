import * as React from 'react';

import { default as FullPageExample } from './5-full-page';
import { exampleDocument } from '../example-helpers/example-document';

export default function Example() {
  return FullPageExample({
    defaultValue: exampleDocument,
    sidebar: <div>{new Array(2).fill(<p>hello world</p>)}</div>,
  });
}
