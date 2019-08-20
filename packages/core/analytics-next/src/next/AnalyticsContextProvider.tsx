import React, { useContext } from 'react';

import { AnalyticsContext } from './AnalyticsContext';

export const AnalyticsContextProvider = ({ children, data }) => {
  const {
    getAtlaskitAnalyticsContext,
    getAtlaskitAnalyticsEventHandlers,
  } = useContext(AnalyticsContext);

  const getAnalyticsContext = () => [...getAtlaskitAnalyticsContext(), data];

  return (
    <AnalyticsContext.Provider
      value={{
        getAtlaskitAnalyticsContext: getAnalyticsContext,
        getAtlaskitAnalyticsEventHandlers,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
