import React, { useContext, FC, ReactNode, Children } from 'react';

import { AnalyticsReactContext } from './AnalyticsReactContext';

interface Props {
  children: ReactNode;
  /** Arbitrary data. Any events created below this component in the tree will
   * have this added as an item in their context array. */
  data: unknown;
}

export const AnalyticsContext: FC<Props> = ({ children, data }) => {
  const {
    getAtlaskitAnalyticsContext,
    getAtlaskitAnalyticsEventHandlers,
  } = useContext(AnalyticsReactContext);

  const getAnalyticsContext = () => [...getAtlaskitAnalyticsContext(), data];

  return (
    <AnalyticsReactContext.Provider
      value={{
        getAtlaskitAnalyticsContext: getAnalyticsContext,
        getAtlaskitAnalyticsEventHandlers,
      }}
    >
      {Children.only(children)}
    </AnalyticsReactContext.Provider>
  );
};
