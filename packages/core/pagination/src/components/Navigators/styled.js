//@flow
import styled from '@emotion/styled';
import Button from '@atlaskit/button';
import { gridSize } from '@atlaskit/theme';

export const StyledButton = styled(Button)`
  [dir='rtl'] & {
    transform: rotate(180deg);
  }
  padding-left: ${gridSize() / 2}px;
  padding-right: ${gridSize() / 2}px;
`;
