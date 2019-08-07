import { BaseAnalyticsContext } from '../index';
import { version, name } from '../version.json';
import {
  createAndFireEvent,
  CreateUIAnalyticsEventSignature,
  AnalyticsEventPayload,
} from '@atlaskit/analytics-next';

export const getBaseAnalyticsContext = (
  componentName: any,
  actionSubjectId: any,
): BaseAnalyticsContext => ({
  packageVersion: version,
  packageName: name,
  componentName,
  actionSubject: 'MediaCard',
  actionSubjectId,
});

export const mediaAnalyticsChannel = 'media';
export const createAndFireEventOnMedia = createAndFireEvent(
  mediaAnalyticsChannel,
);

export const createAndFireCustomEventOnMedia = (
  payload: AnalyticsEventPayload,
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
) => {
  const analyticsEvent = createAnalyticsEvent && createAnalyticsEvent(payload);
  if (analyticsEvent) {
    analyticsEvent.fire && analyticsEvent.fire(mediaAnalyticsChannel);
  }
};
