import React from 'react';

import Item from '../Item';

export interface SecondaryItemProps {
  /**
   * Is the dropdown/drawer open? This is set in controlled mode.
   * Leave it unset to have state controlled by the Item.
   */
  isOpen?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  onDrawerCloseComplete?: () => void;
  drawerContent?: React.ComponentType<{}>;
  dropdownContent?: React.ComponentType<{}>;
  tooltip?: Item['props']['tooltip'];
}

type NavigationProps = {
  width: number | undefined;
};

export type CreateProps = NavigationProps;
export type ProductHomeProps = NavigationProps;
export type SearchProps = NavigationProps;

export type GlobalNavigationProps = {
  primaryItems: JSX.LibraryManagedAttributes<typeof Item, Item['props']>[];
  renderAppSwitcher?: React.ComponentType<{}>;
  renderCreate?: React.ComponentType<CreateProps>;
  renderHelp?: React.ComponentType<{}>;
  renderNotifications?: React.ComponentType<{}>;
  renderProductHome: React.ComponentType<ProductHomeProps>;
  renderProfile: React.ComponentType<{}>;
  renderSearch?: React.ComponentType<SearchProps>;
  renderSettings?: React.ComponentType<{}>;
};
