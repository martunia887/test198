import styled from 'styled-components';
import {
  borderRadius,
  colors,
  gridSize,
  themed,
  elevation,
  layers,
} from '@atlaskit/theme';

const backgroundColor = themed({ light: colors.N0, dark: colors.DN50 });

const ErrorDialog = styled.div`
  display: flex;
  vertical-align: middle;
  background-color: ${backgroundColor};
  border-radius: ${borderRadius}px;
  padding: ${gridSize() / 2}px ${gridSize() / 2}px;
  z-index: ${layers.dialog};

  ${elevation.e200};

  &:focus {
    outline: none;
  }
`;

ErrorDialog.displayName = 'ErrorDialog';

export default ErrorDialog;
