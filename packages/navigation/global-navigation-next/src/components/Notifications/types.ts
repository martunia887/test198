import { BadgeProps } from '@atlaskit/badge';
import { TriggerManagerProps } from '../TriggerManager/types';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type RequiredBadgeProps = Omit<BadgeProps, 'children'>;

export type NotificationsProps = TriggerManagerProps & {
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
  locale?: string;
  product: string;
  tooltip: string;
};
