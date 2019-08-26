import Drawer from '@atlaskit/drawer';
import React, { Fragment } from 'react';

import { Dropdown } from '../Dropdown';

export const TriggerManager = (props: any) => {
  const {
    appearance,
    children,
    drawerContent: DrawerContent,
    dropdownContent: DropdownContent,
    isOpen,
    onClick,
    onClose,
    onDrawerCloseComplete,
  } = props;
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const onTriggerClick = React.useCallback(
    (...args: any[]) => {
      if (DrawerContent) {
        setIsDrawerOpen(true);
      }
      if (onClick) {
        onClick(...args);
      }
    },
    [DrawerContent, onClick],
  );

  const onDrawerClose = React.useCallback(
    (...args: any[]) => {
      if (DrawerContent) {
        setIsDrawerOpen(false);
      }
      if (onClose) {
        onClose(...args);
      }
    },
    [DrawerContent, onClose],
  );

  if (DropdownContent) {
    return (
      <Dropdown
        appearance={appearance}
        dropdownContent={DropdownContent}
        onClose={onClose}
      >
        {children({ onTriggerClick })}
      </Dropdown>
    );
  }

  return (
    <Fragment>
      {children({ onTriggerClick })}
      {DrawerContent && (
        <Drawer
          isOpen={isOpen !== undefined ? isOpen : isDrawerOpen}
          onClose={onDrawerClose}
          onCloseComplete={onDrawerCloseComplete}
          openFromRight
        >
          <DrawerContent />
        </Drawer>
      )}
    </Fragment>
  );
};
