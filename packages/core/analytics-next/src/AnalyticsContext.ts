import React from 'react';

interface AnalyticsContextInterface {
  getAtlaskitAnalyticsContext(): any[];
  getAtlaskitAnalyticsEventHandlers(): any[];
}

export const AnalyticsContext = React.createContext<AnalyticsContextInterface>({
  getAtlaskitAnalyticsContext: () => [],
  getAtlaskitAnalyticsEventHandlers: () => [],
});
