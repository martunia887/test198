import * as React from 'react';
import {
  MediaClientConfig,
  MediaClientConfigContext,
} from '@atlaskit/media-core';
import { MediaClient } from '../client';

export interface WithMediaClientProps {
  readonly mediaClient: MediaClient;
}

export function withMediaClient<P>(
  Component: React.ComponentType<P & WithMediaClientProps>,
) {
  // TODO Any problem with old React context?
  let mediaClient: MediaClient;
  let previousMediaClientConfig: MediaClientConfig;

  return class extends React.Component<P> {
    render() {
      return (
        <MediaClientConfigContext.Consumer>
          {mediaClientConfig => {
            if (
              !mediaClient ||
              mediaClientConfig !== previousMediaClientConfig
            ) {
              mediaClient = new MediaClient(mediaClientConfig);
            }
            previousMediaClientConfig = mediaClientConfig;
            return <Component {...this.props} mediaClient={mediaClient} />;
          }}
        </MediaClientConfigContext.Consumer>
      );
    }
  };
}
