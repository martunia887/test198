import * as React from 'react';
import { ButtonTheme as AdgButtonTheme } from '@atlaskit/button';
import { ThemeProps, ThemeTokens } from '@atlaskit/button/dist/es5/types';
import { colors } from './colors';

export interface ButtonThemeProps extends ThemeProps {
  appearance:
    | 'default'
    | 'danger'
    | 'link'
    | 'primary'
    | 'subtle'
    | 'subtle-link';
  state: 'default' | 'hover' | 'active';
}

const button = {
  background: {
    default: {
      default: colors.N30,
      hover: colors.N40,
      active: colors.N800,
    },
    primary: {
      default: colors['green-600'],
      hover: colors['green-700'],
      active: colors['green-800'],
    },
    subtle: {
      default: colors.N20A,
      hover: colors.N30A,
      active: colors.N50A,
    },
    link: {
      default: 'none',
      hover: colors.N30A,
      active: colors.N50A,
    },
    'subtle-link': {
      default: 'none',
      hover: colors.N30A,
      active: colors.N50A,
    },
    danger: {
      default: colors['red-600'],
      hover: colors['red-700'],
      active: colors['red-800'],
    },
    disabled: colors.N30,
  },
  boxShadow: {
    default: {
      default: `0 1px 0 0 ${colors.N40A}`,
      hover: `0 1px 0 0 ${colors.N50A}`,
      active: 'none',
    },
    primary: `0 1px 0 0 ${colors['green-900']}`,
    subtle: 'none',
    link: 'none',
    'subtle-link': 'none',
    danger: `0 1px 0 0 ${colors['red-900']}`,
    disabled: 'none',
  },
  fontWeight: {
    default: 'bold',
    primary: 'bold',
    danger: 'bold',
    subtle: 'normal',
    link: 'normal',
    'subtle-link': 'normal',
    disabled: 'normal',
  },
  color: {
    default: {
      default: colors.N800,
      hover: colors.N800,
      active: colors.N0,
    },
    primary: colors.N0,
    subtle: colors.N800,
    link: colors.N800,
    'subtle-link': colors.N200,
    danger: colors.N0,
    disabled: colors.N200,
  },
  border: 'none',
  cursor: {
    default: 'pointer',
    disabled: 'not-allowed',
  },
};

const getBackground = ({ appearance, state, isDisabled }: ButtonThemeProps) => {
  if (isDisabled) return button.background.disabled;
  if (appearance && !(appearance in button.background)) {
    return button.background.default[state];
  }
  return button.background[appearance][state];
};

const getBoxShadow = ({
  state,
  appearance,
  isLoading,
  isDisabled,
}: ButtonThemeProps) => {
  if (isDisabled) return button.boxShadow.disabled;
  if (isLoading) return 'none';
  if (appearance === 'default') return button.boxShadow[appearance][state];
  return button.boxShadow[appearance];
};

const getFontWeight = ({ appearance, isDisabled }: ButtonThemeProps) => {
  if (isDisabled) return button.fontWeight.disabled;
  if (appearance in button.fontWeight) return button.fontWeight[appearance];
  return button.fontWeight.default;
};

const getCursor = ({ isDisabled }: ThemeProps) => {
  if (isDisabled) return button.cursor.disabled;
  return button.cursor.default;
};

const getColor = ({ appearance, state, isDisabled }: ButtonThemeProps) => {
  if (isDisabled) return button.color.disabled;
  if (appearance === 'default') {
    if (!(state in button.color.default)) {
      return button.color.default.default;
    }
    return button.color.default[state];
  }
  if (!button.color[appearance]) {
    return button.color.default.default;
  }
  return button.color[appearance];
};

const getButtonStyles = (props: ButtonThemeProps) => ({
  border: button.border,
  background: getBackground(props),
  boxShadow: getBoxShadow(props),
  color: getColor(props),
  cursor: getCursor(props),
  fontWeight: getFontWeight(props),
  textDecoration: props.appearance === 'link' ? 'underline' : 'none',
});

const theme = (
  adgTheme: Function,
  { appearance = 'default', state = 'default', ...rest }: ThemeProps,
): ThemeTokens => {
  const {
    buttonStyles: adgButtonStyles,
    spinnerStyles: adgSpinnerStyles,
    iconStyles: adgIconStyles,
  } = adgTheme({ appearance, state, ...rest });

  return {
    buttonStyles: {
      ...adgButtonStyles,
      ...getButtonStyles({ appearance, state, ...rest } as ButtonThemeProps),
    },
    spinnerStyles: {
      ...adgSpinnerStyles,
    },
    iconStyles: {
      ...adgIconStyles,
    },
  };
};

export const Theme = {
  Provider: (props: ThemeProps) => (
    <AdgButtonTheme.Provider value={theme} {...props} />
  ),
};

export default theme;
