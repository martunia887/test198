import React from 'react';

import { Notifications } from '../src';
import { mockNotificationsEndpoint } from './mock-notifications-endpoint';

const onNotificationsClick = () => {
  console.log('notifications click');

  // Notification URL is unreachable from the examples.
  // Hence setting it to root
  // Wait for the drawer to open and mount the iframe.
  setTimeout(() => {
    const iframes: NodeListOf<HTMLIFrameElement> = document.querySelectorAll(
      'iFrame[title="Notifications"]',
    );
    iframes.forEach(iframe => {
      iframe.src = '/';
      iframe.srcdoc = 'notifications drawer iframe';
    });
  }, 50);
};

const CLOUD_ID = 'some-cloud-id';
const FABRIC_NOTIFICATION_LOG_URL = '/gateway/api/notification-log/';

const builtinBadge = {
  type: 'builtin',
  fabricNotificationLogUrl: FABRIC_NOTIFICATION_LOG_URL,
  cloudId: CLOUD_ID,
};

export const mockBuiltInNotifications = () => {
  mockNotificationsEndpoint(
    `/gateway/api/notification-log/api/2/notifications/count/unseen?cloudId=${CLOUD_ID}`,
    3,
  );
};

const onDrawerCloseComplete = () => {
  console.log('notifications close completed');
};

export const BuiltInNotifications = () => (
  <Notifications
    badge={builtinBadge}
    drawerContent="builtin"
    locale="en"
    onClick={onNotificationsClick}
    onDrawerCloseComplete={onDrawerCloseComplete}
    product="jira"
    tooltip="Notifications"
  />
);
