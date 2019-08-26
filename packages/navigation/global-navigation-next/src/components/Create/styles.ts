import { colors, gridSize as gridSizeFn, fontSizeSmall } from '@atlaskit/theme';
import { css } from '@emotion/core';
import {
  actionSectionDesktopStyles,
  actionSectionMobileStyles,
} from '../../common/styles';

const gridSize = gridSizeFn();

const buttonOverrides = {
  backgroundColor: colors.B75,
  color: colors.B500,
  fontSize: fontSizeSmall(),
  fontWeight: 'bold',
  height: gridSize * 4,
  textTransform: 'uppercase',
};

export const createButtonStyles = css`
  ${actionSectionDesktopStyles};
  flex-shrink: 0;
`;

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

export const createIconStyles = css`
  ${actionSectionMobileStyles};
`;
