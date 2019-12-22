import { HTMLAttributes, ComponentClass } from 'react';
import styled from 'styled-components';

export const Container: ComponentClass<HTMLAttributes<{}>> = styled.div`
  width: 32px;
  height: 32px;
  padding: 1px;
  box-sizing: border-box;
`;
