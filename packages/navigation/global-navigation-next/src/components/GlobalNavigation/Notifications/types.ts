import { BadgeProps } from '../../BadgedItem/types';

export interface NotificationsProps {
  badge?:
    | {
        type: 'builtin';
        fabricNotificationLogUrl: string;
        cloudId: string;
      }
    | BadgeProps;
  drawerContent?: 'builtin' | React.ComponentType<{}>;
  dropdownContent?: React.ComponentType<{}>;
  locale?: string;
  onClick: () => void;
  product: string;
}
