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

export type GlobalNavigationProps = {
  primaryItems: JSX.LibraryManagedAttributes<typeof Item, Item['props']>[];
  renderAppSwitcher?: React.ComponentType<{}>;
  renderCreate?: React.ComponentType<{}>;
  renderHelp?: React.ComponentType<{}>;
  renderNotifications?: React.ComponentType<{}>;
  renderProductHome: React.ComponentType<{}>;
  renderProfile: React.ComponentType<{}>;
  renderSearch?: React.ComponentType<{}>;
  renderSettings?: React.ComponentType<{}>;
};
