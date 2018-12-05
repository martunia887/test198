import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';

const Separator: ComponentClass<HTMLAttributes<HTMLSpanElement>> = styled.span`
  background: hotpink;
  height: 100%;
  padding-left: 1px;
  margin: 2px 8px;
`;

export default Separator;
