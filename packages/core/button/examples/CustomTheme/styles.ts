import { colors } from '@atlaskit/theme';
import { customColors } from './colors';
import { ThemeProps } from '../../src/types';

export const button = {
  background: {
    default: {
      default: colors.N30,
      hover: colors.N40,
      active: colors.N50,
    },
    primary: {
      default: customColors['sky-600'],
      hover: customColors['sky-700'],
      active: customColors['sky-800'],
    },
    subtle: {
      default: colors.N20A,
      hover: colors.N30A,
      active: colors.N50A,
    },
    danger: {
      default: customColors['red-600'],
      hover: customColors['red-700'],
      active: customColors['red-800'],
    },
    disabled: colors.N30,
  },
  boxShadow: {
    default: {
      default: `1px 2px 0 0 ${colors.N40A}`,
      hover: `1px 2px 0 0 ${colors.N50A}`,
      active: '0px 0px 0 0',
    },
    primary: {
      default: `1px 2px 0 0 ${customColors['sky-700']}`,
      hover: `1px 2px 0 0 ${customColors['sky-800']}`,
      active: '0px 0px 0 0',
    },
    danger: {
      default: `1px 2px 0 0 ${customColors['red-800']}`,
      hover: `1px 2px 0 0 ${customColors['red-900']}`,
      active: '0px 0px 0 0',
    },
    subtle: 'none',
    disabled: 'none',
  },
  borderColor: {
    default: {
      default: colors.N40A,
      hover: colors.N50A,
      active: colors.N900,
    },
    primary: {
      default: customColors['sky-900'],
      hover: customColors['sky-900'],
      active: customColors['sky-900'],
    },
    danger: {
      default: customColors['red-900'],
      hover: customColors['red-900'],
      active: customColors['red-900'],
    },
  },
  fontWeight: {
    default: '700',
    subtle: 'normal',
    disabled: 'normal',
  },
  color: {
    default: colors.N700,
    primary: colors.N0,
    subtle: colors.N700,
    danger: colors.N0,
    disabled: colors.N70,
  },
  border: 'none',
  cursor: {
    default: 'pointer',
    disabled: 'not-allowed',
  },
  transform: {
    default: {
      default: 'initial',
      active: 'translateY(2px) translateX(1px)',
    },
    disabled: 'initial',
  },
  transition: {
    default:
      'background 0.1s ease-out, box-shadow 0.1s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0.1s',
    active:
      'background 0s ease-out, box-shadow 0s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0s',
  },
  padding: '0px 15px',
  borderRadius: '15px',
};

const getBackground = (background, { appearance, state }) => {
  if (appearance === 'disabled') return background[appearance];

  if (!background[appearance]) {
    return background.default[state];
  }
  return background[appearance][state];
};

const getBoxShadow = (boxShadow, { appearance, state }) => {
  if (boxShadow[appearance][state]) return boxShadow[appearance][state];
  return boxShadow[appearance];
};

const getBorderColor = (borderColor, { appearance, state }) => {
  if (!borderColor[appearance] || !borderColor[appearance][state]) {
    return borderColor.default.default;
  }
  return borderColor[appearance][state];
};

const getFontWeight = (fontWeight, { appearance }) => {
  if (!fontWeight[appearance]) return fontWeight.default;
  return fontWeight[appearance];
};

const getCursor = (cursor, { appearance }) => {
  if (!cursor[appearance]) return cursor.default;
  return cursor[appearance];
};

const getColor = (color, { appearance }) => {
  if (!color[appearance]) {
    return color.default.default;
  }
  return color[appearance];
};

const getTransform = (transform, { appearance, state }) => {
  if (appearance === 'disabled') return transform[appearance];
  return transform['default'][state];
};

const getTransition = (transition, { appearance, state }) => {
  if (appearance === 'disabled') return transition[appearance];
  return transition['default'][state];
};

export default (props: ThemeProps) => ({
  border: button.border,
  background: getBackground(button.background, props),
  borderColor: getBorderColor(button.borderColor, props),
  borderRadius: button.borderRadius,
  boxShadow: getBoxShadow(button.boxShadow, props),
  color: getColor(button.color, props),
  cursor: getCursor(button.cursor, props),
  fontWeight: getFontWeight(button.fontWeight, props),
  padding: button.padding,
  transform: getTransform(button.transform, props),
  transition: getTransition(button.transition, props),
});
