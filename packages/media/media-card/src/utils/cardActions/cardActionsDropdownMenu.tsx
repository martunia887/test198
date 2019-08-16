import * as React from 'react';
import { Component } from 'react';

import MoreIcon from '@atlaskit/icon/glyph/more';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';

import { CardAction } from '../../actions';
import { CardActionButton } from './styled';
import {
  WithAnalyticsEventProps,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import { createAndFireMediaAnalyticsEvent } from '../analytics';

export type CardActionsDropdownMenuProps = {
  readonly actions: CardAction[];

  readonly triggerColor?: string;
  readonly onOpenChange?: (attrs: { isOpen: boolean }) => void;
};

class CardActionsDropdownMenuBase extends Component<
  CardActionsDropdownMenuProps & WithAnalyticsEventProps
> {
  onOpenChange = (attrs: { isOpen: boolean }) => {
    const { createAnalyticsEvent, onOpenChange } = this.props;
    if (attrs.isOpen) {
      createAndFireMediaAnalyticsEvent(
        {
          eventType: 'ui',
          action: 'clicked',
          actionSubject: 'button',
          actionSubjectId: 'mediaCardDropDownMenu',
        },
        createAnalyticsEvent,
      );
    }
    onOpenChange && onOpenChange(attrs);
  };

  render(): JSX.Element | null {
    const { actions, triggerColor } = this.props;

    if (actions.length > 0) {
      return (
        <DropdownMenu
          onOpenChange={this.onOpenChange}
          trigger={
            <CardActionButton style={{ color: triggerColor }}>
              <MoreIcon label="more" />
            </CardActionButton>
          }
        >
          <DropdownItemGroup>
            {actions.map(({ label, handler }, index) => (
              <DropdownItem key={index} onClick={handler}>
                {label}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
      );
    } else {
      return null;
    }
  }
}

export const CardActionsDropdownMenu = withAnalyticsEvents<
  CardActionsDropdownMenuProps & WithAnalyticsEventProps
>()(CardActionsDropdownMenuBase);
