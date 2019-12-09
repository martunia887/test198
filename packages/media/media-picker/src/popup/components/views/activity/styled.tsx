import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export const ActivityWrapper = styled.div`
  padding: 16px;
`;

export const WorkWrapper = styled.div``;

export const ActivityRow = styled.a`
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
  color: ${colors.N800};
  padding: 8px;

  &:focus,
  &:hover {
    background: ${colors.N10};
    color: ${colors.N800};
    text-decoration: none;
  }
`;

export const ActivityObjectDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  margin: 0 16px;
  // Trick to get ellipsis to work in a flex box
  min-width: 0;
`;

export const ActivityObjectName = styled.div`
  font-size: 14px;

  ${ActivityRow}:hover &,
  ${ActivityRow}:focus & {
    color: ${colors.B400};
  }
`;
export const ActivityObjectContainer = styled.div`
  font-size: 11px;
  color: ${colors.N200};

  &:link {
    text-decoration: none;
  }
`;

export const ActivityObjectIcon = styled.img`
  flex-grow: 0;
  flex-shrink: 0;
  width: 24px;
  height: 24px;

  align-self: center;
`;

export const ActivityExtra = styled.div`
  font-size: 11px;
  color: ${colors.N200};
  flex-basis: 180px;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &:link {
    text-underline: none;
  }
`;
