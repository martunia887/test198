/**
 * @jest-environment node
 */
import React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';

test('TextArea server side rendering', async () => {
  (await getExamplesFor('textarea')).forEach(
    (examples: { filePath: string }) => {
      const Example = require(examples.filePath).default;
      expect(() =>
        ReactDOMServer.renderToString(<Example />),
      ).not.toThrowError();
    },
  );
});
