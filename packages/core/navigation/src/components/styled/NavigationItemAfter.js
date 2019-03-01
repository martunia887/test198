// @flow
import styled from '@emotion/styled';
import { isCollapsed } from '../../theme/util';

const getDisplay = ({ theme, isDropdownTrigger }) => {
  if (isDropdownTrigger && isCollapsed(theme)) {
    return 'none';
  }

  return 'block';
};

const NavigationItemAfter = styled.div`
  display: ${getDisplay};
  min-width: ${({ shouldTakeSpace }) => (shouldTakeSpace ? '24px' : 0)};
`;

NavigationItemAfter.displayName = 'NavigationItemAfter';
export default NavigationItemAfter;
