import * as React from 'react';
import { PureComponent } from 'react';
import chromatism from 'chromatism';
import Color from './Color';

import { ColorPaletteWrapper } from './styles';
import { PaletteColor } from './Palettes/type';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as colors from '@atlaskit/theme/colors';
import Button from '@atlaskit/button';

export interface Props {
  palette: PaletteColor[];
  paletteExtended?: PaletteColor[]; // used with showMoreColorsToggle
  selectedColor: string | null;
  onClick: (value: string) => void;
  cols?: number;
  className?: string;
  showMoreColorsToggle?: boolean;
  showMoreColors: boolean;
  onShowMoreToggleClick: () => void;
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
  renderSwatch = (swatch: PaletteColor) => {
    const {
      onClick,
      selectedColor,
      intl: { formatMessage },
    } = this.props;

    const { value, label, border, message } = swatch;

    return (
      <Color
        key={value}
        value={value}
        borderColor={border}
        label={message ? formatMessage(message) : label}
        onClick={onClick}
        isSelected={value === selectedColor}
        checkMarkColor={getContrastColor(value, [colors.N0, colors.N500])}
      />
    );
  };

  render() {
    const {
      palette,
      paletteExtended,
      showMoreColorsToggle,
      showMoreColors,
      cols = 7,
      className,
      onShowMoreToggleClick,
    } = this.props;

    return (
      <React.Fragment>
        <ColorPaletteWrapper
          className={className}
          style={{ maxWidth: cols * 32 }}
        >
          {palette.map(swatch => this.renderSwatch(swatch))}

          {showMoreColors &&
            paletteExtended &&
            paletteExtended.map(swatch => this.renderSwatch(swatch))}
        </ColorPaletteWrapper>
        {showMoreColorsToggle && (
          <div>
            <Button
              onClick={onShowMoreToggleClick}
              iconBefore={<span>TODO: Fill icon</span>}
            >
              {showMoreColors ? 'Less colors' : 'More colors'}
            </Button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default injectIntl(ColorPalette);
