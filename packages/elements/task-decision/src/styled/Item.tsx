import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import styled from 'styled-components';

export const ContentWrapper: ComponentClass<HTMLAttributes<{}> & {
  innerRef?: any;
}> = styled.div`
  margin: 0;
  word-wrap: break-word;
  min-width: 0;
  flex: 1 1 auto;
`;

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 3px;
`;

export const ParticipantWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin: -2px 8px;
`;
