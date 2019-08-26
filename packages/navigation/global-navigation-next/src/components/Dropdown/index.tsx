/** @jsx jsx */
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';
import { jsx } from '@emotion/core';
import React from 'react';
import { DropdownProps } from './types';

export const Dropdown = (props: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(
    props.isOpen || false,
  );
  const {
    appearance,
    children,
    dropdownContent: DropdownContent,
    onClose,
  } = props;

  const onOpenChange = ({
    isOpen,
    event,
  }: {
    isOpen: boolean;
    event: React.MouseEvent<HTMLElement>;
  }) => {
    setIsDropdownOpen(isOpen);
    if (!isOpen && onClose) {
      onClose(event);
    }
  };

  return (
    <DropdownMenuStateless
      isOpen={isDropdownOpen}
      onOpenChange={onOpenChange}
      position={appearance === 'primary' ? 'top left' : 'top right'}
      trigger={children}
    >
      <DropdownContent />
    </DropdownMenuStateless>
  );
};
