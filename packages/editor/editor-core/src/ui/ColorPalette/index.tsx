import * as React from 'react';
import { PureComponent } from 'react';
import chromatism from 'chromatism';
import Color from './Color';
import { defineMessages } from 'react-intl';

import { ColorPaletteWrapper, ShowMoreWrapper } from './styles';
import { PaletteColor } from './Palettes/type';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as colors from '@atlaskit/theme/colors';
import Button from '@atlaskit/button';
import { IconFill } from './Icons/fill-icon';

export const messages = defineMessages({
  moreColors: {
    id: 'fabric.editor.textColor.moreColors',
    defaultMessage: 'More colors',
    description: 'More colors',
  },
  lessColors: {
    id: 'fabric.editor.textColor.lessColors',
    defaultMessage: 'Less colors',
    description: 'Less colors',
  },
});

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
      intl: { formatMessage },
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
          <ShowMoreWrapper>
            <Button
              onClick={onShowMoreToggleClick}
              iconBefore={
                <IconFill label="TODO: replace with actual fill icon" />
              }
            >
              {formatMessage(
                showMoreColors ? messages.lessColors : messages.moreColors,
              )}
            </Button>
          </ShowMoreWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default injectIntl(ColorPalette);
