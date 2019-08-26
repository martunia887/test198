import { ComponentType } from 'react';
import { ItemRenderComponentProps } from '../Item/types';

export type DropdownProps = ItemRenderComponentProps & {
  dropdownContent: ComponentType<{}>;
};
