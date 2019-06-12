// @flow

import React, { Component } from 'react';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/arrow-right-circle';
import Spinner from '@atlaskit/spinner';

import { withNavigationViewController } from '../../../view-controller';
// TODO: Add a ticket
// eslint-disable-next-line
import ConnectedItem from '../ConnectedItem';

import type { GoToItemProps } from './types';
import type { ItemPresentationProps } from '../../presentational/Item/types';

const generateAfterProp = ({
  goTo,
  spinnerDelay,
  navigationViewController,
}) => ({ isActive, isHover, isFocused }: ItemPresentationProps) => {
  const { incomingView } = navigationViewController.state;
  if (incomingView && incomingView.id === goTo) {
    return <Spinner delay={spinnerDelay} invertColor size="small" />;
  }
  if (isActive || isHover || isFocused) {
    return (
      <ArrowRightCircleIcon
        primaryColor="currentColor"
        secondaryColor="inherit"
      />
    );
  }
  return null;
};

class GoToItem extends Component<GoToItemProps> {
  static defaultProps = {
    spinnerDelay: 200,
  };

  handleClick = (e: SyntheticEvent<*>) => {
    const { goTo, navigationViewController } = this.props;

    e.preventDefault();

    if (typeof goTo !== 'string') {
      return;
    }

    navigationViewController.setView(goTo);
  };

  render() {
    const {
      after: afterProp,
      goTo,
      navigationViewController,
      spinnerDelay,
      ...rest
    } = this.props;
    const after =
      typeof afterProp === 'undefined'
        ? generateAfterProp({ goTo, spinnerDelay, navigationViewController })
        : afterProp;
    const props = { ...rest, after };
    return <ConnectedItem onClick={this.handleClick} {...props} />;
  }
}

export { GoToItem as GoToItemBase };

export default withNavigationViewController(GoToItem);
