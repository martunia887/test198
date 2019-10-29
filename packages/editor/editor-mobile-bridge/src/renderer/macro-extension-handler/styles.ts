import styled from 'styled-components';
import * as colors from '@atlaskit/theme/colors';
import { ActionProps } from './types';

export const Card = styled.span`
  display: flex;
  height: initial;
  white-space: normal;
  text-align: left;
  padding-top: 8px;
`;

export const cardStyles = {
  backgroundColor: `${colors.N0}`,
  border: `solid 2px ${colors.N30}`,
  display: 'flex',
  height: 'initial',
  whiteSpace: 'normal' as 'normal',
  textAlign: 'left' as 'left',
  minWidth: '150px',
};

export const Content = styled.span`
  flex: 1;
`;

export const ContentWrapper = styled.span`
  flex: 1;
  padding-left: 8px;
  display: flex;
  justify-content: space-between;
`;

export const Action = styled.span<ActionProps>`
  color: ${props => (props.callToAction ? colors.B300 : colors.N90)};
  align-self: center;
  text-align: right;
  white-space: nowrap;
  padding-left: 16px;
  min-width: 50px;
`;

export const Error = styled.span`
  flex-basis: 100%;
  padding-top: 10px;
  display: flex;
`;

export const ErrorMessage = styled.span`
  color: ${colors.N90};
  padding-left: 4px;
  margin-top: -4px;
`;

export const Icon = styled.span`
  padding-top: 3px;
`;

export const CardBody = styled.span`
  flex: 1;
  flex-wrap: wrap;
`;
