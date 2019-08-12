import React from 'react';
import ReactDOM from 'react-dom';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import { ssr } from '@atlaskit/ssr';

// @ts-ignore - global usage
jest.spyOn(global.console, 'error').mockImplementation(() => {});

beforeEach(() => {
  jest.setTimeout(60000);
});

afterEach(() => {
  jest.resetAllMocks();
});

test('should ssr then hydrate section-message correctly', async () => {
  const [example] = await getExamplesFor('section-message');
  // $StringLitteral
  const Example = await require(example.filePath).default; // eslint-disable-line import/no-dynamic-require

  const elem = document.createElement('div');
  elem.innerHTML = await ssr(example.filePath);

  ReactDOM.hydrate(<Example />, elem);
  // ignore warnings caused by emotion's server-side rendering approach
  // @ts-ignore - no mock on error object
  // eslint-disable-next-line no-console
  const mockCalls = console.error.mock.calls.filter(
    ([f, s]: [any, any]) =>
      !(
        f ===
          'Warning: Did not expect server HTML to contain a <%s> in <%s>.' &&
        s === 'style'
      ),
  );

  expect(mockCalls.length).toBe(0); // eslint-disable-line no-console
});
