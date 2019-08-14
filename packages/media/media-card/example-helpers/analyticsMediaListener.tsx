import * as React from 'react';
import {
  UIAnalyticsEventInterface,
  AnalyticsListener,
} from '@atlaskit/analytics-next';
import { FabricChannel } from '@atlaskit/analytics-listeners';

type AnalyticsMediaListenerProps = {
  children: React.ReactNode;
};

export const AnalyticsMediaListener = (props: AnalyticsMediaListenerProps) => (
  <AnalyticsListener
    channel={FabricChannel.media}
    onEvent={({ payload, context }: UIAnalyticsEventInterface) =>
      console.debug(context, payload)
    }
  >
    {props.children}
  </AnalyticsListener>
);
