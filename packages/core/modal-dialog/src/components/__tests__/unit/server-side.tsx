/**
 * @jest-environment node
 */
import React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';
import Modal from '../../..';

test.skip('Modal dialog server side rendering', async done => {
  const examples = await getExamplesFor('modal-dialog');
  for (const example of examples) {
    const Example = await require(example.filePath).default; // eslint-disable-line import/no-dynamic-require
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  }
  done();
});

test.skip('Modal dialog should render content in ssr', () => {
  expect(() =>
    ReactDOMServer.renderToString(
      <Modal
        heading="Look at this"
        actions={[{ text: 'Close', onClick: () => {} }]}
      >
        <div>Model Content</div>
      </Modal>,
    ),
  ).not.toThrowError();
});
