import { createTheme, colors } from '@atlaskit/theme';
import memoize from 'memoize-one';
import { ComponentTokens, EvaluatedTokens } from '../types';

export const componentTokens: ComponentTokens = {
  label: {
    textColor: {
      rest: { light: colors.N900, dark: colors.DN600 },
      disabled: { light: colors.N80, dark: colors.N80 },
    },
  },
  icon: {
    borderColor: {
      rest: { light: colors.N40, dark: colors.DN80 },
      disabled: { light: '', dark: '' },
      checked: { light: 'currentColor', dark: 'currentColor' },
      active: { light: 'currentColor', dark: 'currentColor' },
      invalid: { light: colors.R300, dark: colors.R300 },
      focused: { light: colors.B100, dark: colors.B75 },
      hovered: { light: colors.N40, dark: colors.DN200 },
    },
    boxColor: {
      rest: { light: colors.N10, dark: colors.DN10 },
      disabled: { light: colors.N20, dark: colors.DN10 },
      active: { light: colors.B50, dark: colors.B200 },
      hoveredAndChecked: { light: colors.B300, dark: colors.B75 },
      hovered: { light: colors.N30, dark: colors.DN30 },
      checked: { light: colors.B400, dark: colors.B400 },
    },
    tickColor: {
      rest: { light: 'transparent', dark: 'transparent' },
      disabledAndChecked: { light: colors.N70, dark: colors.DN90 },
      activeAndChecked: { light: colors.B400, dark: colors.DN10 },
      checked: { light: colors.N10, dark: colors.DN10 },
    },
    size: 'medium',
  },
};

const evaluateMode = memoize((obj, mode) => {
  function traverse(obj) {
    return Object.keys(obj).reduce((acc, curr) => {
      const value = obj[curr];
      if (typeof value !== 'object') {
        acc[curr] = value;
      } else if (Object.keys(value).includes(mode)) {
        acc[curr] = value[mode];
      } else {
        acc[curr] = traverse(obj[curr]);
      }
      return acc;
    }, {});
  }
  return traverse(obj);
});

const defaultThemeFn = ({
  tokens,
  mode,
}: {
  tokens: ComponentTokens;
  mode: 'light' | 'dark';
}): EvaluatedTokens => {
  return evaluateMode(tokens, mode);
};

export default createTheme(defaultThemeFn);
