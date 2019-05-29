import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { N200 } from '@atlaskit/theme/colors';

const DateGroupHeader: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${N200};
  font-size: 12px;
  font-weight: 500;
  margin: 12px 0 4px 0;
`;

export default DateGroupHeader;
