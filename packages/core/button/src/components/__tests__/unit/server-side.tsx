/**
 * @jest-environment node
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';

test('Button server side rendering', async () => {
  (await getExamplesFor('button')).forEach((examples: any) => {
    const Example = require(examples.filePath).default;
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
