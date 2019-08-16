import * as React from 'react';
import Item, { SwitcherItemProps } from './item';
import { itemThemeNamespace } from '@atlaskit/item';
import { ItemTheme, Themeable } from '../theme';
import { ThemeProvider } from 'styled-components';

export default (props: Themeable<SwitcherItemProps>) => (
  <ItemTheme.Consumer>
    {tokens => (
      <ThemeProvider theme={{ [itemThemeNamespace]: tokens }}>
        <Item {...props} />
      </ThemeProvider>
    )}
  </ItemTheme.Consumer>
);
