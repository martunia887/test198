import { Command } from '../types';
import { AnalyticsProperties } from './handler';
import analyticsService from './service';

export function commandWithAnalytics(
  analyticsEventName: string,
  properties?: AnalyticsProperties,
) {
  return (command: Command): Command => (state, dispatch?, view?) =>
    command(
      state,
      tr => {
        if (dispatch) {
          analyticsService.trackEvent(analyticsEventName, properties);
          dispatch(tr);
        }
      },
      view,
    );
}
