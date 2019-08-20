import React, { useEffect, useContext } from 'react';

import { AnalyticsContext } from './AnalyticsContext';
import UIAnalyticsEvent from '../UIAnalyticsEvent';

let originalEventProps = {};
let patchedEventProps = {};

export const useAnalytics = (
  createEventMap = {},
  wrappedComponentProps = {},
) => {
  const {
    getAtlaskitAnalyticsEventHandlers,
    getAtlaskitAnalyticsContext,
  } = useContext(AnalyticsContext);

  useEffect(() => {
    originalEventProps = {};
    patchedEventProps = {};

    return () => {
      originalEventProps = {};
      patchedEventProps = {};
    };
  }, []);

  const createAnalyticsEvent = payload =>
    new UIAnalyticsEvent({
      context: getAtlaskitAnalyticsContext(),
      handlers: getAtlaskitAnalyticsEventHandlers(),
      payload,
    });

  const mapCreateEventsToProps = (changedPropNames, props) =>
    changedPropNames.reduce((modified, propCallbackName) => {
      const eventCreator = createEventMap[propCallbackName];
      const providedCallback = props[propCallbackName];

      if (!['object', 'function'].includes(typeof eventCreator)) {
        return modified;
      }

      const modifiedCallback = (...args) => {
        const analyticsEvent =
          typeof eventCreator === 'function'
            ? eventCreator(createAnalyticsEvent, props)
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

  const updatePatchedEventProps = props => {
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

  const patchedEventProps = updatePatchedEventProps(wrappedComponentProps);

  return {
    createAnalyticsEvent,
    patchedEventProps,
  };
};
