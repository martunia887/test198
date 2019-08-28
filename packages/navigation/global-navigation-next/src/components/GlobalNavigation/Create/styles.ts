import styled from '@emotion/styled';
import { colors, gridSize as gridSizeFn, fontSizeSmall } from '@atlaskit/theme';
import { CREATE_BREAKPOINT } from '../../../common/constants';
import { GlobalSkeletonSyles } from '../../../common/styled';

const gridSize = gridSizeFn();

const createItemHeight = gridSize * 4;

const buttonOverrides = {
  backgroundColor: colors.B75,
  color: colors.B500,
  fontSize: fontSizeSmall(),
  fontWeight: 'bold',
  height: createItemHeight,
  textTransform: 'uppercase',
};

export const buttonTheme: any = (
  currentTheme: Function,
  themeProps: { appearance: string },
) => {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      ...buttonOverrides,
    },
    spinnerStyles,
  };
};

export const CreateButtonSkeleton = styled.div`
  width: ${gridSize * 8}px;
  height: ${createItemHeight}px;
  border-radius: ${gridSize}px;
  ${GlobalSkeletonSyles}

  @media (max-width: ${CREATE_BREAKPOINT}px) {
    display: none;
  }
`;

export const CreateIconSkeleton = styled.div`
  width: ${createItemHeight}px;
  height: ${createItemHeight}px;
  border-radius: ${createItemHeight / 2}px;
  ${GlobalSkeletonSyles}

  @media (min-width: ${CREATE_BREAKPOINT}px) {
    display: none;
  }
`;
