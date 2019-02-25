import { ThemeProps } from '@atlaskit/button';
import { colors } from './colors';

const textField = {
  backgroundColor: {
    standard: {
      default: colors.N10,
      hover: colors.N30,
      focus: colors.N0,
    },
    disabled: colors.N30,
  },
  borderColor: {
    standard: {
      default: colors.N40,
      hover: colors.N40,
      focus: colors['blue-500'],
    },
    disabled: 'none',
  },
  color: {
    default: {
      default: colors.N800,
    },
    disabled: colors.N70,
  },
  padding: '6px 10px',
  lineHeight: '20px',
  cursor: {
    default: 'initial',
    disabled: 'not-allowed',
  },
};

const getBackgroundColor = (
  backgroundColor,
  { appearance, isDisabled, isFocused, isInvalid },
) => {
  if (isDisabled) return backgroundColor.disabled;
  if (isFocused) return backgroundColor[appearance].focus;
  if (!backgroundColor[appearance]) {
    return backgroundColor.standard['default'];
  }
  return backgroundColor[appearance]['default'];
};

const getBorderColor = (
  borderColor,
  { appearance, isDisabled, isFocused, isInvalid },
) => {
  if (isDisabled) return borderColor.disabled;
  if (isFocused) return borderColor[appearance].focus;
  if (!borderColor[appearance]) {
    return borderColor.standard['default'];
  }
  return borderColor[appearance]['default'];
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

const getCursor = (cursor, { isDisabled }) => {
  if (isDisabled) return cursor.disabled;
  return cursor.default;
};

const getTextFieldStyles = (props: typeof ThemeProps) => {
  // return original ADG styles (any way to do this at property level?)
  if (props.isInvalid) return {};
  return {
    borderColor: getBorderColor(textField.borderColor, props),
    backgroundColor: getBackgroundColor(textField.backgroundColor, props),
    color: getColor(textField.color, props),
    cursor: getCursor(textField.cursor, props),
    lineHeight: textField.lineHeight,
    padding: textField.padding,
  };
};

const theme = (
  adgTheme: Function,
  { appearance = 'default', state = 'default', ...rest }: typeof ThemeProps,
) => {
  const { container: adgContainerStyles, input: adgInputStyles } = adgTheme({
    appearance,
    state,
    ...rest,
  });

  return {
    container: {
      ...adgContainerStyles,
      ...getTextFieldStyles({ appearance, state, ...rest }),
    },
    input: {
      ...adgInputStyles,
    },
  };
};

export default theme;
