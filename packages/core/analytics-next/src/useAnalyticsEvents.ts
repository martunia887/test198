import { useContext, useRef } from 'react';
import { useCallbackOne } from 'use-memo-one';

import { AnalyticsEventPayload } from './AnalyticsEvent';
import {
  AnalyticsReactContext,
  AnalyticsReactContextInterface,
} from './AnalyticsReactContext';
import UIAnalyticsEvent from './UIAnalyticsEvent';
import { CreateUIAnalyticsEvent } from './types';

export type UseAnalyticsEventsHook = {
  createAnalyticsEvent: CreateUIAnalyticsEvent;
};

const noop = () => [];

export function useAnalyticsEvents(): UseAnalyticsEventsHook {
  const analyticsContext = useContext(AnalyticsReactContext);
  const contextRef = useRef<AnalyticsReactContextInterface>(analyticsContext);
  contextRef.current.getAtlaskitAnalyticsEventHandlers =
    analyticsContext.getAtlaskitAnalyticsEventHandlers;
  contextRef.current.getAtlaskitAnalyticsContext =
    analyticsContext.getAtlaskitAnalyticsContext;

  const createAnalyticsEvent = useCallbackOne(
    (payload: AnalyticsEventPayload): UIAnalyticsEvent => {
      if (
        process.env.NODE_ENV !== 'production' &&
        (contextRef.current.getAtlaskitAnalyticsEventHandlers === null ||
          contextRef.current.getAtlaskitAnalyticsContext === null)
      ) {
        /* eslint-disable-next-line no-console */
        console.error(`
@atlaskit/analytics-next
---
No compatible <AnalyticsListener /> was found to fire this analytics event.
Use of the useAnalyticsEvents() hook requires a parent <AnalyticsListener /> from @atlaskit/analytics-next@^6.3.0 or above.
See: https://atlaskit.atlassian.com/packages/core/analytics-next/docs/reference#AnalyticsListener
`);
      }

      const getAtlaskitAnalyticsContext =
        contextRef.current.getAtlaskitAnalyticsContext || noop;
      const getAtlaskitAnalyticsEventHandlers =
        contextRef.current.getAtlaskitAnalyticsEventHandlers || noop;

      return new UIAnalyticsEvent({
        context: getAtlaskitAnalyticsContext(),
        handlers: getAtlaskitAnalyticsEventHandlers(),
        payload,
      });
    },
    [],
  );

  return {
    createAnalyticsEvent,
  };
}
