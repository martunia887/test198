import { colors } from '@atlaskit/theme';
import { nachosColors } from './colors';

type Theme = { [key: string]: string | Theme };
type ThemeStructure = { [key: string]: any[] | null };
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

export const buttonTheme = {
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

export const getButtonStyles = (props: { [key: string]: any }) => {
  const buttonThemeStructure = {
    background: [props.appearance, props.state],
    borderColor: [props.appearance, props.state],
    boxShadow: [props.appearance, props.state],
    color: [props.appearance, props.state],
    cursor: [props.state],
    fontWeight: [props.appearance, props.state],
    border: null,
  };

  return themeReduce(
    Object.keys(buttonThemeStructure),
    buttonThemeStructure,
    buttonTheme,
  );
};

function getStyle(
  current: Theme | string,
  structure: any[] | null,
  depth: number = 0,
): string | null {
  // If the theme is just a string, return that
  if (typeof current === 'string') return current;
  // return null if nothing else is present. Should the default be returned instead?
  if (!structure || !current[structure[depth]]) return null;
  // Move down the styling tree and see if a leaf is reached
  const n = current[structure[depth]];
  return typeof n === 'string' ? n : getStyle(n, structure, depth + 1);
}

const initialTokens: { [key: string]: string } = {};
export const themeReduce = (
  properties: string[],
  themeStructure: ThemeStructure,
  theme: Theme,
) =>
  properties.reduce((acc, p) => {
    const result = getStyle(theme[p], themeStructure[p]);
    if (result) acc[p] = result;
    return acc;
  }, initialTokens);
