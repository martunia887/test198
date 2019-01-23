// @flow

import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export default styled.div`
  > * {
    ${props =>
      props.withDivider &&
      `padding: 4px 0 4px 0; 
                                     border-bottom: 2px solid ${colors.N40};`}
  }

  > *:first-child {
    ${props => props.withDivider && 'padding-top: 0px;'}
  }

  > *:last-child {
    ${props => props.withDivider && 'padding-bottom: 0px; border-bottom: none;'}
  }
`;
