import React, { useState } from 'react';
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

const theme = generateTheme({
  name: 'dark',
  backgroundColor: N900,
  highlightColor: B200,
});

const NavItem = ({ href, pathname, ...rest }) => (
  <PrimaryButton
    /*
      We are using `startsWith so that sub-pages in each section also cause the correct location to be highlighted
    */
    isHighlighted={pathname.startsWith(href)}
    {...rest}
    component={Link}
    to={href}
  />
);

const TopNav = () => {
  const [searchText, updateSearchText] = useState('');

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
                  <img
                    src="/logo-atlassian-design-white.svg"
                    alt="Atlassian Design"
                  />
                </Link>
              )}
              renderSearch={() => (
                // TODO: Complete search implementation
                <Search
                  onClick={() =>
                    console.error(
                      'BC: we do not have a working search implementation - talk to me for more details',
                    )
                  }
                  text="Search..."
                  tooltip="Search"
                />
              )}
              // TODO: BC - this doesn't do anything yet, but can't really until we implement auth. This is on me to be real when I implement auth
              renderProfile={() => <Profile icon={<Avatar />} />}
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

export default TopNav;
