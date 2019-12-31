import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

type UIAnalyticsEventHandler = (event: UIAnalyticsEvent, channel?: any) => void;

interface UIAnalyticsEventProps {
  context?: {}[];
  handlers?: UIAnalyticsEventHandler[];
  payload: {
    action: string;
    actionSubject: string;
    [name: string]: any;
  };
}

export const createTestEvent = (
  payload: UIAnalyticsEventProps = {
    payload: {
      action: 'thisIsADumyAction',
      actionSubject: 'thisIsADumyActionSubject',
    },
  },
) => new UIAnalyticsEvent(payload);
