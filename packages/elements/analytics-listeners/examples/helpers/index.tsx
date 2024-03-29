import {
  EventType,
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import {
  createAndFireEvent,
  withAnalyticsEvents,
  WithAnalyticsEventProps,
} from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import * as React from 'react';
import { FabricChannel } from '../../src/types';

export type OwnProps = {
  onClick: (e: React.SyntheticEvent) => void;
};

export type Props = WithAnalyticsEventProps & OwnProps;

const CustomButton = ({
  onClick,
  text,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  text?: string;
}) => (
  <div id="dummy" onClick={onClick} style={{ paddingBottom: 12 }}>
    <Button>{text || 'Test'}</Button>
  </div>
);

export class DummyElementsComponent extends React.Component<Props> {
  static displayName = 'DummyElementsComponent';

  render() {
    return (
      <CustomButton
        text={FabricChannel.elements}
        onClick={this.props.onClick}
      />
    );
  }
}

export class DummyAtlaskitComponent extends React.Component<Props> {
  static displayName = 'DummyAtlaskitComponent';
  render() {
    return (
      <CustomButton
        text={FabricChannel.atlaskit}
        onClick={this.props.onClick}
      />
    );
  }
}

export class DummyNavigationComponent extends React.Component<Props> {
  static displayName = 'DummyNavigationComponent';
  render() {
    return (
      <CustomButton
        text={FabricChannel.navigation}
        onClick={this.props.onClick}
      />
    );
  }
}

export class DummyEditorComponent extends React.Component<Props> {
  static displayName = 'DummyEditorComponent';
  render() {
    return (
      <CustomButton text={FabricChannel.editor} onClick={this.props.onClick} />
    );
  }
}

export class DummyMediaComponent extends React.Component<Props> {
  static displayName = 'DummyEditorComponent';
  render() {
    return (
      <CustomButton text={FabricChannel.media} onClick={this.props.onClick} />
    );
  }
}

class MyButton extends React.Component<Props> {
  static displayName = 'MyButton';
  render() {
    return (
      <button id="dummy" onClick={this.props.onClick}>
        Test [click on me]
      </button>
    );
  }
}

const componentChannels = {
  [FabricChannel.atlaskit]: DummyAtlaskitComponent,
  [FabricChannel.elements]: DummyElementsComponent,
  [FabricChannel.navigation]: DummyNavigationComponent,
  [FabricChannel.editor]: DummyEditorComponent,
  [FabricChannel.media]: DummyMediaComponent,
};

export const createComponentWithAnalytics = (
  channel: FabricChannel,
): React.ComponentType<OwnProps> =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
    }),
  })(componentChannels[channel]);

export const createComponentWithAttributesWithAnalytics = (
  channel: FabricChannel,
): React.ComponentType<OwnProps> =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
      attributes: {
        packageName: '@atlaskit/foo',
        packageVersion: '1.0.0',
        componentName: 'foo',
        fooBar: 'yay',
      },
    }),
  })(componentChannels[channel]);

export const createTaggedComponentWithAnalytics = (
  channel: FabricChannel,
  tag: string,
): React.ComponentType<OwnProps> =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
      tags: [tag, 'foo'],
    }),
  })(componentChannels[channel]);

export const IncorrectEventType = (
  channel: FabricChannel,
): React.ComponentType<OwnProps> =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'unknown' as EventType,
    }),
  })(componentChannels[channel]);

export const createButtonWithAnalytics = (
  payload: GasPurePayload,
  channel: FabricChannel,
) =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)(payload),
  })(MyButton);

export const createAnalyticsWebClientMock = () => ({
  sendUIEvent: (event: GasPurePayload) => {
    console.log('sendUIEvent: ', event);
  },
  sendOperationalEvent: (event: GasPurePayload) => {
    console.log('sendOperationalEvent: ', event);
  },
  sendTrackEvent: (event: GasPurePayload) => {
    console.log('sendTrackEvent: ', event);
  },
  sendScreenEvent: (event: GasPureScreenEventPayload) => {
    console.log('sendScreenEvent: ', event);
  },
});
