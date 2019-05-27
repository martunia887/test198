// @flow

import React, { PureComponent, type Ref, type Node } from 'react';
import { PageWrapper } from './primitives';
import type { CollapseListeners } from '../LayoutManager/types';
import ResizeTransition, { isTransitioning } from '../ResizeTransition';

import {
  CONTENT_NAV_WIDTH_COLLAPSED,
  CONTENT_NAV_WIDTH_FLYOUT,
  GLOBAL_NAV_WIDTH,
} from '../../../common/constants';

type PageProps = {
  ...$Exact<CollapseListeners>,
  children: Node,
  flyoutIsOpen: boolean,
  innerRef: Ref<'div'>,
  isResizing: boolean,
  isCollapsed: boolean,
  productNavWidth: number,
  topOffset: number,
  leftOffset: number,
  noContentNav: boolean,
};

export default class PageContent extends PureComponent<PageProps> {
  static defaultProps = {
    leftOffset: GLOBAL_NAV_WIDTH,
    topOffset: 0,
    noContentNav: false,
  };

  renderPageWrapper = ({
    disableInteraction = false,
    transitionStyle = {},
  } = {}) => {
    const { children, innerRef, leftOffset, topOffset } = this.props;
    return (
      <PageWrapper
        disableInteraction={disableInteraction}
        innerRef={innerRef}
        leftOffset={leftOffset}
        topOffset={topOffset}
        style={transitionStyle}
      >
        {children}
      </PageWrapper>
    );
  };

  render() {
    const {
      flyoutIsOpen,
      isResizing,
      isCollapsed,
      productNavWidth,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      noContentNav,
    } = this.props;
    return noContentNav ? (
      this.renderPageWrapper()
    ) : (
      <ResizeTransition
        from={[CONTENT_NAV_WIDTH_COLLAPSED]}
        in={!isCollapsed}
        productNavWidth={productNavWidth}
        properties={['paddingLeft']}
        to={[flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth]}
        userIsDragging={isResizing}
        /* Attach expand/collapse callbacks to the page resize transition to ensure they are only
         * called when the nav is permanently expanded/collapsed, i.e. when page content position changes. */
        onExpandStart={onExpandStart}
        onExpandEnd={onExpandEnd}
        onCollapseStart={onCollapseStart}
        onCollapseEnd={onCollapseEnd}
      >
        {({ transitionStyle, transitionState }) =>
          this.renderPageWrapper({
            disableInteraction: isResizing || isTransitioning(transitionState),
            transitionStyle,
          })
        }
      </ResizeTransition>
    );
  }
}
