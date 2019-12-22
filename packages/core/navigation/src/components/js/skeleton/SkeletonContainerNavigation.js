// @flow
import React, { Component, type ComponentType } from 'react';

import type { Provided } from '../../../theme/types';
import { WithRootTheme } from '../../../theme/util';

import SkeletonContainerItems from './SkeletonContainerItems';
import { type SkeletonContainerHeaderProps } from './SkeletonDefaultContainerHeader';
import SkeletonGlobalBottomItems from './SkeletonGlobalBottomItems';
import SkeletonGlobalTopItems from './SkeletonGlobalTopItems';
import { ShownWhenCollapsed } from './ToggleWhenCollapsed';
import SkeletonContainerHeaderWrapper from './styled/SkeletonContainerHeaderWrapper';
import SkeletonContainerNavigationInner from './styled/SkeletonContainerNavigationInner';
import SkeletonNavigationContentOuter from './styled/SkeletonNavigationContentOuter';

export type Props = {
  isCollapsed?: boolean,
  theme: Provided,
  containerHeaderComponent: ComponentType<SkeletonContainerHeaderProps>,
};

export default class SkeletonContainerNavigation extends Component<Props> {
  static defaultProps = {
    isCollapsed: false,
  };

  render() {
    const ContainerHeaderComponent = this.props.containerHeaderComponent;
    const { theme, isCollapsed } = this.props;
    return (
      <WithRootTheme provided={theme} isCollapsed={isCollapsed}>
        <SkeletonContainerNavigationInner isCollapsed={isCollapsed}>
          <SkeletonNavigationContentOuter>
            <div>
              <ShownWhenCollapsed isCollapsed={isCollapsed}>
                <SkeletonGlobalTopItems />
              </ShownWhenCollapsed>
              <SkeletonContainerHeaderWrapper>
                <ContainerHeaderComponent isCollapsed={isCollapsed} />
              </SkeletonContainerHeaderWrapper>
              <SkeletonContainerItems isCollapsed={isCollapsed} />
            </div>
            <ShownWhenCollapsed isCollapsed={isCollapsed}>
              <SkeletonGlobalBottomItems />
            </ShownWhenCollapsed>
          </SkeletonNavigationContentOuter>
        </SkeletonContainerNavigationInner>
      </WithRootTheme>
    );
  }
}
