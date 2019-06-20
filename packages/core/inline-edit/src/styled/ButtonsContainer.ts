import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

const ButtonsContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: ${gridSize() - 2}px;
  position: absolute;
  width: 100%;
  top: 100%;
`;

ButtonsContainer.displayName = 'ButtonsContainer';

export default ButtonsContainer;
