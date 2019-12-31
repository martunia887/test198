import { AnalyticsEvent, UIAnalyticsEvent } from '@atlaskit/analytics-next';
import isUndefined from 'lodash.isundefined';
import omitBy from 'lodash.omitby';

import {
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '../../constants';

import {
  getAnalyticsType,
  getAttributes,
  getSource,
  getActionSubject,
  getAction,
  getActionSubjectId,
  getContainerId,
  getContainerType,
  getObjectId,
  getObjectType,
  getTags,
} from './utils';

export const extractAWCDataFromEvent = (event: AnalyticsEvent) => {
  // TODO: the distinction between AnalyticsEvent and UIAnalyticsEvent is all odd in AK and needs to be understood better
  const castedEvent = <UIAnalyticsEvent>event;

  const analyticsType = getAnalyticsType(castedEvent);
  const attributes = getAttributes(castedEvent);
  const source = getSource(castedEvent);
  const actionSubject = getActionSubject(castedEvent);

  if (analyticsType === SCREEN_EVENT_TYPE) {
    return {
      type: SCREEN_EVENT_TYPE,
      payload: {
        name: source,
        attributes,
      },
    };
  }

  switch (analyticsType) {
    case UI_EVENT_TYPE:
    case TRACK_EVENT_TYPE:
    case OPERATIONAL_EVENT_TYPE: {
      const action = getAction(castedEvent);
      const actionSubjectId = getActionSubjectId(castedEvent);
      const containerId = getContainerId(castedEvent);
      const containerType = getContainerType(castedEvent);
      const objectId = getObjectId(castedEvent);
      const objectType = getObjectType(castedEvent);
      const tags = getTags(castedEvent);

      return {
        type: analyticsType,
        payload: omitBy(
          {
            action,
            actionSubject,
            actionSubjectId,
            source,
            tags,
            containerType,
            containerId,
            objectType,
            objectId,
            attributes,
          },
          isUndefined,
        ),
      };
    }
    default: {
      return {
        payload: {
          source,
          actionSubject,
          attributes,
        },
        type: undefined,
      };
    }
  }
};
