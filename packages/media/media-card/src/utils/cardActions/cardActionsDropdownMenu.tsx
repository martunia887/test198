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
  withAnalyticsEvents,
  WithAnalyticsEventProps,
} from '@atlaskit/analytics-next';
import { createAndFireCustomEventOnMedia } from '../../utils/analyticsUtils';

export type CardActionsDropdownMenuBaseOwnProps = {
  readonly actions: CardAction[];

  readonly triggerColor?: string;
  readonly onOpenChange?: (attrs: { isOpen: boolean }) => void;
};

export type CardActionsDropdownMenuBaseProps = CardActionsDropdownMenuBaseOwnProps &
  WithAnalyticsEventProps;

export class CardActionsDropdownMenuBase extends Component<
  CardActionsDropdownMenuBaseProps
> {
  triggerAnalytics() {
    createAndFireCustomEventOnMedia(
      {
        action: 'clicked',
        label: 'more',
      },
      this.props.createAnalyticsEvent,
    );
  }

  render(): JSX.Element | null {
    const { actions, triggerColor, onOpenChange } = this.props;

    if (actions.length > 0) {
      return (
        <DropdownMenu
          onOpenChange={onOpenChange}
          trigger={
            <CardActionButton
              style={{ color: triggerColor }}
              onClick={() => this.triggerAnalytics()}
            >
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
  CardActionsDropdownMenuBaseOwnProps
>()(CardActionsDropdownMenuBase);
