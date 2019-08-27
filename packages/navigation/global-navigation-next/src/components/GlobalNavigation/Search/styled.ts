import { colors, fontSize, gridSize as gridSizeFn } from '@atlaskit/theme';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { GlobalSkeletonSyles } from '../../../common/styled';

const gridSize = gridSizeFn();

const SearchInputCommon = css`
  width: 220px;
  height: ${gridSize * 4}px;
  background: ${colors.B400};
  outline: none;
  border-radius: ${gridSize * 2}px;
  border: none;
  box-sizing: border-box;
  padding: 0 ${gridSize}px 0 40px;
`;

export const SearchInput = styled.input`
  ${SearchInputCommon}
  background: ${colors.B400};
  color: ${colors.B50};
  font-size: ${fontSize()}px;
  ::placeholder {
    color: ${colors.B50};
  }
`;

export const SearchInputSkeleton = styled.div`
  ${SearchInputCommon}
  ${GlobalSkeletonSyles}
`;

export const SearchWrapper = styled.div`
  margin-left: 20px;
  padding-right: ${gridSize}px;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 5px;
  width: 20px;
  height: 20px;
  pointer-events: none;
`;
