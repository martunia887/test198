import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

import {
  getAction,
  getActionSubject,
  getActionSubjectId,
  getAnalyticsType,
  getAttributes,
  getContainerId,
  getContainerType,
  getObjectId,
  getObjectType,
  getSource,
  getTags,
} from './utils';

describe('extract data from events', () => {
  test('getActionSubject - extracts from payload', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { actionSubject: 'context first actionSubject' },
        { actionSubject: 'context second actionSubject' },
        { actionSubject: '' },
      ],
      payload: {
        action: 'thisIsADumyAction',
        actionSubject: 'payload actionSubject',
      },
    });
    expect(getActionSubject(event)).toEqual('payload actionSubject');
  });
  test('getActionSubject - extracts from component if there is no payload', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { actionSubject: 'context first actionSubject' },
        { actionSubject: 'context second actionSubject' },
        { component: 'component actionSubject' },
        { actionSubject: '' },
      ],
      payload: {
        action: 'thisIsADumyAction',
      },
    });
    expect(getActionSubject(event)).toEqual('component actionSubject');
  });
  test('getActionSubject - extracts from componentName if there is no payload', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { actionSubject: 'context first actionSubject' },
        { actionSubject: 'context second actionSubject' },
        { componentName: 'component actionSubject' },
        { actionSubject: '' },
      ],
      payload: {
        action: 'thisIsADumyAction',
      },
    });
    expect(getActionSubject(event)).toEqual('component actionSubject');
  });
  test('getActionSubjectId - extracts from payload', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { actionSubjectId: 'context first actionSubjectId' },
        { actionSubjectId: 'context second actionSubjectId' },
        { actionSubjectId: '' },
      ],
      payload: {
        action: 'thisIsADumyAction',
        actionSubjectId: 'payload actionSubjectId',
      },
    });
    expect(getActionSubjectId(event)).toEqual('payload actionSubjectId');
  });
  test('getAnalyticsType - extracts from payload', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { analyticsType: 'context first analyticsType' },
        { analyticsType: 'context second analyticsType' },
        { analyticsType: '' },
      ],
      payload: {
        action: 'thisIsADumyAction',
        analyticsType: 'payload analyticsType',
      },
    });
    expect(getAnalyticsType(event)).toEqual('payload analyticsType');
  });
  test('getAction - extracts from payload', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { action: 'context first action' },
        { action: 'context second action' },
        { action: '' },
      ],
      payload: { action: 'payload action' },
    });
    expect(getAction(event)).toEqual('payload action');
  });
  test('getSources - extracts from context', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { source: 'context first source' },
        { source: 'context second source' },
      ],
      payload: {
        action: 'thisIsADumyAction',
        source: 'payload source',
      },
    });
    expect(getSource(event)).toEqual('context second source');
  });
  test('getTags appends top down, removes falseys and duplicateds', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { tags: ['context tag1', undefined, 'duped tag'] },
        { tags: ['context tag2', ''] },
        { tags: [undefined, 'duped tag', 'another tag'] },
        { source: '' },
      ],
      payload: {
        action: 'thisIsADumyAction',
      },
    });
    expect(getTags(event)).toEqual([
      'context tag1',
      'duped tag',
      'context tag2',
      'another tag',
    ]);
  });
  test('getTags returns undefined if there are no tags', () => {
    const event = new UIAnalyticsEvent({
      context: [{ source: '' }],
      payload: {
        action: 'thisIsADumyAction',
      },
    });
    expect(getTags(event)).toEqual(undefined);
  });
  test('getContainerTypes', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { containerType: 'context first containerType' },
        { containerType: 'context second containerType' },
      ],
      payload: {
        action: 'thisIsADumyAction',
      },
    });
    expect(getContainerType(event)).toEqual('context second containerType');
  });
  test('getContainerIds', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { containerId: 'context first containerId' },
        { containerId: 'context second containerId' },
      ],
      payload: {
        action: 'thisIsADumyAction',
        containerId: 'payload containerId',
      },
    });
    expect(getContainerId(event)).toEqual('context second containerId');
  });
  test('getObjectTypes', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { objectType: 'context first objectType' },
        { objectType: 'context second objectType' },
      ],
      payload: {
        action: 'thisIsADumyAction',
        objectType: 'payload objectType',
      },
    });
    expect(getObjectType(event)).toEqual('context second objectType');
  });
  test('getObjectId', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { objectId: 'context first objectId' },
        { objectId: 'context second objectId' },
      ],
      payload: {
        action: 'thisIsADumyAction',
        objectId: 'payload objectId',
      },
    });
    expect(getObjectId(event)).toEqual('context second objectId');
  });
  test('getAttributes merges falseys but not undefined, payload unknowns go to attributes', () => {
    const event = new UIAnalyticsEvent({
      context: [
        {
          attributes: {
            a: 'context a1',
            b: 'context b1',
            c: 'context c1',
            d: 'context d1',
            e: 'context e1',
          },
        },
        {
          attributes: null,
        },
        {
          attributes: {
            b: 'context b2',
            c: undefined,
            d: null,
          },
          unknownValue: 'context unknownValue',
        },
      ],
      payload: {
        action: 'thisIsADumyAction',
        attributes: {
          unknownValue: 'payload unknownValue',
          e: 'payload e',
          component: 'payload component',
          source: 'payload source',
        },
      },
    });
    expect(getAttributes(event)).toEqual({
      a: 'context a1',
      b: 'context b2',
      c: 'context c1',
      d: null,
      e: 'payload e',
      component: 'payload component',
      source: 'payload source',
      unknownValue: 'payload unknownValue',
      namespaces: '',
    });
  });
  test('getAttributes generates namespaces from a source', () => {
    const event = new UIAnalyticsEvent({
      context: [
        {
          source: 'source1',
        },
      ],
      payload: {
        action: 'thisIsADumyAction',
      },
    });
    expect(getAttributes(event)).toEqual({
      namespaces: 'source1',
    });
  });
  test('getAttributes generates namespaces from multiple sources', () => {
    const event = new UIAnalyticsEvent({
      context: [
        {
          source: 'source1',
        },
        {
          attributes: undefined,
        },
        {
          source: 'source2',
        },
        {
          attributes: {
            unknownValue: 'context unknownValue',
          },
        },
        {
          source: 'source3',
        },
      ],
      payload: {
        action: 'thisIsADumyAction',
      },
    });
    expect(getAttributes(event)).toEqual({
      namespaces: 'source1.source2.source3',
      unknownValue: 'context unknownValue',
    });
  });
});
