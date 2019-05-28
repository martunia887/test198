import { ItemProps, ItemRenderComponentProps } from '../Item/types';

export type Dataset = { [name: string]: string | typeof undefined };

export type BadgeAppearance =
  | 'added'
  | 'default'
  | 'important'
  | 'primary'
  | 'primaryInverted'
  | 'removed';

export interface BadgeProps {
  type: 'provided';
  appearance?: BadgeAppearance;
  count: number;
  maxCount?: number;
}

export type Badge =
  | BadgeProps
  | {
      type: 'component';
      component: React.ComponentType<{}>;
    };

export type BadgedItemProps = ItemProps & {
  badge?: Badge;
  /** We compose the BadgedItem from an Item, and we use this prop already. */
  component?: undefined;
};

export type BadgedItemRenderProps = ItemRenderComponentProps & {
  badge?: Badge;
};
