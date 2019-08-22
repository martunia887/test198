import React, { useContext, FC } from 'react';

import { AnalyticsReactContext } from './AnalyticsReactContext';
import UIAnalyticsEvent, { UIAnalyticsEventHandler } from './UIAnalyticsEvent';
import { AnalyticsReactContextReconciler } from './AnalyticsReactContextReconciler';

type Props = {
  children?: React.ReactNode;
  /** The channel to listen for events on. */
  channel?: string;
  /** A function which will be called when an event is fired on this Listener's
   * channel. It is passed the event and the channel as arguments. */
  onEvent: (event: UIAnalyticsEvent, channel?: string) => void;
};

const AnalyticsListener: FC<Props> = ({ onEvent, channel, children }) => {
  const {
    getAtlaskitAnalyticsContext,
    getAtlaskitAnalyticsEventHandlers: getParentEventHandlers,
  } = useContext(AnalyticsReactContext);

  const getAnalyticsEventHandlers = () => {
    const handler: UIAnalyticsEventHandler = (event, eventChannel) => {
      if (channel === '*' || channel === eventChannel) {
        onEvent(event, eventChannel);
      }
    };

    return [handler, ...getParentEventHandlers()];
  };

  return (
    <AnalyticsReactContext.Provider
      value={{
        getAtlaskitAnalyticsContext,
        getAtlaskitAnalyticsEventHandlers: getAnalyticsEventHandlers,
      }}
    >
      <AnalyticsReactContextReconciler>
        {children}
      </AnalyticsReactContextReconciler>
    </AnalyticsReactContext.Provider>
  );
};

export default AnalyticsListener;
