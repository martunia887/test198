import { ComponentType } from 'react';
import { ItemRenderComponentProps } from '../Item/types';

export type DropdownItemProps = ItemRenderComponentProps & {
  dropdownContent: ComponentType<{}>;
};
