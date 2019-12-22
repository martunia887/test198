import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@atlaskit/button';

import { messages } from '../../messages';
import { CollapsedFrame } from '../CollapsedFrame';
import { CollapsedIconTitleDescriptionLayout } from '../CollapsedIconTitleDescriptionLayout';
import { ImageIcon } from '../ImageIcon';
import { minWidth, maxWidth } from '../dimensions';

export interface BlockCardUnauthorisedViewProps {
  /** The icon of the service (e.g. Dropbox/Asana/Google/etc) to display */
  icon?: string;
  /** The url to display */
  url: string;
  /** The optional click handler */
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
  /** The optional handler for "Connect" button */
  onAuthorise?: () => void;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class BlockCardUnauthorisedView extends React.Component<
  BlockCardUnauthorisedViewProps
> {
  handleAuthorise = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { onAuthorise } = this.props;
    if (onAuthorise) {
      event.preventDefault();
      event.stopPropagation();
      onAuthorise();
    }
  };

  render() {
    const { icon, url, onClick, onAuthorise, isSelected } = this.props;
    return (
      <CollapsedFrame
        isSelected={isSelected}
        minWidth={minWidth}
        maxWidth={maxWidth}
        onClick={onClick}
      >
        <CollapsedIconTitleDescriptionLayout
          icon={<ImageIcon src={icon} size={24} />}
          title={url}
          description={<FormattedMessage {...messages.connect_link_account} />}
          other={
            onAuthorise && (
              <Button
                appearance="subtle"
                spacing="compact"
                onClick={this.handleAuthorise as () => void}
              >
                Connect
              </Button>
            )
          }
        />
      </CollapsedFrame>
    );
  }
}
