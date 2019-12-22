// @flow
import React, { Component } from 'react';

import type { Provided } from '../../../theme/types';
import { WithRootTheme } from '../../../theme/util';

import SkeletonGlobalBottomItems from './SkeletonGlobalBottomItems';
import SkeletonGlobalTopItems from './SkeletonGlobalTopItems';
import SkeletonGlobalNavigationInner from './styled/SkeletonGlobalNavigationInner';
import SkeletonNavigationContentOuter from './styled/SkeletonNavigationContentOuter';

export type Props = {
  isCollapsed: boolean,
  theme: Provided,
};

export default class SkeletonGlobalNavigation extends Component<Props> {
  static defaultProps = {
    isCollapsed: false,
  };

  render() {
    return (
      <WithRootTheme
        provided={this.props.theme}
        isCollapsed={this.props.isCollapsed}
      >
        <SkeletonGlobalNavigationInner>
          <SkeletonNavigationContentOuter>
            <SkeletonGlobalTopItems />
            <SkeletonGlobalBottomItems />
          </SkeletonNavigationContentOuter>
        </SkeletonGlobalNavigationInner>
      </WithRootTheme>
    );
  }
}
