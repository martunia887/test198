import React from 'react';
import ReactDOM from 'react-dom';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import { ssr } from '@atlaskit/ssr';
import waitForExpect from 'wait-for-expect';

jest.spyOn(global.console, 'error').mockImplementation(() => {});

beforeEach(() => {
  jest.setTimeout(10000);
});
afterEach(() => {
  jest.resetAllMocks();
});

test('should ssr then hydrate icon-priority correctly', async () => {
  const [example] = await getExamplesFor('icon-priority');
  const Example = await require(example.filePath).default;

  const elem = document.createElement('div');
  elem.innerHTML = await ssr(example.filePath);

  await waitForExpect(() => {
    ReactDOM.hydrate(<Example />, elem);
    // ignore warnings caused by emotion's server-side rendering approach
    // eslint-disable-next-line no-console
    const mockCalls = (console.error as jest.Mock).mock.calls.filter(
      ([f, s]) =>
        !(
          f ===
            'Warning: Did not expect server HTML to contain a <%s> in <%s>.' &&
          s === 'style'
        ),
    );
    expect(mockCalls.length).toBe(0);
  });
});
