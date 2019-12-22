import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@babel/polyfill';

import { determineMode } from '../bridge-utils';

import MobileEditor from './mobile-editor-element';

const params = new URLSearchParams(window.location.search);
const mode = determineMode(params.get('mode'));

ReactDOM.render(
  <MobileEditor mode={mode} />,
  document.getElementById('editor'),
);
