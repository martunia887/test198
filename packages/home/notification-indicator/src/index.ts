import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import NotificationIndicator from './NotificationIndicator';

const NotificationIndicatorWithAnalytics = withAnalyticsEvents()(
  NotificationIndicator,
);
export { NotificationIndicatorWithAnalytics as NotificationIndicator };
