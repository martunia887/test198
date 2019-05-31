import Item from '../Item';
import { CreateProps } from './Create/types';
import { NotificationsProps } from './Notifications/types';
import { ProductProps } from './ProductHome/types';
import { SearchProps } from './Search/types';
import { ProfileProps } from './Profile/types';

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
  appSwitcher?: SecondaryItemProps;
  create?: CreateProps;
  product: ProductProps;
  search: SearchProps;
  primaryItems: JSX.LibraryManagedAttributes<typeof Item, Item['props']>[];
  notifications?: NotificationsProps;
  help?: SecondaryItemProps;
  settings?: SecondaryItemProps;
  profile: ProfileProps;
};
