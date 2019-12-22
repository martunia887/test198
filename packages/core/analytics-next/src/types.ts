import { AnalyticsEventPayload } from './AnalyticsEvent';
import UIAnalyticsEvent from './UIAnalyticsEvent';

export type CreateUIAnalyticsEvent = (
  payload: AnalyticsEventPayload,
) => UIAnalyticsEvent;

export type AnalyticsEventCreator = (
  create: CreateUIAnalyticsEvent,
  props: Record<string, any>,
) => UIAnalyticsEvent | undefined;

export type CreateEventMap = Record<
  string,
  AnalyticsEventPayload | AnalyticsEventCreator
>;
