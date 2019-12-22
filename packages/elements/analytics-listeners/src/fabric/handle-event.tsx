import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

import { sendEvent } from '../analytics-web-client-wrapper';
import Logger from '../helpers/logger';
import { AnalyticsWebClient } from '../types';

import { processEventPayload } from './process-event-payload';

export const handleEvent = (
  event: UIAnalyticsEvent,
  tag: string,
  logger: Logger,
  client?: AnalyticsWebClient | Promise<AnalyticsWebClient>,
) => {
  if (!event.payload) {
    return;
  }
  const payload = processEventPayload(event, tag);
  sendEvent(logger, client)(payload);
};
