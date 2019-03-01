// @flow
import styled from '@emotion/styled';

import {
  standardOpenWidth,
  containerClosedWidth,
} from '../../../../shared-variables';

const SkeletonNavigationOuter = styled.div`
  width: ${({ isCollapsed }) =>
    isCollapsed ? containerClosedWidth() : standardOpenWidth}px;
  height: 100vh;
`;

SkeletonNavigationOuter.displayName = 'SkeletonNavigationOuter';
export default SkeletonNavigationOuter;
