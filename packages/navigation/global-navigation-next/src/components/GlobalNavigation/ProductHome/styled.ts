import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { GlobalSkeletonSyles } from '../../../common/styled';
import { PRODUCT_HOME_BREAKPOINT } from '../../../common/constants';
import styled from '@emotion/styled';

const gridSize = gridSizeFn();

const wordmarkHeight = gridSize * 3.5;
const iconHeight = gridSize * 4.75;

export const Outer = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  margin-right: ${gridSize * 3}px;
`;

export const IconSkeleton = styled.div`
  width: ${iconHeight}px;
  height: ${iconHeight}px;
  border-radius: 50%;
  ${GlobalSkeletonSyles}
`;

export const WordmarkSkeleton = styled.div`
  width: ${gridSize * 20}px;
  height: ${wordmarkHeight}px;
  border-radius: ${wordmarkHeight / 2}px;
  margin-left: ${gridSize * 2}px;
  ${GlobalSkeletonSyles}

  @media (max-width: ${PRODUCT_HOME_BREAKPOINT}px) {
    display: none;
  }
`;
