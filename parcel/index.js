/* eslint-disable flowtype/require-valid-file-annotation */

import ReactDOM from 'react-dom';
import React from 'react';
import cssResetStyles from '@atlaskit/css-reset';
// import avatarIntro from '@atlaskit/avatar/docs/0-intro';
import avatarExample from '@atlaskit/avatar/examples/01-basicAvatar';
import Navigation, {
  AkContainerTitle,
  presetThemes,
} from '@atlaskit/navigation';
import PackagePage from './PackagePage';
import insertStyleSheetInHead from '../website/src/utils/insertStyleSheetInHead';

insertStyleSheetInHead(cssResetStyles);

ReactDOM.render(
  <PackagePage
    doc={avatarExample()}
    pkg={{ name: 'avatar' }}
    navigation={<Navigation />}
  />,
  document.getElementById('react-root'),
);
