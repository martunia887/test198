import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Spinner from '@atlaskit/spinner';

import { messages } from '../../messages';
import { CollapsedFrame } from '../CollapsedFrame';
import { SingleLineLayout } from '../SingleLineLayout';
import { minWidth, maxWidth } from '../dimensions';

export interface BlockCardResolvingViewProps {
  /** The optional click handler */
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class BlockCardResolvingView extends React.Component<
  BlockCardResolvingViewProps
> {
  render() {
    const { onClick, isSelected } = this.props;
    return (
      <CollapsedFrame
        isSelected={isSelected}
        minWidth={minWidth}
        maxWidth={maxWidth}
        onClick={onClick}
      >
        <SingleLineLayout
          left={<Spinner size="small" />}
          middle={<FormattedMessage {...messages.loading} />}
        />
      </CollapsedFrame>
    );
  }
}
