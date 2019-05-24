import { ComponentType } from 'react';
import { ItemRenderComponentProps } from '../Item/types';

export type DrawerItemProps = ItemRenderComponentProps & {
  drawerContent: ComponentType<{}>;
};

export interface DrawerItemState {
  isOpen: boolean;
}
