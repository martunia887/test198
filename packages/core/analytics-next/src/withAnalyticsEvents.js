// @flow

import React, { type ComponentType, type ElementConfig } from 'react';

import UIAnalyticsEvent from './UIAnalyticsEvent';
import { AnalyticsContextConsumer } from './AnalyticsContext';
import { AnalyticsListenerConsumer } from './AnalyticsListener';
import type { AnalyticsEventPayload } from './types';

export type CreateUIAnalyticsEvent = (
  payload: AnalyticsEventPayload,
) => UIAnalyticsEvent;

export type WithAnalyticsEventsProps = {|
  /**
    You should not be accessing this prop under any circumstances. It is provided by `@atlaskit/analytics-next` and integrated in the component
  */
  createAnalyticsEvent: CreateUIAnalyticsEvent,
|};

type AnalyticsEventsProps = {
  createAnalyticsEvent: CreateUIAnalyticsEvent | void,
};

type AnalyticsEventCreator<ProvidedProps: {}> = (
  create: CreateUIAnalyticsEvent,
  props: ProvidedProps,
) => ?UIAnalyticsEvent;

type EventMap<ProvidedProps: {}> = {
  [string]: AnalyticsEventPayload | AnalyticsEventCreator<ProvidedProps>,
};

// patch the callback so it provides analytics information.
const modifyCallbackProp = <T: {}>(
  propName: string,
  eventMapEntry: AnalyticsEventPayload | AnalyticsEventCreator<T>,
  props: T,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => (...args) => {
  const event =
    typeof eventMapEntry === 'function'
      ? eventMapEntry(createAnalyticsEvent, props)
      : createAnalyticsEvent(eventMapEntry);
  const providedCallback = props[propName];
  if (providedCallback) {
    providedCallback(...args, event);
  }
};

type Obj<T> = { [string]: T };
// helper that provides an easy way to map an object's values
// ({ string: A }, (string, A) => B) => { string: B }
const vmap = <A, B>(obj: Obj<A>, fn: (string, A) => B): Obj<B> =>
  Object.keys(obj).reduce((curr, k) => ({ ...curr, [k]: fn(k, obj[k]) }), {});

/* This must use $Supertype to work with multiple HOCs - https://github.com/facebook/flow/issues/6057#issuecomment-414157781
 * We also cannot alias this as a generic of withAnalyticsEvents itself as
 * that causes issues with multiple HOCs - https://github.com/facebook/flow/issues/6587
 */
type AnalyticsEventsWrappedProps<C> = $Diff<
  ElementConfig<$Supertype<C>>,
  AnalyticsEventsProps,
>;
export type AnalyticsEventsWrappedComp<C> = ComponentType<
  AnalyticsEventsWrappedProps<C>,
>;

export default function withAnalyticsEvents<P: {}, C: ComponentType<P>>(
  createEventMap: EventMap<AnalyticsEventsWrappedProps<C>> = {},
): C => AnalyticsEventsWrappedComp<C> {
  return WrappedComponent => {
    // $FlowFixMe - flow 0.67 doesn't know about forwardRef
    const WithAnalyticsEvents = React.forwardRef((props, ref) => {
      return (
        <AnalyticsContextConsumer>
          {getAnalyticsContext => (
            <AnalyticsListenerConsumer>
              {getAnalyticsHandlers => {
                const createAnalyticsEvent = payload =>
                  new UIAnalyticsEvent({
                    payload,
                    context: getAnalyticsContext(),
                    handlers: getAnalyticsHandlers(),
                  });
                const modifiedProps = vmap(createEventMap, (propName, entry) =>
                  modifyCallbackProp(
                    propName,
                    entry,
                    props,
                    createAnalyticsEvent,
                  ),
                );
                return (
                  <WrappedComponent
                    {...props}
                    {...modifiedProps}
                    createAnalyticsEvent={createAnalyticsEvent}
                    ref={ref}
                  />
                );
              }}
            </AnalyticsListenerConsumer>
          )}
        </AnalyticsContextConsumer>
      );
    });

    WithAnalyticsEvents.displayName = `WithAnalyticsEvents(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    return WithAnalyticsEvents;
  };
}
