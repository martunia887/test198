import * as React from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';

import { NAVIGATION_CHANNEL, UI_EVENT_TYPE } from '../utils/analytics';
import messages from '../utils/messages';

import FormattedMessage from './formatted-message';

type ManageButtonProps = {
  href: string;
};

export default class ManageButton extends React.Component<ManageButtonProps> {
  onClick = (
    _: React.MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    analyticsEvent
      .update({
        eventType: UI_EVENT_TYPE,
        actionSubjectId: 'manageListButton',
      })
      .fire(NAVIGATION_CHANNEL);
  };

  render() {
    const { href } = this.props;
    return (
      <Button href={href} onClick={this.onClick}>
        <FormattedMessage {...messages.manageList} />
      </Button>
    );
  }
}
