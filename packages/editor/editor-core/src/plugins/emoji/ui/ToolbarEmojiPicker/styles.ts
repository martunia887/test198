import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';

export const OuterContainer = styled.span<{ width?: 'small' | 'large' }>`
  position: relative;
  margin-right: ${({ width }) =>
    !width || width === 'large' ? 0 : gridSize()}px;
  > div {
    display: flex;
  }
`;
