// @flow
import styled from '@emotion/styled';

import { gridSize, math } from '@atlaskit/theme';

const SkeletonGlobalIconOuter = styled.div`
  margin-bottom: ${math.divide(gridSize, 2)}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

SkeletonGlobalIconOuter.displayName = 'SkeletonGlobalIconOuter';
export default SkeletonGlobalIconOuter;
