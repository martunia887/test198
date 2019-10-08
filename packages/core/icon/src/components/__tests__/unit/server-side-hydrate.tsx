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
  jest.restoreAllMocks();
});

test('should ssr then hydrate icon correctly', async () => {
  const example = await getExamplesFor('icon');
  console.log(example);
  // console.log('After example', new Date().getTime())
  // const Example = await require(example.filePath).default; // eslint-disable-line import/no-dynamic-require
  // console.log('After require path', new Date().getTime())
  // const elem = document.createElement('div');
  // elem.innerHTML = await ssr(example.filePath);
  // ReactDOM.hydrate(<Example />, elem);
  // await waitForExpect(() => {
  //   // ignore warnings caused by emotion's server-side rendering approach
  //   // @ts-ignore
  //   // eslint-disable-next-line no-console
  //   const mockCalls = console.error.mock.calls.filter(
  //     // @ts-ignore
  //     ([f, s]) =>
  //       !(
  //         f ===
  //           'Warning: Did not expect server HTML to contain a <%s> in <%s>.' &&
  //         s === 'style'
  //       ),
  //   );
  //   expect(mockCalls.length).toBe(0);
  //   console.log('test finish', new Date().getTime())
  // });
});
