import * as React from 'react';
import {
  AnalyticsEventPayload,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import throttle from 'lodash.throttle';

import { JoinableSitesDataProvider } from '../../src/providers/joinable-sites-data-provider';
import { prefetch } from '../prefetch';
import { AvailableProductsDataProvider } from '../providers/products-data-provider';
import { FeatureFlagProps } from '../types';
import {
  NAVIGATION_CHANNEL,
  NavigationAnalyticsContext,
  OPERATIONAL_EVENT_TYPE,
  TRIGGER_COMPONENT,
  TRIGGER_SUBJECT,
  withAnalyticsEvents,
} from '../utils/analytics';
import packageContext from '../utils/package-context';
import now from '../utils/performance-now';

const THROTTLE_EXPIRES = 60 * 1000; // 60 seconds
const THROTTLE_OPTIONS = {
  leading: true,
  trailing: false,
};

const TRIGGER_CONTEXT = {
  componentName: TRIGGER_COMPONENT,
  ...packageContext,
};

type PrefetchTriggerProps = {
  product?: string;
  children: React.ReactNode;
  cloudId?: string;
  Container?: React.ReactType;
  availableProductsDataProvider?: AvailableProductsDataProvider;
  joinableSitesDataProvider?: JoinableSitesDataProvider;
} & Partial<FeatureFlagProps>;

class PrefetchTrigger extends React.Component<
  PrefetchTriggerProps & WithAnalyticsEventsProps
> {
  private lastEnteredAt?: number;

  private fireOperationalEvent = (payload: AnalyticsEventPayload) => {
    if (this.props.createAnalyticsEvent) {
      this.props
        .createAnalyticsEvent({
          eventType: OPERATIONAL_EVENT_TYPE,
          actionSubject: TRIGGER_SUBJECT,
          ...payload,
        })
        .fire(NAVIGATION_CHANNEL);
    }
  };

  private triggerPrefetch = throttle(
    () => {
      prefetch(this.props);

      this.fireOperationalEvent({
        action: 'triggered',
      });
    },
    THROTTLE_EXPIRES,
    THROTTLE_OPTIONS,
  );

  private handleMouseEnter = () => {
    this.triggerPrefetch();
    this.lastEnteredAt = now();
  };

  private handleMouseClick = () => {
    if (this.lastEnteredAt) {
      const hoverToClick = Math.round(now() - this.lastEnteredAt);

      this.fireOperationalEvent({
        action: 'clicked',
        attributes: { hoverToClick },
      });
    }
  };

  render() {
    const { children, Container = 'div' } = this.props;
    return (
      <Container
        onFocus={this.handleMouseEnter}
        onMouseEnter={this.handleMouseEnter}
        onClick={this.handleMouseClick}
      >
        {children}
      </Container>
    );
  }
}

const PrefetchTriggerWithEvents = withAnalyticsEvents()(PrefetchTrigger);

export default (props: PrefetchTriggerProps) => (
  <NavigationAnalyticsContext data={TRIGGER_CONTEXT}>
    <PrefetchTriggerWithEvents {...props} />
  </NavigationAnalyticsContext>
);
