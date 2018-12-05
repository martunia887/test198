import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';

export const DropdownItem: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 32px 8px 12px;
  color: hotpink;
  > span {
    display: flex;
    margin-right: 8px;
  }
  &:hover {
    background-color: hotpink;
  }
`;
