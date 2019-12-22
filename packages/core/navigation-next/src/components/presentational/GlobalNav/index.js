// @flow

/**
 * NOTE: This GlobalNavigation is the layout primitive, which will be wrapped by
 * the more opinionated @atlaskit/global-navigation component.
 */

import React, { Component } from 'react';

import { withGlobalTheme } from '../../../theme';
import GlobalItem from '../GlobalItem';

import GlobalNavigation from './GlobalNavigation';
import type { ConnectedGlobalNavigationProps } from './types';

const GlobalNavigationWithTheme = withGlobalTheme(GlobalNavigation);

export default class ConnectedGlobalNavigation extends Component<ConnectedGlobalNavigationProps> {
  static defaultProps = {
    itemComponent: GlobalItem,
  };

  render() {
    return <GlobalNavigationWithTheme {...this.props} />;
  }
}
