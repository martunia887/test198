// @flow
import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const NavigationItemCaption = styled.span`
  color: ${({ theme }) => getProvided(theme).subText};
  margin-left: ${layout.padding.side}px;
`;

NavigationItemCaption.displayName = 'NavigationItemCaption';
export default NavigationItemCaption;
