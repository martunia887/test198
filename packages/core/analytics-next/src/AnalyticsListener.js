// @flow

import React, { createContext, Component, type Node } from 'react';
import UIAnalyticsEvent from './UIAnalyticsEvent';
import type { UIAnalyticsEventHandler } from './types';

type Props = {
  /** Children! */
  children?: Node,
  /** The channel to listen for events on. */
  channel?: string,
  /** A function which will be called when an event is fired on this Listener's
   * channel. It is passed the event and the channel as arguments. */
  onEvent: (event: UIAnalyticsEvent, channel?: string) => void,
};

const { Consumer: AnalyticsListenerConsumer, Provider } = createContext(
  (): Function[] => [],
);

export { AnalyticsListenerConsumer };

class AnalyticsListener extends Component<{
  ...$Exact<Props>,
  getParentHandlers: Function,
}> {
  static defaultProps = {
    getParentHandlers: () => [],
  };

  getAnalyticsEventHandlers = () => {
    const { channel, onEvent, getParentHandlers } = this.props;
    const handler: UIAnalyticsEventHandler = (event, eventChannel) => {
      if (channel === '*' || channel === eventChannel) {
        onEvent(event, eventChannel);
      }
    };
    return [handler, ...getParentHandlers()];
  };

  render() {
    return (
      <Provider value={this.getAnalyticsEventHandlers}>
        {this.props.children}
      </Provider>
    );
  }
}

export default (props: Props) => (
  <AnalyticsListenerConsumer>
    {getParentHandlers => (
      <AnalyticsListener {...props} getParentHandlers={getParentHandlers} />
    )}
  </AnalyticsListenerConsumer>
);
