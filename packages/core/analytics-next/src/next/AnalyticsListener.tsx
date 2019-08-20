import React, { useContext } from 'react';

import { AnalyticsContext } from './AnalyticsContext';

export const AnalyticsListener = ({ onEvent, channel, children }) => {
  const {
    getAtlaskitAnalyticsContext,
    getAtlaskitAnalyticsEventHandlers: getParentEventHandlers,
  } = useContext(AnalyticsContext);

  const getAnalyticsEventHandlers = () => {
    const handler = (event, eventChannel) => {
      if (channel === '*' || channel === eventChannel) {
        onEvent(event, eventChannel);
      }
    };

    return [handler, ...getParentEventHandlers()];
  };

  return (
    <AnalyticsContext.Provider
      value={{
        getAtlaskitAnalyticsContext,
        getAtlaskitAnalyticsEventHandlers: getAnalyticsEventHandlers,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
