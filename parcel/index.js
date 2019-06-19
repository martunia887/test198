/* eslint-disable flowtype/require-valid-file-annotation */

import ReactDOM from 'react-dom';
import React from 'react';
import cssResetStyles from '@atlaskit/css-reset';
import avatarIntro from '@atlaskit/avatar/examples/01-basicAvatar';
import PackagePage from './PackagePage';
import insertStyleSheetInHead from '../website/src/utils/insertStyleSheetInHead';

insertStyleSheetInHead(cssResetStyles);

ReactDOM.render(
  <PackagePage doc={avatarIntro()} pkg={{ name: 'avatar' }} />,
  document.getElementById('react-root'),
);
