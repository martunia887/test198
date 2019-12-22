import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import cssResetStyles from '@atlaskit/css-reset';
import 'regenerator-runtime/runtime';

import ExamplesLoader from './pages/Examples/loader';
import { Window } from './types';
import insertStyleSheetInHead from './utils/insertStyleSheetInHead';

insertStyleSheetInHead(cssResetStyles);

const componentNode = document.getElementById('examples');
if (typeof window !== 'undefined' && componentNode) {
  (window as Window).unmountApp = function unmountApp() {
    return unmountComponentAtNode(componentNode);
  };
}
render(<ExamplesLoader />, componentNode);
