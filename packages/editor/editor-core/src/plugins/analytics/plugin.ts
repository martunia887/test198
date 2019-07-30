import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next';

import { EditorPlugin } from '../../types';
import { AnalyticsEventPayload, EVENT_TYPE, ACTION } from './types';
import { fireAnalyticsEvent } from './utils';
import { Step, StepResult } from 'prosemirror-transform';

export const analyticsPluginKey = new PluginKey('analyticsPlugin');

interface AnalyticsMeta {
  payload: AnalyticsEventPayload;
  channel: string;
}
class AnalyticsStep extends Step {
  analyticsEvents: AnalyticsMeta[] = [];
  createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  constructor(
    createAnalyticsEvent: CreateUIAnalyticsEventSignature,
    analyticsEvents: AnalyticsMeta[],
  ) {
    super();
    this.createAnalyticsEvent = createAnalyticsEvent;
    this.analyticsEvents = analyticsEvents;
  }
  apply() {
    for (const analytics of this.analyticsEvents) {
      fireAnalyticsEvent(this.createAnalyticsEvent)({
        payload: analytics.payload,
        channel: analytics.channel,
      });
    }

    return new StepResult();
  }

  invert() {
    const undoEvents = this.analyticsEvents.map(analytics => ({
      ...analytics,
      payload: {
        action: 'undid',
        attributes: {
          ...(analytics.payload.attributes || {}),
        },
      },
    }));

    return new AnalyticsStep(this.createAnalyticsEvent, undoEvents as any);
  }
}

function createPlugin(createAnalyticsEvent?: CreateUIAnalyticsEventSignature) {
  if (!createAnalyticsEvent) {
    return;
  }

  return new Plugin({
    key: analyticsPluginKey,
    appendTransaction(transactions, newState: EditorState) {
      const analyticsEvents = transactions
        .map(tr => tr.getMeta(analyticsPluginKey))
        .filter(event => !!event);

      if (analyticsEvents.length > 0) {
        return newState.tr.step(
          new AnalyticsStep(createAnalyticsEvent, analyticsEvents),
        );
      }
      return null;
    },
  });
}

const analyticsPlugin = (
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
): EditorPlugin => ({
  pmPlugins() {
    return [
      {
        name: 'analyticsPlugin',
        plugin: () => createPlugin(createAnalyticsEvent),
      },
    ];
  },
});

export function extendPayload(
  payload: AnalyticsEventPayload,
  duration: number,
) {
  return {
    ...payload,
    attributes: {
      ...payload.attributes,
      duration,
    },
    eventType: EVENT_TYPE.OPERATIONAL,
  } as AnalyticsEventPayload;
}

export default analyticsPlugin;
