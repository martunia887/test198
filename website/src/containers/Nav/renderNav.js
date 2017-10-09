/* @flow */

import React from 'react';
import { AkNavigationItemGroup } from '@atlaskit/navigation';
import { RouterNavigationItem } from './linkComponents';
import type { NavGroup } from '../../types';

export default function renderNav(groups: Array<NavGroup>, pathname: string) {
  return groups.map((group, index) =>
    <AkNavigationItemGroup title={group.title} key={index + (group.title || '')}>
      {group.items.map(item =>
        <RouterNavigationItem
          key={item.title}
          href={item.to}
          icon={item.icon}
          text={item.title}
          isSelected={item.isSelected ? item.isSelected(pathname, item.to) : pathname === item.to}
        />
      )}
    </AkNavigationItemGroup>
  );
}
