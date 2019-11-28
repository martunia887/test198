/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { N800, N0 } from '@atlaskit/theme/colors';
import { defaultPrimaryItems } from './shared/PrimaryItems';
import { DefaultProductHome } from './shared/ProductHome';
import { DefaultSearch } from './shared/Search';
import { DefaultSettings } from './shared/Settings';
import { AtlassianNavigation, generateTheme } from '../src';
import { ProfilePopup } from './shared/ProfilePopup';

const theme = generateTheme({
  name: 'settings',
  backgroundColor: N800,
  highlightColor: N0,
});

const Sidebar = ({ items = [] }) => {
  return (
    <div
      css={{
        flexBasis: '16.666%',
        background: '#F2F3F6',
      }}
    >
      {items.map((item, index) => {
        return <div key={index} />;
      })}
    </div>
  );
};

const ConstellationNav = () => (
  <div>
    <AtlassianNavigation
      primaryItems={defaultPrimaryItems}
      renderProductHome={DefaultProductHome}
      renderProfile={ProfilePopup}
      renderSearch={DefaultSearch}
      theme={theme}
    />
    <div
      css={{
        display: 'flex',
        height: '100vh',
        background: 'red',
      }}
    >
      <Sidebar />
    </div>
  </div>
);

export default ConstellationNav;
