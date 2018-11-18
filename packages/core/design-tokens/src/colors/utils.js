// @flow

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
