/**
 * @jest-environment node
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';

test('media-ui server side rendering', async () => {
  (await getExamplesFor('media-ui')).forEach(
    (examples: { filePath: string }) => {
      const Example = require(examples.filePath).default;

      expect(() =>
        ReactDOMServer.renderToString(<Example />),
      ).not.toThrowError();
    },
  );
});
