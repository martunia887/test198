import React from 'react';
import { CardAction } from '../../actions';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { createAndFireMediaEvent } from '../analytics';
import { CardActionIconButtonProps } from './cardActionIconButton';

export const formatAnalyticsEventActionLabel = (word?: string) =>
  word
    ? 'mediaCard' +
      word
        .split(/\s/)
        .map(
          (substr: string) =>
            substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase(),
        )
        .join('')
    : 'mediaCardUnlabelledAction';

export default (
  action: CardAction,
  ActionComponent:
    | React.ComponentType<CardActionIconButtonProps>
    | React.ComponentType,
) => {
  const { label } = action;
  const actionSubjectId = formatAnalyticsEventActionLabel(label);
  return withAnalyticsEvents({
    onClick: createAndFireMediaEvent({
      eventType: 'ui',
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId,
      attributes: {
        label,
      },
    }),
  })(ActionComponent);
};
