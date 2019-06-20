import styled from 'styled-components';
import { colors, gridSize, themed, typography } from '@atlaskit/theme';

const textColor = themed({ light: colors.N900, dark: colors.DN600 });

const ErrorMessage = styled.div`
  display: inline;
  ${typography.h200}
  font-weight: normal;
  color: ${textColor};
  margin-top: 0;
  padding: ${gridSize() / 2}px ${gridSize() / 2}px;
`;

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
