import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { GlobalSkeletonSyles } from '../../../common/styled';
import styled from '@emotion/styled';

const gridSize = gridSizeFn();

export const Outer = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  margin-right: ${gridSize * 3}px;
`;

export const IconSkeleton = styled.div`
  width: ${gridSize * 4.75}px;
  height: ${gridSize * 4.75}px;
  border-radius: 50%;
  ${GlobalSkeletonSyles}
`;

export const WordmarkSkeleton = styled.div`
  width: ${gridSize * 20}px;
  height: ${gridSize * 3.5}px;
  border-radius: ${(gridSize * 3.5) / 2}px;
  margin-left: ${gridSize * 2}px;
  ${GlobalSkeletonSyles}
`;
