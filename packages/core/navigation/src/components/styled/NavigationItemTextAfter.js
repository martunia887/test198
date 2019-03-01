// @flow
import styled from '@emotion/styled';
import { whenCollapsed } from '../../theme/util';

const NavigationItemTextAfter = styled.div`
  position: relative;
  z-index: 1;

  ${whenCollapsed`
    opacity: 0;
  `};
`;

NavigationItemTextAfter.displayName = 'NavigationItemTextAfter';
export default NavigationItemTextAfter;
