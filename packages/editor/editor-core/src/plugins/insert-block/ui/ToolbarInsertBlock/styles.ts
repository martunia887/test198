import { HTMLAttributes, ComponentClass } from 'react';
import styled from 'styled-components';

export const TriggerWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  width: 42px;

  display: flex;
  align-items: center;

  > div,
  > span {
    display: flex;
  }

  > div > div {
    display: flex;
  }
`;
