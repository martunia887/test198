/**
 * @jest-environment node
 */
// @flow
import React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';
import SizeDetector from '../..';

test.skip('SizeDetector server side rendering', async done => {
  // $FlowFixMe
  const examples = await getExamplesFor('size-detector');
  for (const example of examples) {
    // $StringLitteral
    const Example = await require(example.filePath).default; // eslint-disable-line import/no-dynamic-require
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  }
  done();
});

test.skip('SizeDetector should render children immediately for SSR', async () => {
  const markup = <div id="foo123">Foo</div>;
  const markupString = ReactDOMServer.renderToStaticMarkup(markup);
  const html = ReactDOMServer.renderToString(
    <SizeDetector>{() => markup}</SizeDetector>,
  );
  expect(html).toContain(markupString);
});
