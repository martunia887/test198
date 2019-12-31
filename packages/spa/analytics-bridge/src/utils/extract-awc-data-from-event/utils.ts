import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import flatten from 'lodash.flatten';
import isUndefined from 'lodash.isundefined';
import last from 'lodash.last';
import merge from 'lodash.merge';
import omitBy from 'lodash.omitby';
import uniq from 'lodash.uniq';

const extractFromContext = (event: UIAnalyticsEvent, property: string) =>
  event.context.map(item => item[property]);

export const getAnalyticsType = (event: UIAnalyticsEvent) =>
  event.payload.analyticsType;

export const getAttributes = (event: UIAnalyticsEvent) => {
  const contextAttributes = extractFromContext(event, 'attributes');
  const payloadAttributes = event.payload.attributes;
  const allAttributes = merge(
    contextAttributes.reduce(
      (result, extraAttributes) => merge(result, extraAttributes),
      {},
    ),
    payloadAttributes,
  );

  const sources = extractFromContext(event, 'source');
  const namespaces = sources.filter(Boolean).join('.');

  return omitBy({ ...allAttributes, namespaces }, isUndefined);
};

export const getSource = (event: UIAnalyticsEvent) =>
  last(extractFromContext(event, 'source').filter(Boolean));

export const getActionSubject = (event: UIAnalyticsEvent) => {
  const { actionSubject } = event.payload;

  if (actionSubject) {
    return actionSubject;
  }

  const component =
    last(extractFromContext(event, 'component').filter(Boolean)) ||
    last(extractFromContext(event, 'componentName').filter(Boolean));

  return component;
};

export const getAction = (event: UIAnalyticsEvent) => event.payload.action;

export const getActionSubjectId = (event: UIAnalyticsEvent) =>
  event.payload.actionSubjectId;

export const getContainerId = (event: UIAnalyticsEvent) =>
  last(extractFromContext(event, 'containerId').filter(Boolean));

export const getContainerType = (event: UIAnalyticsEvent) =>
  last(extractFromContext(event, 'containerType').filter(Boolean));

export const getObjectId = (event: UIAnalyticsEvent) =>
  last(extractFromContext(event, 'objectId').filter(Boolean));

export const getObjectType = (event: UIAnalyticsEvent) =>
  last(extractFromContext(event, 'objectType').filter(Boolean));

export const getTags = (event: UIAnalyticsEvent) => {
  const tags = uniq(flatten(extractFromContext(event, 'tags'))).filter(Boolean);
  return tags.length ? tags : undefined;
};
