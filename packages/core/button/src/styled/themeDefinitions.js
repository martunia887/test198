// @flow
import { colors, themed } from '@atlaskit/theme';
import { colorTokens } from '@atlaskit/design-tokens';
/* eslint-enable no-bitwise */
/**
 * Convert a hex colour code to RGBA.
 * @param {String} hex Hex colour code.
 * @param {Number} alpha Optional alpha value (defaults to 1).
 *
 */
/* eslint-disable no-bitwise */
export const hex2rgba = (hex: string, alpha: number = 1) => {
  let color;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split('');

    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }

    color = `0x${color.join('')}`;

    // $FlowFixMe - `>>` oxperand can validly take a string value
    const r = (color >> 16) & 255;
    // $FlowFixMe - `>>` operand can validly take a string value
    const g = (color >> 8) & 255;
    // $FlowFixMe - `>>` operand can validly take a string value
    const b = color & 255;

    return `rgba(${[r, g, b].join(',')}, ${alpha})`;
  }

  throw new Error('Bad Hex');
};

export default {
  // Fallbacks
  fallbacks: {
    background: themed({ light: colors.N20A, dark: colors.DN70 }),
    color: themed({ light: colors.N400, dark: colors.DN400 }),
    textDecoration: 'none',
  },

  // Themes
  theme: {
    // Default appearance
    default: {
      background: {
        default: themed({ light: colors.N20A, dark: colors.DN70 }),
        hover: themed({
          light: colorTokens.colorNeutralBackgroundHover,
          dark: colors.DN60,
        }),
        active: themed({
          light: colorTokens.colorNeutralBackgroundActive,
          dark: colors.B75,
        }),
        disabled: themed({
          light: colorTokens.colorNeutralBackgroundDisabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: colorTokens.colorNeutralBackgroundSelected,
          dark: colors.DN0,
        }),
        focusSelected: themed({
          light: colorTokens.colorNeutralBackgroundSelected,
          dark: colors.DN0,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: colorTokens.colorNeutralBoxshadowFocus,
          dark: colors.B75,
        }),
        focusSelected: themed({
          light: colorTokens.colorNeutralBoxshadowFocus,
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({
          light: colorTokens.colorNeutralTextResting,
          dark: colors.DN400,
        }),
        active: themed({
          light: colorTokens.colorNeutralTextActive,
          dark: colors.B400,
        }),
        disabled: themed({
          light: colorTokens.colorNeutralTextDisabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: colorTokens.colorNeutralTextSelected,
          dark: colors.DN400,
        }),
        focusSelected: themed({
          light: colorTokens.colorNeutralTextSelected,
          dark: colors.DN400,
        }),
      },
    },

    // Primary appearance
    primary: {
      background: {
        default: themed({
          light: colorTokens.colorPrimaryBackgroundResting,
          dark: colors.B100,
        }),
        hover: themed({
          light: colorTokens.colorPrimaryBackgroundHover,
          dark: colors.B75,
        }),
        active: themed({
          light: colorTokens.colorPrimaryBackgroundActive,
          dark: colors.B200,
        }),
        disabled: themed({
          light: colorTokens.colorPrimaryBackgroundDisabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: colorTokens.colorPrimaryBackgroundSelected,
          dark: colors.DN0,
        }),
        focusSelected: themed({
          light: colorTokens.colorPrimaryBackgroundSelected,
          dark: colors.DN0,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: colorTokens.colorPrimaryBoxshadowFocus,
          dark: colors.B75,
        }),
        focusSelected: themed({
          light: colorTokens.colorPrimaryBoxshadowFocus,
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({
          light: colorTokens.colorPrimaryTextResting,
          dark: colors.DN30,
        }),
        disabled: themed({
          light: colorTokens.colorPrimaryTextDisabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: colorTokens.colorPrimaryTextSelected,
          dark: colors.DN400,
        }),
        focusSelected: themed({
          light: colorTokens.colorPrimaryTextSelected,
          dark: colors.DN400,
        }),
      },
    },

    // Warning appearance
    warning: {
      background: {
        default: themed({
          light: colorTokens.colorWarningBackgroundResting,
          dark: colors.Y300,
        }),
        hover: themed({
          light: colorTokens.colorWarningBackgroundHover,
          dark: colors.Y200,
        }),
        active: themed({
          light: colorTokens.colorWarningBackgroundActive,
          dark: colors.Y400,
        }),
        disabled: themed({
          light: colorTokens.colorWarningBackgroundDisabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: colorTokens.colorWarningBackgroundSelected,
          dark: colors.Y400,
        }),
        focusSelected: themed({
          light: colorTokens.colorWarningBackgroundSelected,
          dark: colors.Y400,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: colorTokens.colorWarningBoxshadowFocus,
          dark: colors.Y500,
        }),
        focusSelected: themed({
          light: colorTokens.colorWarningBoxshadowFocus,
          dark: colors.Y500,
        }),
      },
      color: {
        default: themed({
          light: colorTokens.colorWarningTextResting,
          dark: colors.N800,
        }),
        disabled: themed({
          light: colorTokens.colorWarningTextDisabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: colorTokens.colorWarningTextSelected,
          dark: colors.N800,
        }),
        focusSelected: themed({
          light: colorTokens.colorWarningTextSelected,
          dark: colors.N800,
        }),
      },
    },

    // Danger appearance
    danger: {
      background: {
        default: themed({
          light: colorTokens.colorCriticalBackgroundResting,
          dark: colors.R400,
        }),
        hover: themed({
          light: colorTokens.colorCriticalBackgroundHover,
          dark: colors.R300,
        }),
        active: themed({
          light: colorTokens.colorCriticalBackgroundActive,
          dark: colors.R500,
        }),
        disabled: themed({
          light: colorTokens.colorCriticalBackgroundDisabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: colorTokens.colorCriticalBackgroundSelected,
          dark: colors.R500,
        }),
        focusSelected: themed({
          light: colorTokens.colorCriticalBackgroundActive,
          dark: colors.R500,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: colorTokens.colorCriticalBoxshadowFocus,
          dark: colors.R100,
        }),
        focusSelected: themed({
          light: colorTokens.colorCriticalBoxshadowFocus,
          dark: colors.R100,
        }),
      },
      color: {
        default: themed({
          light: colorTokens.colorCriticalTextResting,
          dark: colors.N0,
        }),
        disabled: themed({
          light: colorTokens.colorCriticalTextDisabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: colorTokens.colorCriticalTextSelected,
          dark: colors.N0,
        }),
        focusSelected: themed({
          light: colorTokens.colorCriticalTextSelected,
          dark: colors.N0,
        }),
      },
    },

    // Help appearance
    help: {
      background: {
        default: themed({
          light: colorTokens.colorChangeboardingBackgroundResting,
          dark: colors.P400,
        }),
        hover: themed({
          light: colorTokens.colorChangeboardingBackgroundHover,
          dark: colors.P200,
        }),
        active: themed({
          light: colorTokens.colorChangeboardingBackgroundActive,
          dark: colors.P500,
        }),
        disabled: themed({
          light: colorTokens.colorChangeboardingBackgroundDisabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: colorTokens.colorChangeboardingBackgroundSelected,
          dark: colors.DN0,
        }),
        focusSelected: themed({
          light: colorTokens.colorChangeboardingBackgroundSelected,
          dark: colors.R500,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: colorTokens.colorChangeboardingBoxshadowFocus,
          dark: colors.P100,
        }),
        focusSelected: themed({
          light: colorTokens.colorChangeboardingBoxshadowFocus,
          dark: colors.P100,
        }),
      },
      color: {
        default: themed({
          light: colorTokens.colorChangeboardingTextResting,
          dark: colors.N0,
        }),
        disabled: themed({
          light: colorTokens.colorChangeboardingTextDisabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: colorTokens.colorChangeboardingTextSelected,
          dark: colors.DN400,
        }),
        focusSelected: themed({
          light: colorTokens.colorChangeboardingTextSelected,
          dark: colors.N0,
        }),
      },
    },

    // Link appearance
    link: {
      background: {
        default: themed({
          light: colorTokens.colorLinkBackgroundResting,
          dark: 'none',
        }),
        selected: themed({
          light: colorTokens.colorLinkBackgroundSelected,
          dark: colors.N20,
        }),
        focusSelected: themed({
          light: colorTokens.colorLinkBackgroundSelected,
          dark: colors.N20,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: colorTokens.colorLinkBoxshadowFocus,
          dark: colors.B75,
        }),
        focusSelected: themed({
          light: colorTokens.colorLinkBoxshadowFocus,
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({
          light: colorTokens.colorLinkTextResting,
          dark: colors.B100,
        }),
        hover: themed({
          light: colorTokens.colorLinkTextHover,
          dark: colors.B75,
        }),
        active: themed({
          light: colorTokens.colorLinkTextActive,
          dark: colors.B200,
        }),
        disabled: themed({
          light: colorTokens.colorLinkTextDisabled,
          dark: colors.DN100,
        }),
        selected: themed({
          light: colorTokens.colorLinkTextSelected,
          dark: colors.N700,
        }),
        focusSelected: themed({
          light: colorTokens.colorLinkTextSelected,
          dark: colors.N700,
        }),
      },
      textDecoration: {
        hover: 'underline',
      },
    },

    // Subtle appearance
    subtle: {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        hover: themed({ light: colors.N30A, dark: colors.DN60 }),
        active: themed({ light: hex2rgba(colors.B75, 0.6), dark: colors.B75 }),
        disabled: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
        focusSelected: themed({ light: colors.N700, dark: colors.DN0 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
        focusSelected: themed({
          light: hex2rgba(colors.B200, 0.6),
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: colors.N400, dark: colors.DN400 }),
        active: themed({ light: colors.B400, dark: colors.B400 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
        focusSelected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
    },

    // Subtle Link appearance
    'subtle-link': {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.N20 }),
        focusSelected: themed({ light: colors.N700, dark: colors.N20 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
        focusSelected: themed({
          light: hex2rgba(colors.B200, 0.6),
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: colors.N200, dark: colors.DN400 }),
        hover: themed({ light: colors.N90, dark: colors.B50 }),
        active: themed({ light: colors.N400, dark: colors.DN300 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
        focusSelected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
      textDecoration: {
        hover: 'underline',
      },
    },
  },
};
