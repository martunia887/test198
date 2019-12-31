import {
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  UI_EVENT_TYPE,
  DRAWER,
  DROPDOWN,
  INLINE_DIALOG,
  MODAL,
  SCREEN,
} from './src/constants';
import { SourceType, EventType } from './src/types';
import {
  ContextWrapper as ContextualAnalyticsData,
  Props as ContextualAnalyticsDataProps,
} from './src/ui/context-wrapper';
import { createTestEvent } from './src/utils/create-test-event';
import { MountEvent, Props as MountEventProps } from './src/ui/mount-event';
import {
  fireAnalytics,
  fireOperationalAnalytics,
  fireScreenAnalytics,
  fireTrackAnalytics,
  fireUIAnalytics,
} from './src/utils/fire-analytics';
import {
  FireOperationalAnalytics,
  FireScreenAnalytics,
  FireTrackAnalytics,
  FireUIAnalytics,
  Props as FireAnalyticsProps,
} from './src/ui/fire-analytics';
import { extractAWCDataFromEvent } from './src/utils/extract-awc-data-from-event';
import { AnalyticsEventToProps } from './src/ui/analytics-event-to-props';

export {
  // components and props
  ContextualAnalyticsData,
  ContextualAnalyticsDataProps,
  FireOperationalAnalytics,
  FireScreenAnalytics,
  FireTrackAnalytics,
  FireUIAnalytics,
  FireAnalyticsProps,
  MountEvent,
  MountEventProps,
  AnalyticsEventToProps,
  // utilities
  fireAnalytics,
  fireOperationalAnalytics,
  fireScreenAnalytics,
  fireTrackAnalytics,
  fireUIAnalytics,
  createTestEvent,
  extractAWCDataFromEvent,
  // constants
  SourceType,
  DRAWER,
  DROPDOWN,
  INLINE_DIALOG,
  MODAL,
  SCREEN,
  EventType,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
};
