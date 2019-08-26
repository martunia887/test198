import { BadgeProps } from '@atlaskit/badge';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type RequiredBadgeProps = Omit<BadgeProps, 'children'>;

export type NotificationsProps = {
  badge:
    | {
        type: 'builtin';
        fabricNotificationLogUrl: string;
        cloudId: string;
      }
    | RequiredBadgeProps & {
        type: 'provided';
        count: number;
      };
  drawerContent?: 'builtin' | React.ComponentType<{}>;
  dropdownContent?: React.ComponentType<{}>;
  locale?: string;
  onClick: () => void;
  onDrawerCloseComplete?: () => void;
  product: string;
  tooltip?: string;
};
