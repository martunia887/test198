import { colors, gridSize as gridSizeFn, fontSizeSmall } from '@atlaskit/theme';
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

export const createButtonStyles = actionSectionDesktopStyles;

export const createIconStyles = actionSectionMobileStyles;
