import { ReactNodeArray, ReactNode } from 'react';
import { PrimaryButtonProps } from '../PrimaryButton/types';

export type PrimaryItemsContainerProps = {
  moreLabel: ReactNode;
  items: ReactNodeArray;
};

export type DropdownContentType = PrimaryButtonProps['dropdownContent'];
