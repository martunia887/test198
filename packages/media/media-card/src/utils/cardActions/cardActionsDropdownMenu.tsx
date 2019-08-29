import * as React from 'react';
import { Component } from 'react';

import MoreIcon from '@atlaskit/icon/glyph/more';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';

import { CardAction } from '../../actions';
import { CardActionButton } from './styled';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { createAndFireMediaEvent } from '../analytics';

export type CardActionsDropdownMenuProps = {
  readonly actions: CardAction[];

  readonly triggerColor?: string;
  readonly onOpenChange?: (attrs: { isOpen: boolean }) => void;
};

const CardActionButtonWithAnalytics = withAnalyticsEvents({
  onClick: createAndFireMediaEvent({
    eventType: 'ui',
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'mediaCardDropDownMenu',
  }),
})(CardActionButton);

export class CardActionsDropdownMenu extends Component<
  CardActionsDropdownMenuProps
> {
  render(): JSX.Element | null {
    const { actions, triggerColor, onOpenChange } = this.props;

    if (actions.length > 0) {
      return (
        <DropdownMenu
          onOpenChange={onOpenChange}
          trigger={
            <CardActionButtonWithAnalytics style={{ color: triggerColor }}>
              <MoreIcon label="more" />
            </CardActionButtonWithAnalytics>
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
