import * as React from 'react';
import { CardLoading } from '../../utils/cardLoading';
import { default as CardType } from './index';
import { CardProps } from '../..';

interface AsyncCardProps {
  Card?: typeof CardType;
}

export default class Card extends React.Component<
  CardProps & AsyncCardProps,
  AsyncCardProps
> {
  static displayName = 'AsyncCard';
  static Card?: typeof CardType;

  state = {
    Card: Card.Card,
  };

  componentWillMount() {
    if (!this.state.Card) {
      import(/* webpackChunkName:"@atlaskit-internal_Card" */
      './index').then(module => {
        Card.Card = module.default;
        this.setState({ Card: module.default });
      });
    }
  }

  render() {
    const { dimensions } = this.props;
    if (!this.state.Card) {
      return <CardLoading dimensions={dimensions} />;
    }

    return <this.state.Card {...this.props} />;
  }
}
