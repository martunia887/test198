import * as React from 'react';

import AtlaskitListener from './atlaskit/AtlaskitListener';
import FabricEditorListener from './fabric/FabricEditorListener';
import FabricElementsListener from './fabric/FabricElementsListener';
import Logger from './helpers/logger';
import MediaAnalyticsListener from './media/MediaAnalyticsListener';
import NavigationListener from './navigation/NavigationListener';
import { AnalyticsWebClient, FabricChannel, ListenerProps } from './types';

export type Props = {
  /** Children! */
  children?: React.ReactNode;
  client?: AnalyticsWebClient | Promise<AnalyticsWebClient>;
  logLevel?: number;
  /** A list of individual listeners to exclude, identified by channel */
  excludedChannels?: FabricChannel[];
};

const listenerMap = {
  [FabricChannel.elements]: FabricElementsListener,
  [FabricChannel.editor]: FabricEditorListener,
  [FabricChannel.atlaskit]: AtlaskitListener,
  [FabricChannel.navigation]: NavigationListener,
  [FabricChannel.media]: MediaAnalyticsListener,
};

class FabricAnalyticsListeners extends React.Component<Props> {
  logger: Logger;

  constructor(props: Props) {
    super(props);

    this.logger = new Logger({ logLevel: props.logLevel });
  }

  render() {
    const { client, children, logLevel, excludedChannels } = this.props;
    if (typeof logLevel === 'number') {
      this.logger.setLogLevel(logLevel);
    }

    const listeners = (Object.keys(listenerMap) as FabricChannel[])
      .filter(
        channel => !excludedChannels || excludedChannels.indexOf(channel) < 0,
      )
      .map(channel => listenerMap[channel])
      .reduce(
        (
          prev: React.ReactNode,
          Listener: React.ComponentClass<ListenerProps>,
        ) => (
          <Listener client={client} logger={this.logger}>
            {prev}
          </Listener>
        ),
        children,
      );

    return listeners;
  }
}

export default FabricAnalyticsListeners;
