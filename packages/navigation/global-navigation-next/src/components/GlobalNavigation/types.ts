import Item from '../Item';
import { AccountProps } from './Account/types';
import { CreateProps } from './Create/types';
import { NotificationsProps } from './Notifications/types';
import { ProductProps } from './ProductHome/types';
import { SearchProps } from './Search/types';

export interface SecondaryItemProps {
  /**
   * Is the dropdown/drawer open? This is set in controlled mode.
   * Leave it unset to have state controlled by the Item.
   */
  isOpen?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  drawerContent?: React.ComponentType<{}>;
  dropdownContent?: React.ComponentType<{}>;
}

export type GlobalNavigationProps = {
  account: AccountProps;
  appSwitcherComponent: React.ComponentType;
  create?: CreateProps;
  product: ProductProps;
  search: SearchProps;
  primaryItems: JSX.LibraryManagedAttributes<typeof Item, Item['props']>[];
  notifications?: NotificationsProps;
  help?: SecondaryItemProps;
  settings?: SecondaryItemProps;
};
