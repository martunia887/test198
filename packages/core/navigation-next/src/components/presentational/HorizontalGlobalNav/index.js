// @flow

/**
 * NOTE: This GlobalNavigation is the layout primitive, which will be wrapped by
 * the more opinionated @atlaskit/global-navigation component.
 */

import React, { Component } from 'react';

import GlobalItem from '../GlobalItem';
import { withGlobalTheme } from '../../../theme';
import HorizontalGlobalNav from './HorizontalGlobalNav';
import type { ConnectedHorizontalGlobalNavProps } from './types';

const HorizontalGlobalNavWithTheme = withGlobalTheme(HorizontalGlobalNav);

export default class ConnectedHorizontalGlobalNav extends Component<ConnectedHorizontalGlobalNavProps> {
  static defaultProps = {
    itemComponent: GlobalItem,
  };

  render() {
    return <HorizontalGlobalNavWithTheme {...this.props} />;
  }
}
