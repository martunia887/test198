import { colors } from '@atlaskit/theme';
import { nachosColors } from './colors';

type NachosBase = {
  padding: string;
  lineHeight: string;
  height: string;
};

export const nachosBase: NachosBase = {
  padding: '6px 12px',
  lineHeight: '20px',
  height: '32px',
};

export const button = {
  background: {
    default: {
      default: colors.N30,
      hover: colors.N40,
      active: colors.N800,
    },
    primary: {
      default: nachosColors['green-600'],
      hover: nachosColors['green-700'],
      active: nachosColors['green-800'],
    },
    subtle: {
      default: colors.N20A,
      hover: colors.N30A,
      active: colors.N50A,
    },
    danger: {
      default: nachosColors['red-600'],
      hover: nachosColors['red-700'],
      active: nachosColors['red-800'],
    },
    disabled: colors.N30,
  },
  boxShadow: {
    default: {
      default: `0 1px 0 0 ${colors.N40A}`,
      hover: `0 1px 0 0 ${colors.N50A}`,
      active: 'none',
    },
    primary: `0 1px 0 0 ${nachosColors['green-900']}`,
    subtle: 'none',
    danger: `0 1px 0 0 ${nachosColors['red-900']}`,
    disabled: 'none',
  },
  borderColor: {
    default: {
      default: colors.N40A,
      hover: colors.N50A,
      active: colors.N900,
    },
    primary: {
      default: nachosColors['green-900'],
      hover: nachosColors['green-900'],
      active: nachosColors['green-900'],
    },
    danger: {
      default: nachosColors['red-900'],
      hover: nachosColors['red-900'],
      active: nachosColors['red-900'],
    },
  },
  fontWeight: {
    default: 'bold',
    subtle: 'normal',
    disabled: 'normal',
  },
  color: {
    default: {
      default: colors.N700,
      active: colors.N0,
    },
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
};

const getBackground = (background, { appearance, state }) => {
  if (appearance === 'disabled') return background[appearance];
  return background[appearance][state];
};

const getBoxShadow = (boxShadow, { appearance, state }) => {
  if (appearance === 'default') return boxShadow[appearance][state];
  return boxShadow[appearance];
};

const getBorderColor = (borderColor, { appearance, state }) =>
  borderColor[appearance][state];

const getfontWeight = (fontWeight, { appearance, state }) => fontWeight[state];

const getCursor = (cursor, { state }) => cursor[state];

const getColor = (color, { appearance, state }) => {
  if (appearance === 'default') return color[appearance][state];
  return color[appearance];
};

export const getButtonStyles = props => ({
  border: button.border,
  background: getBackground(button.background, props),
  borderColor: getBorderColor(button.borderColor, props),
  boxShadow: getBoxShadow(button.boxShadow, props),
  color: getColor(button.color, props),
  cursor: getCursor(button.cursor, props),
  fontWeight: getfontWeight(button.fontWeight, props),
});
