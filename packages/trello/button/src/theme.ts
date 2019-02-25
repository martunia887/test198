import { ThemeProps } from '@atlaskit/button';
import { colors } from './colors';

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
    subtle: 'normal',
    link: 'normal',
    'subtle-link': 'normal',
    disabled: 'normal',
  },
  color: {
    default: {
      default: colors.N800,
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

const getBackground = (background, { appearance, state, isDisabled }) => {
  if (isDisabled) return background.disabled;
  if (!background[appearance]) {
    return background.default[state];
  }
  return background[appearance][state];
};

const getBoxShadow = (
  boxShadow,
  { state, appearance, isLoading, isDisabled },
) => {
  if (isDisabled) return boxShadow.disabled;
  if (isLoading) return 'none';
  if (appearance === 'default') return boxShadow[appearance][state];
  return boxShadow[appearance];
};

const getFontWeight = (fontWeight, { appearance, isDisabled }) => {
  if (isDisabled) return fontWeight.disabled;
  if (!fontWeight[appearance]) return fontWeight.default;
  return fontWeight[appearance];
};

const getCursor = (cursor, { isDisabled }) => {
  if (isDisabled) return cursor.disabled;
  return cursor.default;
};

const getColor = (color, { appearance, state, isDisabled }) => {
  if (isDisabled) return color.disabled;
  if (appearance === 'default') {
    if (!color[appearance][state]) {
      return color.default.default;
    }
    return color[appearance][state];
  }
  if (!color[appearance]) {
    return color.default.default;
  }
  return color[appearance];
};

const getButtonStyles = (props: typeof ThemeProps) => ({
  border: button.border,
  background: getBackground(button.background, props),
  boxShadow: getBoxShadow(button.boxShadow, props),
  color: getColor(button.color, props),
  cursor: getCursor(button.cursor, props),
  fontWeight: getFontWeight(button.fontWeight, props),
  textDecoration: props.appearance === 'link' ? 'underline' : 'none',
});

const theme = (
  adgTheme: Function,
  { appearance = 'default', state = 'default', ...rest }: typeof ThemeProps,
) => {
  const {
    buttonStyles: adgButtonStyles,
    spinnerStyles: adgSpinnerStyles,
    iconStyles: adgIconStyles,
  } = adgTheme({ appearance, state, ...rest });

  return {
    buttonStyles: {
      ...adgButtonStyles,
      ...getButtonStyles({ appearance, state, ...rest }),
    },
    spinnerStyles: {
      ...adgSpinnerStyles,
    },
    iconStyles: {
      ...adgIconStyles,
    },
  };
};

export default theme;
