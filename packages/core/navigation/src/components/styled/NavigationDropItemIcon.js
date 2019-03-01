// @flow
import styled from '@emotion/styled';
import NavigationItemIcon from '../styled/NavigationItemIcon';
import { whenCollapsed } from '../../theme/util';

const NavigationDropItemIcon = styled(NavigationItemIcon)`
  padding-right: 0;

  ${whenCollapsed`
    display: none;
  `};
`;

NavigationDropItemIcon.displayName = 'NavigationDropItemIcon';
export default NavigationDropItemIcon;
