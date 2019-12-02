import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

import {
  AtlassianNavigation,
  generateTheme,
  PrimaryButton,
  Search,
  Profile,
} from '@atlaskit/atlassian-navigation';
import { N900, B200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme';
import Avatar from '@atlaskit/avatar';

import '@atlaskit/css-reset';

const theme = generateTheme({
  name: 'dark',
  backgroundColor: N900,
  highlightColor: B200,
});

const NavItem = ({ href, pathname, ...rest }) => (
  <PrimaryButton
    isHighlighted={pathname.startsWith(href)}
    {...rest}
    component={Link}
    to={href}
  />
);

export default () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          width: '100%',
        }}
      >
        <Location>
          {({ location }) => (
            <AtlassianNavigation
              theme={theme}
              renderProductHome={() => (
                <Link to="/">
                  <div>DESIGN IS COOL</div>
                </Link>
              )}
              renderProfile={() => <Profile icon={<Avatar />} />}
              renderSearch={() => (
                <Search
                  //   onClick={() => console.log('clicky-clack')}
                  text="Search..."
                  tooltip="Search"
                />
              )}
              primaryItems={[
                <NavItem pathname={location.pathname} href="/brand">
                  Brand
                </NavItem>,
                <NavItem pathname={location.pathname} href="/foundations">
                  Foundations
                </NavItem>,
                <NavItem pathname={location.pathname} href="/content">
                  Content
                </NavItem>,
                <NavItem pathname={location.pathname} href="/components">
                  Components
                </NavItem>,
                <NavItem pathname={location.pathname} href="/patterns">
                  Patterns
                </NavItem>,
                <NavItem pathname={location.pathname} href="/resources">
                  Resources
                </NavItem>,
              ]}
            />
          )}
        </Location>
      </div>
      <div
        style={{
          height: gridSize() * 7,
        }}
      />
    </>
  );
};
