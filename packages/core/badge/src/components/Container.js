// @flow

import styled from 'styled-components';

export const Container = styled.span`
  ${props => `
    background-color: ${props.backgroundColor};
    color: ${props.textColor};
    border-radius: ${props.borderRadius};
    padding: ${props.padding};
  `};
  display: inline-block;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  min-width: 1px;
  text-align: center;
`;
Container.displayName = 'Ak.Badge.Container';
