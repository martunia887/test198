import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import { MediaClientConfig } from '@atlaskit/media-core';
import {
  defaultCollectionName,
  defaultMediaPickerAuthProvider,
  userAuthProvider,
  mediaMock,
} from '@atlaskit/media-test-helpers';
import { MediaMockConfig } from '@atlaskit/media-test-helpers';

import { MediaPicker } from '../src';
import { Popup } from '../src/types';

mediaMock.enable();

export interface MediaMockControlsBackdoor {
  resetMediaMock: (config?: MediaMockConfig) => void;
}

const mediaMockControlsBackdoor: MediaMockControlsBackdoor = {
  resetMediaMock: (config = {}) => {
    mediaMock.disable();
    mediaMock.enable(config);
  },
};

(window as any).mediaMockControlsBackdoor = mediaMockControlsBackdoor;

const mediaClientConfig: MediaClientConfig = {
  authProvider: defaultMediaPickerAuthProvider,
  userAuthProvider,
};

export type Event = {
  readonly name: string;
  readonly payload: any;
};

export type Props = {};

export type State = {
  readonly events: Event[];
  readonly popup?: Popup;
};

export default class Example extends Component<Props, State> {
  state: State = {
    events: [],
  };

  static contextTypes = {
    // Required context in order to integrate analytics in media picker
    getAtlaskitAnalyticsEventHandlers: PropTypes.func,
  };

  async componentDidMount() {
    const popup = await MediaPicker(mediaClientConfig, {
      uploadParams: {
        collection: defaultCollectionName,
      },
      container: document.body,
      // Media picker requires `proxyReactContext` to enable analytics
      // otherwise, analytics Gasv3 integrations won't work
      proxyReactContext: this.context,
    });

    popup.show();

    popup.onAny((event, payload) => {
      const { events } = this.state;
      this.setState({
        events: [...events, { name: event, payload }],
      });
    });

    this.setState({ popup });
  }

  render() {
    const { events, popup } = this.state;
    return (
      <div>
        <Button id="show" onClick={() => (popup ? popup.show() : null)}>
          Show
        </Button>
        <div>
          <div>Events:</div>
          <pre id="events">{JSON.stringify(events, null, 2)}</pre>
        </div>
      </div>
    );
  }
}
