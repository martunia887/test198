// @flow

import React from 'react';

import type { LayoutManagerWithViewControllerProps } from './types';
import { ItemsRendererLite } from '../../../renderer';
import SkeletonContainerView from '../../presentational/SkeletonContainerView';
import { AsyncLayoutManagerWithViewControllerLite } from '../AsyncLayoutManagerWithViewController';
/* NOTE: experimental props use an underscore */
/* eslint-disable camelcase */

export const LayoutManagerWithViewControllerLite = ({
  children,
  firstSkeletonToRender,
  customComponents,
  experimental_alternateFlyoutBehaviour,
  experimental_flyoutOnHover,
  experimental_fullWidthFlyout,
  experimental_hideNavVisuallyOnCollapse,
  experimental_horizontalGlobalNav,
  globalNavigation,
  onExpandStart,
  onExpandEnd,
  onCollapseStart,
  onCollapseEnd,
  getRefs,
  topOffset,
  shouldHideGlobalNavShadow,
}: LayoutManagerWithViewControllerProps) => {
  return (
    <AsyncLayoutManagerWithViewControllerLite
      onExpandStart={onExpandStart}
      onExpandEnd={onExpandEnd}
      onCollapseStart={onCollapseStart}
      onCollapseEnd={onCollapseEnd}
      getRefs={getRefs}
      customComponents={customComponents}
      experimental_flyoutOnHover={!!experimental_flyoutOnHover}
      experimental_alternateFlyoutBehaviour={
        !!experimental_alternateFlyoutBehaviour
      }
      experimental_hideNavVisuallyOnCollapse={
        !!experimental_hideNavVisuallyOnCollapse
      }
      experimental_fullWidthFlyout={!!experimental_fullWidthFlyout}
      experimental_horizontalGlobalNav={!!experimental_horizontalGlobalNav}
      globalNavigation={globalNavigation}
      containerSkeleton={() =>
        firstSkeletonToRender ? (
          <SkeletonContainerView type={firstSkeletonToRender} />
        ) : null
      }
      itemsRenderer={ItemsRendererLite}
      firstSkeletonToRender={firstSkeletonToRender}
      topOffset={topOffset}
      shouldHideGlobalNavShadow={shouldHideGlobalNavShadow}
    >
      {children}
    </AsyncLayoutManagerWithViewControllerLite>
  );
};
