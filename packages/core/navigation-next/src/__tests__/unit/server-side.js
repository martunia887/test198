/**
 * @jest-environment node
 */
// @flow

import React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';

/* Mock fetch-mock and its node-fetch dependency to return the non-browser versions of the module as they break in SSR. */
jest.mock('fetch-mock', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('fetch-mock/src/server');

  return originalModule;
});

jest.mock('node-fetch', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('node-fetch/lib/index');

  return originalModule;
});

const examplesWithDomOrBrowser = [
  '0-navigation-app',
  '12-async-load-layout-manager',
  '13-async-load-layout-manager-with-view-controller',
  '9999-views-controller-adding-routes',
  '9999-views-controller-asynchronous-views',
  '9999-views-controller-container-views',
  '9999-views-controller-reducing-views',
];
const exampleName = (file: string) =>
  file
    .split('/')
    .reverse()[0]
    .replace('.js', '');

test('navigation-next server side rendering', async () => {
  // $StringLitteral
  (await getExamplesFor('navigation-next')).forEach(examples => {
    if (!examplesWithDomOrBrowser.includes(exampleName(examples.filePath))) {
      // $StringLitteral
      const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
      expect(() =>
        ReactDOMServer.renderToString(<Example />),
      ).not.toThrowError();
    }
  });
});
