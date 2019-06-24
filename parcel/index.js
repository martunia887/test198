/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable flowtype/require-valid-file-annotation */

import avatarIntro from '@atlaskit/avatar/examples/01-basicAvatar';
import cssResetStyles from '@atlaskit/css-reset';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import Navigation, {
  AkContainerTitle,
  AkNavigationItem,
} from '@atlaskit/navigation';
// import * as colors from '@atlaskit/theme/colors';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Tooltip from '@atlaskit/tooltip';
import { HashRouter as Router, Route } from 'react-router-dom';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Helmet } from 'react-helmet';

import { Link } from '../website/src/components/WrappedLink';
import HeaderIcon from '../website/src/components/HeaderIcon';
import { AtlaskitIcon } from '../website/src/components/AtlaskitIcon';
import PackagePage from './PackagePage';
import insertStyleSheetInHead from '../website/src/utils/insertStyleSheetInHead';

insertStyleSheetInHead(cssResetStyles);

const R300 = '#FF5630';

const nameToData = {
  avatar: {
    doc: avatarIntro(),
    pkg: { name: '@atlaskit/avatar' },
  },
};

ReactDOM.render(
  <Router>
    <>
      <Route
        path="/packages/:name"
        component={({ match }) => {
          const data = nameToData[match.params.name];
          if (data) {
            const { doc, pkg } = data;
            return (
              <PackagePage doc={doc} pkg={pkg} navigation={<WebsiteNav />} />
            );
          }

          return <FourOhFour />;
        }}
      />
      <Link to="/packages/avatar">Start with Avatar</Link>
    </>
  </Router>,
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
      containerHeaderComponent={PackagesHeader}
    >
      <AkNavigationItem href="#/packages/avatar" text="Avatar" />
    </Navigation>
  );
}

function PackagesHeader() {
  return (
    <AkContainerTitle
      icon={<HeaderIcon label="Packages" icon={PackagesIcon} color={R300} />}
      text="Packages"
      href="#"
    />
  );
}

function FourOhFour() {
  return (
    <Page navigation={<WebsiteNav />}>
      <Helmet>
        <title>Not found!</title>
      </Helmet>
      <Grid layout="fixed">
        <GridColumn medium={12}>Page not found!</GridColumn>
      </Grid>
    </Page>
  );
}
