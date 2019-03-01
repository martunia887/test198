// @flow

import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme';

const Image = styled.img`
  max-width: ${props => props.maxWidth}px;
  max-height: ${props => props.maxHeight}px;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  margin: 0 auto ${gridSize() * 3}px;
  display: block;
`;

export default Image;
