import React from 'react';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Item from '../Item';
import { SettingsProps } from './types';

export const Settings = (props: SettingsProps) => (
  <Item
    appearance="secondary"
    text={
      <SettingsIcon label={props.tooltip} />
    }
    {...props}
  />
);
