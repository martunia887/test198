import { ComponentType } from 'react';
import { ItemRenderComponentProps } from '../PrimaryItem/types';

export type PrimaryDropdownItemProps = ItemRenderComponentProps & {
  dropdownContent: ComponentType<{}>;
};
