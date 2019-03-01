// @flow
import styled from '@emotion/styled';
import { gridSize, math } from '@atlaskit/theme';

const InitialLoadingElement = styled.div`
  padding: 6px ${math.multiply(gridSize, 3)}px;
`;

InitialLoadingElement.displayName = 'InitialLoadingElement';

export default InitialLoadingElement;
