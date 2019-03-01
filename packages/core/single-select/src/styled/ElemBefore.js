// @flow
import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme';

const ElemBefore = styled.div`
  display: flex;
  padding-right: ${gridSize}px;
`;

ElemBefore.displayName = 'TriggerElemBefore';

export default ElemBefore;
