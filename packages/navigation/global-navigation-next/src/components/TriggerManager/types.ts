import { ComponentType } from 'react';

type CommonProps = {
  children: (event: { onTriggerClick: (...args: any[]) => void }) => void;
};

export type DrawerProps = CommonProps & {
  /** Content to render in a drawer */
  drawerContent?: ComponentType<{}>;
  /** Whether this drawer should be open or not */
  isOpen?: boolean;
  /** A handler which will be called when the trigger is clicked. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** A handler which will be called when the drawer is closed. */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /** A handler which will be called when the drawer has finished closing. */
  onDrawerCloseComplete?: () => void;
};

export type DropdownProps = CommonProps & {
  /** Content to render in a dropdown */
  dropdownContent?: ComponentType<{ closeDropdown?: () => void }>;
  /** Whether this dropdown should be open or not */
  isOpen?: boolean;
  /** A handler which will be called when the trigger is clicked. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** A handler which will be called when the dropdown is closed. */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /** The position to render the dropdown in. */
  position?: 'top left' | 'top right';
};

export type TriggerManagerProps = DrawerProps & DropdownProps;
