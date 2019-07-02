import React from 'react';
import ReactDOM from 'react-dom';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import { ssr } from '@atlaskit/ssr';
import waitForExpect from 'wait-for-expect';

declare var global: any;

jest.spyOn(global.console, 'error');

afterEach(() => {
  jest.resetAllMocks();
});

test('should ssr then hydrate checkbox correctly', async () => {
  const [example] = await getExamplesFor('checkbox');
  const Example = await require(example.filePath).default; // eslint-disable-line import/no-dynamic-require

  const elem = document.createElement('div');
  elem.innerHTML = await ssr(example.filePath);

  await ReactDOM.hydrate(<Example />, elem);
  waitForExpect(() => {
    expect(console.error).not.toBeCalled(); // eslint-disable-line no-console
  });
});
