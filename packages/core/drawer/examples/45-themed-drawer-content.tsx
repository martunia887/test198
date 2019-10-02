import React, { useState, Fragment } from 'react';
import { ThemeProvider } from 'emotion-theming';
import Button from '@atlaskit/button';
import Drawer, { DrawerContentTheme } from '../src';
import { drawerContentThemeNamespace } from '../src/constants';

const DrawersContentTheme: DrawerContentTheme = {
  [drawerContentThemeNamespace]: {
    marginTop: 0,
  },
};

function DrawersThemedContentExample() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const onClose = () => {
    setIsDrawerOpen(false);
  };
  const onOpen = () => {
    setIsDrawerOpen(true);
  };
  return (
    <Fragment>
      <ThemeProvider theme={DrawersContentTheme}>
        <Drawer onClose={onClose} isOpen={isDrawerOpen}>
          <code>Themed content</code>
        </Drawer>
      </ThemeProvider>
      <Button id="open-drawer" type="button" onClick={onOpen}>
        Open drawer
      </Button>
    </Fragment>
  );
}

export default DrawersThemedContentExample;
