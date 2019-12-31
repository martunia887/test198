import * as React from 'react';
import { themed } from '@atlaskit/theme/components';
import { borderRadius } from '@atlaskit/theme/constants';
import { N30A, N800, N40, DN70, DN800, DN60 } from '@atlaskit/theme/colors';
import styled from 'styled-components';

export type Color = 'grey' | 'red' | 'blue' | 'green' | 'purple' | 'yellow';

export type Props = React.HTMLProps<HTMLSpanElement> & {
  clickable?: boolean;
  color?: Color;
};

type ColoursTuple = [string, string, string];

export const resolveColors = (
  color?: Color,
): { light: ColoursTuple; dark: ColoursTuple } => {
  if (!color || color === 'grey') {
    return {
      light: [N30A, N800, N40],
      dark: [DN70, DN800, DN60],
    };
  }
  const anyColors = colors as any;
  const letter = color.toUpperCase().charAt(0);
  // NOTE: This isn't type safe. If colors change their API this may break.
  const resolvedColors: ColoursTuple = [
    anyColors[`${letter}50`],
    anyColors[`${letter}500`],
    anyColors[`${letter}75`],
  ];
  return {
    light: resolvedColors,
    dark: resolvedColors,
  };
};

export const DateLozenge = styled.span<Props>`
  border-radius: ${borderRadius()}px;
  padding: 2px 4px;
  margin: 0 1px;
  position: relative;
  transition: background 0.3s;
  white-space: nowrap;
  cursor: ${(props: Props) => (props.onClick ? 'pointer' : 'unset')};

  ${props => {
    var colors = themed(resolveColors(props.color))(props);
    if (colors === '') colors = ['', '', ''];
    const [background, color, hoverBackground]: ColoursTuple = colors;
    return `
      background: ${background};
      color: ${color};
      &:hover {
        background: ${hoverBackground};
      }
    `;
  }};
` as React.ComponentType<Props>;
