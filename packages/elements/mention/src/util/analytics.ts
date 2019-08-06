import {
  UIAnalyticsEventInterface,
  WithAnalyticsEventProps,
  CreateUIAnalyticsEventSignature,
} from '@atlaskit/analytics-next';

import {
  GasPayload,
  OPERATIONAL_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { ELEMENTS_CHANNEL } from '../_constants';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

import { isSpecialMentionText } from '../types';

export enum ComponentNames {
  TYPEAHEAD = 'mentionTypeahead',
  MENTION = 'mention',
  SPOTLIGHT = 'mentionSpotlight',
}

export enum Actions {
  VIEWED = 'viewed',
  CLICKED = 'clicked',
  CLOSED = 'closed',
}

export const fireAnalyticsMentionTypeaheadEvent = (
  props: WithAnalyticsEventProps,
) => (
  action: string,
  duration: number,
  userIds: string[] = [],
  query?: string,
): void => {
  if (props.createAnalyticsEvent) {
    const eventPayload: GasPayload = {
      action,
      actionSubject: ComponentNames.TYPEAHEAD,
      attributes: {
        packageName,
        packageVersion,
        componentName: ComponentNames.MENTION,
        duration: Math.round(duration),
        userIds,
        queryLength: query ? query.length : 0,
      },
      eventType: OPERATIONAL_EVENT_TYPE,
    };
    const analyticsEvent: UIAnalyticsEventInterface = props.createAnalyticsEvent(
      eventPayload,
    );
    analyticsEvent.fire(ELEMENTS_CHANNEL);
  }
};

export const fireAnalyticsSpotlightMentionEvent = (
  createEvent: CreateUIAnalyticsEventSignature,
) => (
  actionSubject: string,
  action: string,
  source: string,
  actionSubjectId?: string,
  viewedCount?: number,
): void => {
  if (createEvent) {
    const eventPayload: GasPayload = {
      action,
      actionSubject,
      actionSubjectId,
      eventType: UI_EVENT_TYPE,
      attributes: {
        source,
        packageName,
        packageVersion,
        componentName: ComponentNames.SPOTLIGHT,
        viewedCount,
      },
    };
    const analyticsEvent: UIAnalyticsEventInterface = createEvent(eventPayload);
    analyticsEvent.fire(ELEMENTS_CHANNEL);
  }
};

export const fireAnalyticsMentionEvent = (
  createEvent: CreateUIAnalyticsEventSignature,
) => (
  actionSubject: string,
  action: string,
  text: string,
  id: string,
  accessLevel?: string,
): UIAnalyticsEventInterface => {
  const payload: GasPayload = {
    action,
    actionSubject,
    eventType: UI_EVENT_TYPE,
    attributes: {
      packageName,
      packageVersion,
      componentName: ComponentNames.MENTION,
      accessLevel,
      isSpecial: isSpecialMentionText(text),
      userId: id,
    },
  };
  const event = createEvent(payload);
  event.fire(ELEMENTS_CHANNEL);
  return event;
};

export const fireAnalyticsMentionHydrationEvent = (
  props: WithAnalyticsEventProps,
) => (
  action: string,
  userId: string,
  fromCache: boolean,
  duration: number,
): void => {
  if (props.createAnalyticsEvent) {
    const eventPayload: GasPayload = {
      action,
      actionSubject: ComponentNames.MENTION,
      actionSubjectId: 'hydration',
      attributes: {
        packageName,
        packageVersion,
        componentName: ComponentNames.MENTION,
        userId,
        fromCache,
        duration: Math.round(duration),
      },
      eventType: OPERATIONAL_EVENT_TYPE,
    };
    const analyticsEvent: UIAnalyticsEventInterface = props.createAnalyticsEvent(
      eventPayload,
    );
    analyticsEvent.fire(ELEMENTS_CHANNEL);
  }
};

// OLD Analytics
const MENTION_ANALYTICS_PREFIX = 'atlassian.fabric.mention';

export const fireAnalytics = (firePrivateAnalyticsEvent?: Function) => (
  eventName: string,
  text: string,
  accessLevel?: string,
) => {
  if (firePrivateAnalyticsEvent) {
    firePrivateAnalyticsEvent(`${MENTION_ANALYTICS_PREFIX}.${eventName}`, {
      accessLevel,
      isSpecial: isSpecialMentionText(text),
    });
  }
};
