import * as React from 'react';
import { CardLoading } from '../../utils/lightCards';
import {
  withMediaClient,
  WithOptionalMediaClientProps,
} from '@atlaskit/media-client';
import { CardProps } from './index';
import { BaseCardProps } from '../..';

interface State {
  Card?: React.ComponentType<CardProps>;
}

export type Props = BaseCardProps & WithOptionalMediaClientProps;

export class CardLoader extends React.Component<Props, State> {
  static displayName = 'AsyncCard';
  static Card?: React.ComponentType<CardProps>;

  state = {
    Card: CardLoader.Card,
  };

  componentWillMount() {
    if (!this.state.Card) {
      import(/* webpackChunkName:"@atlaskit-internal_Card" */
      './index').then(module => {
        CardLoader.Card = module.Card;
        this.setState({ Card: module.Card });
      });
    }
  }

  render() {
    const { dimensions, mediaClient } = this.props;
    if (!this.state.Card || !mediaClient) {
      return <CardLoading dimensions={dimensions} />;
    }
    const CardComponent = this.state.Card;

    return <CardComponent {...this.props} mediaClient={mediaClient} />;
  }
}

export default withMediaClient(CardLoader);
