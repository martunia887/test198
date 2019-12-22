// @flow
import React from 'react';
import { Skeleton as SkeletonIcon } from '@atlaskit/icon';

import SkeletonGlobalIconOuter from './styled/SkeletonGlobalIconOuter';
import SkeletonNavigationItems from './styled/SkeletonNavigationItems';

const SkeletonGlobalBottomItems = () => (
  <SkeletonNavigationItems>
    <SkeletonGlobalIconOuter>
      <SkeletonIcon size="medium" />
    </SkeletonGlobalIconOuter>
    <SkeletonGlobalIconOuter>
      <SkeletonIcon size="large" weight="strong" />
    </SkeletonGlobalIconOuter>
  </SkeletonNavigationItems>
);

SkeletonGlobalBottomItems.displayName = 'SkeletonGlobalBottomItems';
export default SkeletonGlobalBottomItems;
