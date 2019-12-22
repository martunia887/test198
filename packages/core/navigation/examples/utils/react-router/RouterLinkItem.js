// @flow
import React from 'react';
import { AkNavigationItem } from '../../../src';
import RouterLinkComponent from './RouterLinkComponent';

type Props = {
  to: string,
  text: string,
  isSelected: boolean,
};

const RouterLinkItem = ({ to, text, isSelected }: Props) => (
  <AkNavigationItem
    href={to}
    isSelected={isSelected}
    linkComponent={RouterLinkComponent}
    text={text}
  />
);

export default RouterLinkItem;
