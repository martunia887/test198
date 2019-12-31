import { AnalyticsEvent, UIAnalyticsEvent } from '@atlaskit/analytics-next';

import last from 'lodash.last';

import {
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
} from '../../constants';

import { EventType, ImperativeAnalyticsData } from '../../types';

import { getImperativeAnalyticsDataFromArguments, Arguments } from './utils';

export const fireAnalytics = (
  event: AnalyticsEvent,
  type: EventType,
  payload: ImperativeAnalyticsData,
) => {
  // TODO: the distinction between AnalyticsEvent and UIAnalyticsEvent is all odd in AK and needs to be understood better
  const castedEvent = <UIAnalyticsEvent>event;

  const clonedEvent = castedEvent.clone();
  if (!clonedEvent) {
    throw new Error("Cannot clone an event after it's been fired.");
  }
  clonedEvent
    .update({ ...payload, analyticsType: type })
    .fire('productAnalytics');
};

const getActionSubjectFromContext = (event: AnalyticsEvent) => {
  // TODO: the distinction between AnalyticsEvent and UIAnalyticsEvent is all odd in AK and needs to be understood better
  const castedEvent = <UIAnalyticsEvent>event;

  return last(
    castedEvent.context
      .map(i => i.component || i.componentName)
      .filter(Boolean),
  );
};

export const fireUIAnalytics = (
  event: AnalyticsEvent,
  ...rest: Arguments
): void => {
  if (!event.clone) {
    throw new Error('There is no analytics event from Atlaskit in UI event');
  }

  const {
    action: argumentsAction,
    actionSubject: argumentsActionSubject,
    actionSubjectId,
    attributes,
  } = getImperativeAnalyticsDataFromArguments(rest);

  const castedEvent = <UIAnalyticsEvent>event;

  const action = (event.payload && event.payload.action) || argumentsAction;
  const actionSubject =
    (event.payload && event.payload.actionSubject) ||
    argumentsActionSubject ||
    getActionSubjectFromContext(castedEvent);

  if (!action) {
    throw new Error('Mandatory "action" field is missing from UI event');
  }

  if (!actionSubject) {
    throw new Error('Mandatory "actionSubject" field is missing from UI event');
  }

  fireAnalytics(event, UI_EVENT_TYPE, {
    action,
    actionSubject,
    actionSubjectId,
    attributes,
  });
};

export const fireTrackAnalytics = (
  event: AnalyticsEvent,
  ...rest: Arguments
): void => {
  if (!event.clone) {
    throw new Error('There is no analytics event from Atlaskit in Track event');
  }

  const {
    action,
    actionSubject,
    actionSubjectId,
    attributes,
  } = getImperativeAnalyticsDataFromArguments(rest);

  if (!action) {
    throw new Error('Mandatory "action" field is missing from Track event');
  }

  if (!actionSubject) {
    throw new Error(
      'Mandatory "actionSubject" field is missing from Track event',
    );
  }

  fireAnalytics(event, TRACK_EVENT_TYPE, {
    action,
    actionSubject,
    actionSubjectId,
    attributes,
  });
};

export const fireOperationalAnalytics = (
  event: AnalyticsEvent,
  ...rest: Arguments
): void => {
  if (!event.clone) {
    throw new Error(
      'There is no analytics event from Atlaskit in Operational event',
    );
  }

  const {
    action,
    actionSubject,
    actionSubjectId,
    attributes,
  } = getImperativeAnalyticsDataFromArguments(rest);

  if (!action) {
    throw new Error(
      'Mandatory "action" field is missing from Operational event',
    );
  }

  if (!actionSubject) {
    throw new Error(
      'Mandatory "actionSubject" field is missing from Operational event',
    );
  }

  fireAnalytics(event, OPERATIONAL_EVENT_TYPE, {
    action,
    actionSubject,
    actionSubjectId,
    attributes,
  });
};

export const fireScreenAnalytics = (
  event: AnalyticsEvent,
  ...rest: Arguments
): void => {
  if (!event.clone) {
    throw new Error(
      'There is no analytics event from Atlaskit in Screen event',
    );
  }

  const { attributes } = getImperativeAnalyticsDataFromArguments(rest);

  fireAnalytics(event, SCREEN_EVENT_TYPE, {
    attributes,
  });
};
