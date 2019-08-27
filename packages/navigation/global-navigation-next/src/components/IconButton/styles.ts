import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';

const gridSize = gridSizeFn();

export const iconButtonTheme: any = (
  currentTheme: Function,
  themeProps: { appearance: string },
) => {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      backgroundColor: 'transparent',
      color: colors.B50,
      display: 'inline-flex',
      height: gridSize * 4,
      marginLeft: gridSize / 2,
      padding: gridSize / 2,
      ':hover, :focus': {
        backgroundColor: colors.B400,
      },
    },
    spinnerStyles,
  };
};
