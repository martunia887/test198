// @flow
import styled from 'styled-components';
import { N40A } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const FooterDiv = styled.div`
  padding: ${gridSize()}px 0 ${gridSize() / 2}px 0;
  border-top: ${({ shouldHideSeparator }) =>
    shouldHideSeparator ? '0' : `2px solid ${N40A}`};
`;

export default FooterDiv;
