import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { N30 } from '@atlaskit/theme/colors';

const Separator: ComponentClass<HTMLAttributes<HTMLSpanElement>> = styled.span`
  background: ${N30};
  height: 100%;
  padding-left: 1px;
  margin: 2px 8px;
`;

export default Separator;
