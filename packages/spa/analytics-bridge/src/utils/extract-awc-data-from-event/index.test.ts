import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

import {
  SCREEN_EVENT_TYPE,
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
} from '../../constants';

import { extractAWCDataFromEvent } from './index';

const PAGE_EVENT_ACTION = 'screen viewed';

describe('from atlaskit to structured events', () => {
  test('undefined event', () => {
    const event = new UIAnalyticsEvent({
      context: [{ source: 'jira' }, { source: 'dialog' }],
      payload: {
        action: 'some action',
        actionSubject: 'select',
        analyticsType: 'some other event type',
      },
    });

    const resultEvent = {
      type: undefined,
      payload: {
        source: 'dialog',
        actionSubject: 'select',
        attributes: { namespaces: 'jira.dialog' },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('page event', () => {
    const event = new UIAnalyticsEvent({
      context: [{ source: 'jira' }, { source: 'dialog' }],
      payload: {
        analyticsType: SCREEN_EVENT_TYPE,
        action: PAGE_EVENT_ACTION,
        actionSubject: 'select',
      },
    });

    const resultEvent = {
      type: SCREEN_EVENT_TYPE,
      payload: {
        name: 'dialog',
        attributes: {
          namespaces: 'jira.dialog',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('page event with attributes', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { source: 'jira' },
        { source: 'dialog' },
        { componentName: 'select' },
        {
          attributes: {
            context: 'jira-admin-page',
            duplicate: 'duplicate context',
          },
        },
      ],
      payload: {
        analyticsType: SCREEN_EVENT_TYPE,
        attributes: {
          duplicate: 'duplicate payload',
        },
      },
    });

    const resultEvent = {
      type: SCREEN_EVENT_TYPE,
      payload: {
        name: 'dialog',
        attributes: {
          namespaces: 'jira.dialog',
          context: 'jira-admin-page',
          duplicate: 'duplicate payload',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('event with different tags in the tree are appended', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { source: 'dialog' },
        { componentName: 'selectComponent' },
        { tags: ['some team'] },
        { tags: ['another team'] },
      ],
      payload: {
        analyticsType: UI_EVENT_TYPE,
        action: 'selected',
        actionSubject: 'select',
        actionSubjectId: 'addPeople',
      },
    });

    const resultEvent = {
      type: UI_EVENT_TYPE,
      payload: {
        action: 'selected',
        actionSubject: 'select',
        actionSubjectId: 'addPeople',
        source: 'dialog',
        attributes: {
          namespaces: 'dialog',
        },
        tags: ['some team', 'another team'],
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('duplicate and undefined tags are removed', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { source: 'dialog' },
        { componentName: 'selectComponent' },
        { tags: ['duplicate'] },
        { tags: [undefined] },
        { tags: ['duplicate'] },
      ],
      payload: {
        analyticsType: UI_EVENT_TYPE,
        action: 'selected',
        actionSubject: 'select',
        actionSubjectId: 'addPeople',
      },
    });

    const resultEvent = {
      type: UI_EVENT_TYPE,
      payload: {
        action: 'selected',
        actionSubject: 'select',
        actionSubjectId: 'addPeople',
        source: 'dialog',
        attributes: {
          namespaces: 'dialog',
        },
        tags: ['duplicate'],
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('event with different attributes in the tree are merged', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { source: 'dialog' },
        { componentName: 'selectComponent' },
        { attributes: { context: 'jira-admin-page' } },
        { attributes: { otherProperty: 'VALUE' } },
      ],
      payload: {
        analyticsType: SCREEN_EVENT_TYPE,
        action: PAGE_EVENT_ACTION,
      },
    });

    const resultEvent = {
      type: SCREEN_EVENT_TYPE,
      payload: {
        name: 'dialog',
        attributes: {
          otherProperty: 'VALUE',
          context: 'jira-admin-page',
          namespaces: 'dialog',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('event with the same attribute in context and payload gives you the payload value', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { source: 'dialog' },
        { componentName: 'select' },
        { attributes: { someAttribute: 'jira-admin-page' } },
      ],
      payload: {
        analyticsType: SCREEN_EVENT_TYPE,
        action: PAGE_EVENT_ACTION,
        attributes: {
          someAttribute: 'some-other-value',
        },
      },
    });

    const resultEvent = {
      type: SCREEN_EVENT_TYPE,
      payload: {
        name: 'dialog',
        attributes: {
          someAttribute: 'some-other-value',
          namespaces: 'dialog',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('event with attributes of the same name only send the deepest value', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { source: 'dialog' },
        { componentName: 'select' },
        { attributes: { context: 'jira-admin-page' } },
        { attributes: { otherProperty: 'VALUE' } },
        { attributes: { otherProperty: 'VALUE 2' } },
        { attributes: { otherProperty: 'VALUE 3' } },
      ],
      payload: {
        analyticsType: SCREEN_EVENT_TYPE,
        action: PAGE_EVENT_ACTION,
      },
    });

    const resultEvent = {
      type: SCREEN_EVENT_TYPE,
      payload: {
        name: 'dialog',
        attributes: {
          otherProperty: 'VALUE 3',
          context: 'jira-admin-page',
          namespaces: 'dialog',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('UI event', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { containerType: 'project', containerId: '123', tags: ['donut world'] },
        { objectType: 'issue', objectId: '789', tags: ['bento'] },
        { source: 'jira' },
        { source: 'dialog' },
        { componentName: 'buttonComponent' },
      ],
      payload: {
        action: 'click',
        actionSubject: 'button',
        analyticsType: UI_EVENT_TYPE,
        actionSubjectId: 'addFeedback',
        attributes: {
          something: true,
        },
      },
    });

    const resultEvent = {
      type: UI_EVENT_TYPE,
      payload: {
        source: 'dialog',
        actionSubject: 'button',
        action: 'click',
        actionSubjectId: 'addFeedback',
        tags: ['donut world', 'bento'],
        containerType: 'project',
        containerId: '123',
        objectType: 'issue',
        objectId: '789',
        attributes: {
          something: true,
          namespaces: 'jira.dialog',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('TRACK event', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { containerType: 'project', containerId: '123', tags: ['donut world'] },
        { objectType: 'issue', objectId: '789', tags: ['bento'] },
        { source: 'jira' },
        { source: 'dialog' },
        { actionSubject: 'feedbackContextContext' },
        { componentName: 'button' },
      ],
      payload: {
        analyticsType: TRACK_EVENT_TYPE,
        attributes: { something: true },
        action: 'submit',
        actionSubject: 'feedback',
        actionSubjectId: 'feedback item id',
      },
    });

    const resultEvent = {
      type: TRACK_EVENT_TYPE,
      payload: {
        source: 'dialog',
        actionSubject: 'feedback',
        actionSubjectId: 'feedback item id',
        action: 'submit',
        tags: ['donut world', 'bento'],
        containerType: 'project',
        containerId: '123',
        objectType: 'issue',
        objectId: '789',
        attributes: {
          something: true,
          namespaces: 'jira.dialog',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });

  test('OPERATIONAL event', () => {
    const event = new UIAnalyticsEvent({
      context: [
        { containerType: 'project', containerId: '123', tags: ['donut world'] },
        { objectType: 'issue', objectId: '789', tags: ['bento'] },
        { source: 'jira' },
        { source: 'dialog' },
        { actionSubject: 'feedbackContext' },
        { componentName: 'formComponent' },
      ],
      payload: {
        analyticsType: OPERATIONAL_EVENT_TYPE,
        attributes: { something: true, duration: 4028 },
        action: 'submit',
        actionSubject: 'form',
        actionSubjectId: 'durationToFirstSubmit',
      },
    });

    const resultEvent = {
      type: OPERATIONAL_EVENT_TYPE,
      payload: {
        source: 'dialog',
        actionSubject: 'form',
        actionSubjectId: 'durationToFirstSubmit',
        action: 'submit',
        tags: ['donut world', 'bento'],
        containerType: 'project',
        containerId: '123',
        objectType: 'issue',
        objectId: '789',
        attributes: {
          something: true,
          duration: 4028,
          namespaces: 'jira.dialog',
        },
      },
    };

    expect(extractAWCDataFromEvent(event)).toEqual(resultEvent);
  });
});
