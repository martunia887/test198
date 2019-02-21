import { css } from 'styled-components';

export type IsLoadingProps = {
  isLoading?: boolean;
};

export const isLoadingStyle = css<IsLoadingProps>`
  transition: opacity 0.3s;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

export const getLoadingStyle = ({ isLoading }: IsLoadingProps) => ({
  transition: 'opacity 0.3s',
  opacity: isLoading ? 0 : 1,
});

/**
 * Convert a hex colour code to RGBA.
 * @param {String} hex Hex colour code.
 * @param {Number} alpha Optional alpha value (defaults to 1).
 */
export function hex2rgba(hex: string, alpha = 1) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let colorArr = hex.substring(1).split('');

    if (colorArr.length === 3) {
      colorArr = [
        colorArr[0],
        colorArr[0],
        colorArr[1],
        colorArr[1],
        colorArr[2],
        colorArr[2],
      ];
    }

    const color = `0x${colorArr.join('')}`;

    // FIXME: `>>` operand can validly take a string value
    const r = ((color as any) >> 16) & 255;
    const g = ((color as any) >> 8) & 255;
    const b = (color as any) & 255;

    return `rgba(${[r, g, b].join(',')}, ${alpha})`;
  }

  throw new Error('Bad Hex');
}
