import { gridSize as gridSizeFn } from '@atlaskit/theme';
import styled from '@emotion/styled';

const gridSize = gridSizeFn();

export const Outer = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  margin-right: ${gridSize * 3}px;
`;
