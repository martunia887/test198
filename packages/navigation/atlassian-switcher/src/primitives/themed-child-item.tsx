import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';

import { ChildItemTheme } from '../theme/default-theme';
import { Themed } from '../theme/types';

import Item, { SwitcherItemProps } from './item';

export default (props: Themed<SwitcherItemProps>) => (
  <ChildItemTheme.Consumer>
    {tokens => (
      <ThemeProvider theme={{ [itemThemeNamespace]: tokens }}>
        <Item {...props} />
      </ThemeProvider>
    )}
  </ChildItemTheme.Consumer>
);
