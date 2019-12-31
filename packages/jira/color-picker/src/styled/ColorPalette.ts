import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';

export const ColorCardWrapper = styled.div`
  display: flex;
  margin: 2px;
`;

const palettePadding = `padding: ${gridSize() / 2}px ${gridSize()}px`;

export const ColorPaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${palettePadding};
`;
