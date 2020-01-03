import { colorPalette, borderColorPalette } from '@atlaskit/adf-schema';
import { PaletteColor } from './type';
import getColorMessage from './getColorMessage';
import paletteMessages from './paletteMessages';

const textColorPalette: Array<PaletteColor> = [];

colorPalette.forEach((label, color) => {
  const border =
    borderColorPalette[color.toUpperCase() as keyof typeof borderColorPalette];

  const key = label.toLowerCase().replace(' ', '-');
  const message = getColorMessage(paletteMessages, key);

  if (!border) {
    // eslint-disable-next-line no-console
    console.warn(`Text color palette doest not have a border for ${color} color.
You must add the respective border color in 'borderColorPalette' in 'adf-schema'.
This could be happen when someone change the colorPalette from 'adf-schema', without updating 'borderColorPalette'.
`);
  }

  textColorPalette.push({
    value: color,
    label,
    border,
    message,
  });
});

export default textColorPalette;

export const textColorPaletteExtended: Array<PaletteColor> = [];

for (let i = 0; i < 7; i++) {
  textColorPaletteExtended.push({
    value: `#${i}${i}${i}`,
    label: `Dark ${i}`,
  });

  const hexCode = Number(15 - i).toString(16);
  textColorPaletteExtended.push({
    value: `#${hexCode}${hexCode}${hexCode}`,
    label: `Light ${i}`,
  });
}
