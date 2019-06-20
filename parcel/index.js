/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable flowtype/require-valid-file-annotation */

import ReactDOM from 'react-dom';
import React from 'react';
import cssResetStyles from '@atlaskit/css-reset';
import avatarIntro from '@atlaskit/avatar/examples/01-basicAvatar';
import Navigation from '@atlaskit/navigation';
import Tooltip from '@atlaskit/tooltip';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { AtlaskitIcon } from '../website/src/components/AtlaskitIcon';
import PackagePage from './PackagePage';
import insertStyleSheetInHead from '../website/src/utils/insertStyleSheetInHead';

insertStyleSheetInHead(cssResetStyles);

ReactDOM.render(
  <PackagePage
    doc={avatarIntro()}
    pkg={{ name: '@atlaskit/avatar' }}
    navigation={<WebsiteNav />}
  />,
  document.getElementById('react-root'),
);

function WebsiteNav() {
  return (
    <Navigation
      globalCreateIcon={
        <Tooltip content="Menu" position="right">
          <MenuIcon label="Menu" />
        </Tooltip>
      }
      globalPrimaryItemHref="/"
      globalPrimaryIcon={
        <Tooltip content="Home" position="right">
          <AtlaskitIcon />
        </Tooltip>
      }
      globalSearchIcon={
        <Tooltip content="Search" position="right">
          <SearchIcon label="search" />
        </Tooltip>
      }
    />
  );
}
