import * as React from 'react';
import {
  MediaClientConfig,
  MediaClientConfigContext,
} from '@atlaskit/media-core';
import { MediaClient } from '../client';

export interface WithMediaClientProps {
  readonly mediaClient: MediaClient;
}

export interface WithOptionalMediaClientProps {
  readonly mediaClient?: MediaClient;
}

export function withMediaClient<P>(
  Component: React.ComponentType<P & WithOptionalMediaClientProps>,
) {
  const mediaClientsMap = new Map<MediaClientConfig, MediaClient>();

  return class extends React.Component<P> {
    render() {
      return (
        <MediaClientConfigContext.Consumer>
          {mediaClientConfig => {
            let mediaClient: MediaClient | undefined;

            if (mediaClientConfig) {
              console.log(
                'mediaClientConfig is here. Looking for mediaClient now',
              );
              mediaClient = mediaClientsMap.get(mediaClientConfig);
              if (!mediaClient) {
                console.log('mediaClient is not found. Making a new one.');
                mediaClient = new MediaClient(mediaClientConfig);
                mediaClientsMap.set(mediaClientConfig, mediaClient);
              } else {
                console.log('mediaClient is found. Using that.');
              }
            } else {
              console.log('mediaClientConfig is undefined. waiting for one');
            }

            return <Component {...this.props} mediaClient={mediaClient} />;
          }}
        </MediaClientConfigContext.Consumer>
      );
    }
  };
}
