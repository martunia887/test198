import { useContext, useEffect } from 'react';

import { AnalyticsContext } from './AnalyticsContext';
import {
  CreateEventMap,
  CreateUIAnalyticsEvent,
  AnalyticsEventCreator,
} from './types';
import UIAnalyticsEvent from './UIAnalyticsEvent';
import { AnalyticsEventPayload } from './AnalyticsEvent';

type UseAnalyticsHook = {
  createAnalyticsEvent: CreateUIAnalyticsEvent;
  patchedEventProps: CreateEventMap;
};

let originalEventProps: CreateEventMap = {};
let patchedEventProps: CreateEventMap = {};

export function useAnalytics<Props extends Record<string, any>>(
  createEventMap: CreateEventMap = {},
  wrappedComponentProps: Props,
): UseAnalyticsHook {
  const {
    getAtlaskitAnalyticsEventHandlers,
    getAtlaskitAnalyticsContext,
  } = useContext(AnalyticsContext);

  const createAnalyticsEvent = (
    payload: AnalyticsEventPayload,
  ): UIAnalyticsEvent =>
    new UIAnalyticsEvent({
      context: getAtlaskitAnalyticsContext(),
      handlers: getAtlaskitAnalyticsEventHandlers(),
      payload,
    });

  const mapCreateEventsToProps = (changedPropNames: string[], props: Props) =>
    changedPropNames.reduce((modified, propCallbackName) => {
      const eventCreator = createEventMap[propCallbackName];
      const providedCallback = props[propCallbackName];

      if (!['object', 'function'].includes(typeof eventCreator)) {
        return modified;
      }

      const modifiedCallback = (...args: any[]) => {
        const analyticsEvent =
          typeof eventCreator === 'function'
            ? (eventCreator as AnalyticsEventCreator)(
                createAnalyticsEvent,
                props,
              )
            : createAnalyticsEvent(eventCreator);

        if (providedCallback) {
          providedCallback(...args, analyticsEvent);
        }
      };

      return {
        ...modified,
        [propCallbackName]: modifiedCallback,
      };
    }, {});

  const updatePatchedEventProps = (props: Props): CreateEventMap => {
    const changedPropCallbacks = Object.keys(createEventMap).filter(
      p => originalEventProps[p] !== props[p],
    );
    if (changedPropCallbacks.length > 0) {
      patchedEventProps = {
        ...patchedEventProps,
        ...mapCreateEventsToProps(changedPropCallbacks, props),
      };
      changedPropCallbacks.forEach(p => {
        originalEventProps[p] = props[p];
      });
    }

    return patchedEventProps;
  };

  useEffect(() => {
    Object.keys(createEventMap).forEach(p => {
      originalEventProps[p] = wrappedComponentProps[p];
    });

    patchedEventProps = mapCreateEventsToProps(
      Object.keys(createEventMap),
      wrappedComponentProps,
    );
  }, []);

  return {
    createAnalyticsEvent,
    patchedEventProps: updatePatchedEventProps(wrappedComponentProps),
  };
}
