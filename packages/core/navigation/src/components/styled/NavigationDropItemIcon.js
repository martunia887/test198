// @flow
import styled from 'styled-components';
import { whenCollapsed } from '../../theme/util';
import NavigationItemIcon from './NavigationItemIcon';

const NavigationDropItemIcon = styled(NavigationItemIcon)`
  padding-right: 0;

  ${whenCollapsed`
    display: none;
  `};
`;

NavigationDropItemIcon.displayName = 'NavigationDropItemIcon';
export default NavigationDropItemIcon;
