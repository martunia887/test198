import React, { Component } from 'react';
import {
  withAnalyticsEvents,
  UIAnalyticsEvent,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';

export interface Props {
  onMount: (analyticsEvent: UIAnalyticsEvent) => void;
}

interface ImplementationProps extends Props {
  createAnalyticsEvent: CreateUIAnalyticsEvent;
}

class MountEventComponent extends Component<ImplementationProps> {
  componentDidMount() {
    const analyticsEvent = this.props.createAnalyticsEvent({
      action: 'mounted',
    });
    if (this.props.onMount) {
      this.props.onMount(analyticsEvent);
    }
  }

  render() {
    return null;
  }
}

const MountEventComponentWithHOC = withAnalyticsEvents()(MountEventComponent);

export const MountEvent = (props: Props) => (
  <MountEventComponentWithHOC {...props} />
);
