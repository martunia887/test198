// @flow
import { colors, themed } from '@atlaskit/theme';
import { colorTokens } from '@atlaskit/design-tokens';
/* eslint-enable no-bitwise */

const {
  changeBoarding,
  critical,
  link,
  neutral,
  primary,
  warning,
} = colorTokens;

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
          light: neutral.backgroundColor.hover,
          dark: colors.DN60,
        }),
        active: themed({
          light: neutral.backgroundColor.active,
          dark: colors.B75,
        }),
        disabled: themed({
          light: neutral.backgroundColor.disabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: neutral.backgroundColor.selected,
          dark: colors.DN0,
        }),
        focusSelected: themed({
          light: neutral.backgroundColor.selected,
          dark: colors.DN0,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: neutral.boxShadowColor.focus,
          dark: colors.B75,
        }),
        focusSelected: themed({
          light: neutral.boxShadowColor.focus,
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({
          light: neutral.textColor.resting,
          dark: colors.DN400,
        }),
        active: themed({ light: neutral.textColor.active, dark: colors.B400 }),
        disabled: themed({
          light: neutral.textColor.disabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: neutral.textColor.selected,
          dark: colors.DN400,
        }),
        focusSelected: themed({
          light: neutral.textColor.selected,
          dark: colors.DN400,
        }),
      },
    },

    // Primary appearance
    primary: {
      background: {
        default: themed({
          light: primary.backgroundColor.resting,
          dark: colors.B100,
        }),
        hover: themed({
          light: primary.backgroundColor.hover,
          dark: colors.B75,
        }),
        active: themed({
          light: primary.backgroundColor.active,
          dark: colors.B200,
        }),
        disabled: themed({
          light: primary.backgroundColor.disabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: primary.backgroundColor.selected,
          dark: colors.DN0,
        }),
        focusSelected: themed({
          light: primary.backgroundColor.selected,
          dark: colors.DN0,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: primary.boxShadowColor.focus,
          dark: colors.B75,
        }),
        focusSelected: themed({
          light: primary.boxShadowColor.focus,
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({
          light: primary.textColor.resting,
          dark: colors.DN30,
        }),
        disabled: themed({
          light: primary.textColor.disabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: primary.textColor.selected,
          dark: colors.DN400,
        }),
        focusSelected: themed({
          light: primary.textColor.selected,
          dark: colors.DN400,
        }),
      },
    },

    // Warning appearance
    warning: {
      background: {
        default: themed({
          light: warning.backgroundColor.resting,
          dark: colors.Y300,
        }),
        hover: themed({
          light: warning.backgroundColor.hover,
          dark: colors.Y200,
        }),
        active: themed({
          light: warning.backgroundColor.active,
          dark: colors.Y400,
        }),
        disabled: themed({
          light: warning.backgroundColor.disabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: warning.backgroundColor.selected,
          dark: colors.Y400,
        }),
        focusSelected: themed({
          light: warning.backgroundColor.selected,
          dark: colors.Y400,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: warning.boxShadowColor.focus,
          dark: colors.Y500,
        }),
        focusSelected: themed({
          light: warning.boxShadowColor.focus,
          dark: colors.Y500,
        }),
      },
      color: {
        default: themed({
          light: warning.textColor.resting,
          dark: colors.N800,
        }),
        disabled: themed({
          light: warning.textColor.disabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: warning.textColor.selected,
          dark: colors.N800,
        }),
        focusSelected: themed({
          light: warning.textColor.selected,
          dark: colors.N800,
        }),
      },
    },

    // Danger appearance
    danger: {
      background: {
        default: themed({
          light: critical.backgroundColor.resting,
          dark: colors.R400,
        }),
        hover: themed({
          light: critical.backgroundColor.hover,
          dark: colors.R300,
        }),
        active: themed({
          light: critical.backgroundColor.active,
          dark: colors.R500,
        }),
        disabled: themed({
          light: critical.backgroundColor.disabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: critical.backgroundColor.selected,
          dark: colors.R500,
        }),
        focusSelected: themed({
          light: critical.backgroundColor.active,
          dark: colors.R500,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: critical.boxShadowColor.focus,
          dark: colors.R100,
        }),
        focusSelected: themed({
          light: critical.boxShadowColor.focus,
          dark: colors.R100,
        }),
      },
      color: {
        default: themed({ light: critical.textColor.resting, dark: colors.N0 }),
        disabled: themed({
          light: critical.textColor.disabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: critical.textColor.selected,
          dark: colors.N0,
        }),
        focusSelected: themed({
          light: critical.textColor.selected,
          dark: colors.N0,
        }),
      },
    },

    // Help appearance
    help: {
      background: {
        default: themed({
          light: changeBoarding.backgroundColor.resting,
          dark: colors.P400,
        }),
        hover: themed({
          light: changeBoarding.backgroundColor.hover,
          dark: colors.P200,
        }),
        active: themed({
          light: changeBoarding.backgroundColor.active,
          dark: colors.P500,
        }),
        disabled: themed({
          light: changeBoarding.backgroundColor.disabled,
          dark: colors.DN70,
        }),
        selected: themed({
          light: changeBoarding.backgroundColor.selected,
          dark: colors.DN0,
        }),
        focusSelected: themed({
          light: changeBoarding.backgroundColor.active,
          dark: colors.R500,
        }),
      },
      boxShadowColor: {
        focus: themed({
          light: changeBoarding.boxShadowColor.focus,
          dark: colors.P100,
        }),
        focusSelected: themed({
          light: changeBoarding.boxShadowColor.focus,
          dark: colors.P100,
        }),
      },
      color: {
        default: themed({
          light: changeBoarding.textColor.resting,
          dark: colors.N0,
        }),
        disabled: themed({
          light: changeBoarding.textColor.disabled,
          dark: colors.DN30,
        }),
        selected: themed({
          light: changeBoarding.textColor.selected,
          dark: colors.DN400,
        }),
        focusSelected: themed({
          light: changeBoarding.textColor.resting,
          dark: colors.N0,
        }),
      },
    },

    // Link appearance
    link: {
      background: {
        default: themed({ light: link.backgroundColor.resting, dark: 'none' }),
        selected: themed({
          light: link.backgroundColor.selected,
          dark: colors.N20,
        }),
        focusSelected: themed({
          light: link.backgroundColor.selected,
          dark: colors.N20,
        }),
      },
      boxShadowColor: {
        focus: themed({ light: link.boxShadowColor.focus, dark: colors.B75 }),
        focusSelected: themed({
          light: link.boxShadowColor.focus,
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: link.textColor.resting, dark: colors.B100 }),
        hover: themed({ light: link.textColor.hover, dark: colors.B75 }),
        active: themed({ light: link.textColor.active, dark: colors.B200 }),
        disabled: themed({
          light: link.textColor.disabled,
          dark: colors.DN100,
        }),
        selected: themed({ light: link.textColor.selected, dark: colors.N700 }),
        focusSelected: themed({
          light: link.textColor.selected,
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
