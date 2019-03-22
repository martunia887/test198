/**
 * @jest-environment node
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';

test('media-viewer server side rendering', async () => {
  (await getExamplesFor('media-viewer')).forEach((examples: any) => {
    const Example = require(examples.filePath).default;

    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
