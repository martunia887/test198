import * as React from 'react';
import { SyntheticEvent } from 'react';
import { MediaClient, Identifier } from '@atlaskit/media-client';
import { IntlProvider, intlShape } from 'react-intl';
import { Shortcut } from '@atlaskit/media-ui';
import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { mediaViewerModalEvent } from './analytics/media-viewer';
import { closedEvent, ClosedInputType } from './analytics/closed';
import { channel } from './analytics/index';
import {
  GasPayload,
  GasScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { ItemSource, MediaViewerFeatureFlags } from './domain';
import { List } from './list';
import { Collection } from './collection';
import { Content } from './content';
import { Blanket } from './styled';

// WORK IN PROGRESS
// MediaViewer might want to consume an array of actions that can be loaded into the header
interface MediaViewerAction {
  icon?: Node;
  label?: string;
  handler: EventHandler;
}

type EventHandler = (identifier: Identifier) => void;

export type Props = {
  action?: MediaViewerAction;
  onClose?: () => void;
  selectedItem?: Identifier;
  featureFlags?: MediaViewerFeatureFlags;
  mediaClient: MediaClient;
  itemSource: ItemSource;
  withSidebar: boolean;
  onNavigationChange?: (selectedItem: Identifier) => void;
} & WithAnalyticsEventsProps;

export class MediaViewerComponent extends React.Component<Props, {}> {
  static contextTypes = {
    intl: intlShape,
  };

  static startTime: number = Date.now();
  static timerElapsed = () => Date.now() - MediaViewerComponent.startTime;

  private fireAnalytics = (payload: GasPayload | GasScreenEventPayload) => {
    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent) {
      const ev = createAnalyticsEvent(payload);
      ev.fire(channel);
    }
  };

  UNSAFE_componentWillMount() {
    this.fireAnalytics(mediaViewerModalEvent());
    MediaViewerComponent.startTime = Date.now();
  }

  onShortcutClosed = () => {
    this.sendClosedEvent('escKey');
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  onContentClose = (_e?: SyntheticEvent, analyticsEvent?: UIAnalyticsEvent) => {
    const { onClose } = this.props;
    if (
      analyticsEvent &&
      analyticsEvent.payload &&
      analyticsEvent.payload.actionSubject === 'button'
    ) {
      this.sendClosedEvent('button');
    }
    if (onClose) {
      onClose();
    }
  };

  private sendClosedEvent(input: ClosedInputType) {
    this.fireAnalytics(closedEvent(input));
  }

  render() {
    const { withSidebar } = this.props;

    const content = (
      <Blanket withSidebar={withSidebar}>
        {<Shortcut keyCode={27} handler={this.onShortcutClosed} />}
        <Content onClose={this.onContentClose}>{this.renderContent()}</Content>
      </Blanket>
    );

    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">{content}</IntlProvider>
    );
  }

  private renderContent() {
    const {
      action,
      selectedItem,
      mediaClient,
      onClose,
      itemSource,
      onNavigationChange,
    } = this.props;
    const defaultSelectedItem = selectedItem;

    if (itemSource.kind === 'COLLECTION') {
      return (
        <Collection
          action={action}
          pageSize={itemSource.pageSize}
          defaultSelectedItem={defaultSelectedItem}
          collectionName={itemSource.collectionName}
          mediaClient={mediaClient}
          onClose={onClose}
          onNavigationChange={onNavigationChange}
        />
      );
    } else if (itemSource.kind === 'ARRAY') {
      const { items } = itemSource;
      const firstItem = items[0];

      return (
        <List
          action={action}
          defaultSelectedItem={defaultSelectedItem || firstItem}
          items={items}
          mediaClient={mediaClient}
          onClose={onClose}
          onNavigationChange={onNavigationChange}
        />
      );
    } else {
      return null as never;
    }
  }
}

export const MediaViewer = withAnalyticsEvents()(MediaViewerComponent);
