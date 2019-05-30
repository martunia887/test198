/** @jsx jsx */
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import { NotificationIndicator } from '@atlaskit/notification-indicator';
import { NotificationLogClient } from '@atlaskit/notification-log-client';
import { jsx } from '@emotion/core';
import { Component, ComponentType } from 'react';
import BadgedItem from '../../BadgedItem';
import { Badge } from '../../BadgedItem/types';
import NotificationDrawer from './NotificationDrawer';
import { NotificationsProps } from './types';

export default class Notifications extends Component<NotificationsProps> {
  render() {
    const { badge, drawerContent, locale, product, ...props } = this.props;
    let resolvedBadge: Badge | undefined;
    if (badge && badge.type === 'builtin') {
      resolvedBadge = {
        type: 'component',
        component: () => (
          <NotificationIndicator
            notificationLogProvider={Promise.resolve(
              new NotificationLogClient(
                badge.fabricNotificationLogUrl,
                badge.cloudId,
              ),
            )}
            refreshRate={60000}
          />
        ),
      };
    } else if (badge && badge.type === 'provided') {
      resolvedBadge = badge;
    }

    let drawer: ComponentType<{}> | undefined;
    if (drawerContent === 'builtin') {
      drawer = () => <NotificationDrawer locale={locale} product={product} />;
    } else if (props.dropdownContent) {
      // If dropdownContent has been provided, don't set up the drawer.
      drawer = undefined;
    } else {
      drawer = drawerContent;
    }

    return (
      <BadgedItem
        appearance="secondary"
        text={<NotificationIcon label={props.tooltip || 'Notifications'} />}
        badge={resolvedBadge}
        drawerContent={drawer}
        {...props}
      />
    );
  }
}
