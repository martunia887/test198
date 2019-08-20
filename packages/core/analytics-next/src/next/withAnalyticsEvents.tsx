import React from 'react';

import { useAnalytics } from './useAnalytics';

export const withAnalyticsEvents = (
  createEventMap = {},
) => WrappedComponent => {
  const WithAnalyticsEvents = React.forwardRef((props, ref) => {
    const { createAnalyticsEvent, patchedEventProps } = useAnalytics(
      createEventMap,
      props,
    );
    return (
      <WrappedComponent
        {...props}
        {...patchedEventProps}
        createAnalyticsEvent={createAnalyticsEvent}
        ref={ref}
      />
    );
  });

  WithAnalyticsEvents.displayName = `WithAnalyticsEvents(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithAnalyticsEvents;
};
