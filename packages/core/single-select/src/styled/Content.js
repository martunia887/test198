// @flow
import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  margin: ${gridSize}px 6px;
  white-space: nowrap;
`;

Content.displayName = 'SingleSelectContent';

export default Content;
