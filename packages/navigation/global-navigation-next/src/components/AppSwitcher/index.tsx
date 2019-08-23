import React from 'react';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';

import Item from '../Item';
import { AppSwitcherProps } from './types';

export const AppSwitcher = (props: AppSwitcherProps) => (
  <Item
    appearance="secondary"
    text={<AppSwitcherIcon label={props.tooltip || 'Switch to...'} />}
    {...props}
  />
);
