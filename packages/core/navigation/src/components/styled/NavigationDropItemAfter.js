// @flow
import styled from 'styled-components';
import { whenCollapsed } from '../../theme/util';
import NavigationItemAfter from './NavigationItemAfter';

const NavigationDropItemAfter = styled(NavigationItemAfter)`
  ${whenCollapsed`
    display: none;
  `};
`;

NavigationDropItemAfter.displayName = 'NavigationDropItemAfter';
export default NavigationDropItemAfter;
