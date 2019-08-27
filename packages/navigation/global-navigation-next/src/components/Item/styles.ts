import { ItemProps } from './types';
import { colors, fontSizeSmall, gridSize as gridSizeFn } from '@atlaskit/theme';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { GlobalSkeletonSyles } from '../../common/styled';

const gridSize = gridSizeFn();

const baseStyles = {
  background: 'none',
  border: 'none',
  borderRadius: 3,
  boxSizing: 'border-box',
  position: 'relative',
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover,:focus': {
    backgroundColor: colors.B400,
  },
};

export const getStyles = (props: ItemProps) => ({
  itemBase: {
    primary: {
      ...baseStyles,
      alignItems: 'center',
      display: 'flex',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: fontSizeSmall(),
      position: 'relative',
      height: gridSize * 3,
      lineHeight: 1,
      userSelect: 'none',
      color: colors.N0,
      margin: `20px 0`,
      marginRight: props.dropdownContent ? gridSize * 1.5 : gridSize * 3,
      padding: `0 ${gridSize}px`,
    },
    secondary: {
      ...baseStyles,
      color: colors.B50,
      display: 'inline-flex',
      height: gridSize * 4,
      padding: gridSize / 2,
      marginLeft: gridSize / 2,
    },
    profile: {
      ...baseStyles,
      color: colors.B50,
      display: 'inline-flex',
      padding: gridSize / 2,
      marginLeft: gridSize / 2,
      ':hover,:focus': {
        background: 'none',
      },
    },
  },
  contentWrapper: {},
});

const platformItemHeight = gridSize * 3.25;
const profileItemHeight = gridSize * 4.25;

const ItemSkeletonCommon = css`
  border: none;
  box-sizing: 'border-box';
  ${GlobalSkeletonSyles}
`;

export const ProductItemSkeleton = styled.div`
  border-radius: 6px;
  position: relative;
  align-items: center;
  display: flex;
  width: ${gridSize * 6}px;
  height: ${gridSize * 2.5}px;
  margin: 30px 0px;
  margin-right: ${gridSize * 3}px;
  padding: ${`0 ${gridSize}`}px;
  ${ItemSkeletonCommon}
`;

export const PlatformItemSkeleton = styled.div`
  border-radius: ${platformItemHeight / 2}px;
  position: relative;
  display: inline-flex;
  width: ${platformItemHeight}px;
  height: ${platformItemHeight}px;
  margin-left: ${gridSize * 1.25}px;
  ${ItemSkeletonCommon}
`;

export const ProfileItemSkeleton = styled.div`
  border-radius: ${profileItemHeight / 2}px;
  position: relative;
  display: inline-flex;
  width: ${profileItemHeight}px;
  height: ${profileItemHeight}px;
  margin: 0px ${gridSize / 1.5}px;
  margin-left: ${gridSize * 1.5}px;
  ${ItemSkeletonCommon}
`;
