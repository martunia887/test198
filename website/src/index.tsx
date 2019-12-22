import React from 'react';
import { render } from 'react-dom';
import cssResetStyles from '@atlaskit/css-reset';
import 'regenerator-runtime/runtime';

import App from './containers/App';
import insertStyleSheetInHead from './utils/insertStyleSheetInHead';

insertStyleSheetInHead(cssResetStyles);

render(<App />, document.getElementById('app'));
