import {
  SCREEN,
  DRAWER,
  MODAL,
  INLINE_DIALOG,
  DROPDOWN,
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
} from './constants';

export type SourceType =
  | typeof SCREEN
  | typeof DRAWER
  | typeof MODAL
  | typeof INLINE_DIALOG
  | typeof DROPDOWN;

export type EventType =
  | typeof UI_EVENT_TYPE
  | typeof TRACK_EVENT_TYPE
  | typeof SCREEN_EVENT_TYPE
  | typeof OPERATIONAL_EVENT_TYPE;

export interface AnalyticsAttributes {
  [name: string]: boolean | string | number | AnalyticsAttributes | void | null;
}

export interface ImperativeAnalyticsData {
  actionSubject?: string;
  action?: string;
  actionSubjectId?: string;
  attributes?: AnalyticsAttributes;
}

export interface ContextualAnalyticsData {
  containerId?: string;
  containerType?: string;
  objectType?: string;
  objectId?: string;
  tags?: string[];
  sourceName?: string;
  sourceType?: SourceType;
  attributes?: AnalyticsAttributes;
}
