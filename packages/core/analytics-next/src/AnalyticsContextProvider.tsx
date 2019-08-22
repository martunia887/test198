import React, { useContext, FC, ReactNode, Children } from 'react';

import { AnalyticsContext } from './AnalyticsContext';

interface Props {
  children: ReactNode;
  /** Arbitrary data. Any events created below this component in the tree will
   * have this added as an item in their context array. */
  data: unknown;
}

export const AnalyticsContextProvider: FC<Props> = ({ children, data }) => {
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
      {Children.only(children)}
    </AnalyticsContext.Provider>
  );
};
