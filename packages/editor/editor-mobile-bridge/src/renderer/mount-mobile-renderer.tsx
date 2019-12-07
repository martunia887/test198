import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MobileRenderer from './mobile-renderer';

export function mountMobileRenderer(window: Window) {
  ReactDOM.render(
    <MobileRenderer document="" />,
    window.document.getElementById('renderer'),
  );
}
