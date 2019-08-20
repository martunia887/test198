import React from 'react';

import { AnalyticsContextProvider } from './AnalyticsContextProvider';

export const withAnalyticsContext = (defaultData = {}) => WrappedComponent => {
  const WithAnalyticsContext = React.forwardRef(
    ({ analyticsContext = {}, ...rest }, ref) => {
      const analyticsData = {
        ...defaultData,
        ...analyticsContext,
      };

      return (
        <AnalyticsContextProvider data={analyticsData}>
          <WrappedComponent {...rest} ref={ref} />
        </AnalyticsContext>
      );
    },
  );

  WithAnalyticsContext.displayName = `WithAnalyticsContext(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithAnalyticsContext;
};
