// @flow
import styled from '@emotion/styled';
import { gridSize, math } from '@atlaskit/theme';

export const EmptyViewWithFixedHeight = styled.div`
  height: ${math.multiply(gridSize, 18)}px;
`;

export const EmptyViewContainer = styled.div`
  margin: auto;
  padding: 10px;
  text-align: center;
  width: 50%;
`;
