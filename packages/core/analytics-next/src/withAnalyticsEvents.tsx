import React from 'react';

import { Omit } from '@atlaskit/type-helpers';
import { CreateUIAnalyticsEvent, CreateEventMap } from './types';
import { useAnalytics } from './useAnalytics';

export interface WithAnalyticsEventsProps {
  /**
   * You should not be accessing this prop under any circumstances.
   * It is provided by `@atlaskit/analytics-next` and integrated in the component
   */
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

const withAnalyticsEvents = (createEventMap?: CreateEventMap) => <
  Props extends WithAnalyticsEventsProps,
  Component
>(
  WrappedComponent: React.JSXElementConstructor<Props> & Component,
) => {
  type WrappedProps = JSX.LibraryManagedAttributes<
    Component,
    Omit<Props, keyof WithAnalyticsEventsProps>
  >;

  const WithAnalyticsEvents = React.forwardRef<any, WrappedProps>(
    (props, ref) => {
      const { createAnalyticsEvent, patchedEventProps } = useAnalytics<
        WrappedProps
      >(createEventMap, props);
      return (
        <WrappedComponent
          {...props}
          {...patchedEventProps}
          createAnalyticsEvent={createAnalyticsEvent}
          ref={ref}
        />
      );
    },
  );

  // @ts-ignore
  WithAnalyticsEvents.displayName = `WithAnalyticsEvents(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithAnalyticsEvents;
};

export default withAnalyticsEvents;
