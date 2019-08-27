import styled from '@emotion/styled';
import { colors, gridSize as gridSizeFn, fontSizeSmall } from '@atlaskit/theme';
import { GlobalSkeletonSyles } from '../../../common/styled';

const gridSize = gridSizeFn();

const buttonOverrides = {
  backgroundColor: colors.B75,
  color: colors.B500,
  fontSize: fontSizeSmall(),
  fontWeight: 'bold',
  height: gridSize * 4,
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
  height: ${gridSize * 4}px;
  border-radius: ${gridSize}px;
  ${GlobalSkeletonSyles}
`;

export const CreateIconSkeleton = styled.div`
  width: ${gridSize * 4}px;
  height: ${gridSize * 4}px;
  border-radius: ${(gridSize * 4) / 2}px;
  ${GlobalSkeletonSyles}
`;
