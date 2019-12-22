import {
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { AnalyticsWebClient } from '@atlaskit/analytics-listeners/types';

type AnalyticsEventHandler = (
  event: GasPurePayload | GasPureScreenEventPayload,
) => void;

export const analyticsClient = (
  analyticsEventHandler: AnalyticsEventHandler = jest.fn(),
): AnalyticsWebClient => {
  return {
    sendUIEvent: analyticsEventHandler,
    sendOperationalEvent: analyticsEventHandler,
    sendTrackEvent: analyticsEventHandler,
    sendScreenEvent: analyticsEventHandler,
  };
};
