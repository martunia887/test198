import * as React from 'react';
import { PureComponent } from 'react';
import chromatism from 'chromatism';
import Color from './Color';

import { ColorPaletteWrapper } from './styles';
import { PaletteColor } from './Palettes/type';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as colors from '@atlaskit/theme/colors';

export interface Props {
  palette: PaletteColor[];
  paletteExtended?: PaletteColor[]; // used with showMoreColorsToggle
  selectedColor: string | null;
  onClick: (value: string) => void;
  cols?: number;
  className?: string;
  showMoreColorsToggle?: boolean;
  showMoreColors: boolean;
}

/**
 * For a given color pick the color from a list of colors with
 * the highest contrast
 *
 * @param color color string, suppports HEX, RGB, RGBA etc.
 * @return Highest contrast color in pool
 */
export function getContrastColor(color: string, pool: string[]): string {
  return pool.sort(
    (a, b) => chromatism.difference(b, color) - chromatism.difference(a, color),
  )[0];
}

class ColorPalette extends PureComponent<Props & InjectedIntlProps, any> {
  render() {
    const {
      palette,
      paletteExtended,
      showMoreColorsToggle,
      showMoreColors,
      cols = 7,
      onClick,
      selectedColor,
      className,
      intl: { formatMessage },
    } = this.props;

    let allColors = palette;

    if (showMoreColors && paletteExtended) {
      allColors = allColors.concat(paletteExtended);
    }

    return (
      <ColorPaletteWrapper
        className={className}
        style={{ maxWidth: cols * 32 }}
      >
        {allColors.map(({ value, label, border, message }) => (
          <Color
            key={value}
            value={value}
            borderColor={border}
            label={message ? formatMessage(message) : label}
            onClick={onClick}
            isSelected={value === selectedColor}
            checkMarkColor={getContrastColor(value, [colors.N0, colors.N500])}
          />
        ))}

        {showMoreColorsToggle && (
          <div>
            <button type="button">
              {showMoreColors ? 'Less colors' : 'More colors'}
            </button>
          </div>
        )}
      </ColorPaletteWrapper>
    );
  }
}

export default injectIntl(ColorPalette);
