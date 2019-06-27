import * as React from 'react';
import Navigation, { AkSearchDrawer } from '@atlaskit/navigation';

import BasicQuickSearch from './utils/BasicQuickSearch';
import GlobalTheme, { AtlaskitThemeProvider } from '@atlaskit/theme';

const noop = () => {};

export default () => (
  <AtlaskitThemeProvider mode={'dark'}>
    <GlobalTheme.Provider value={() => ({ mode: 'dark' })}>
      <Navigation
        drawers={[
          <AkSearchDrawer
            backIcon={null}
            isOpen
            key="search"
            onBackButton={noop}
            primaryIcon={null}
          >
            <BasicQuickSearch />
          </AkSearchDrawer>,
        ]}
      />
    </GlobalTheme.Provider>
  </AtlaskitThemeProvider>
);
