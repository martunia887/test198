// @flow
import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme';

const gridSizeUnitless = gridSize();

export default styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-left: ${gridSizeUnitless / 2}px;
`;
