import * as React from 'react';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';

import { isCardWithData } from '../../utils';
import { CardWithDataRenderer } from '../CardWithData/loader';
import { CardWithURLRenderer } from '../CardWithUrl/loader';

import { CardAppearance } from './types';
import { CardProps } from './types';

class PlainCard extends React.PureComponent<CardProps> {
  render() {
    return isCardWithData(this.props) ? (
      <CardWithDataRenderer {...this.props} />
    ) : (
      <CardWithURLRenderer {...this.props} />
    );
  }
}

export const Card = withAnalyticsEvents()(PlainCard);

export { CardAppearance, CardProps };
