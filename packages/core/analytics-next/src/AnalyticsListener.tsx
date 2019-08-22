import React, { useContext, FC } from 'react';

import { AnalyticsContext } from './AnalyticsContext';
import UIAnalyticsEvent, { UIAnalyticsEventHandler } from './UIAnalyticsEvent';

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
  } = useContext(AnalyticsContext);

  const getAnalyticsEventHandlers = () => {
    const handler: UIAnalyticsEventHandler = (event, eventChannel) => {
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

export default AnalyticsListener;
