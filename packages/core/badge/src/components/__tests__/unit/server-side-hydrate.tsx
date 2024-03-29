import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import { ssr } from '@atlaskit/ssr';

jest.spyOn(global.console, 'error');

afterEach(() => {
  jest.resetAllMocks();
});

test('should ssr then hydrate badge correctly', async () => {
  const [example] = await getExamplesFor('badge');
  const Example = require(example.filePath).default; // tslint:disable-line import/no-dynamic-require

  const elem = document.createElement('div');
  elem.innerHTML = await ssr(example.filePath);

  ReactDOM.hydrate(<Example />, elem);

  expect(console.error).not.toBeCalled(); // tslint:disable-line no-console
});
