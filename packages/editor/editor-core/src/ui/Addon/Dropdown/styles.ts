import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { borderRadius } from '@atlaskit/theme';

// tslint:disable-next-line:variable-name
export const Dropdown: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: ${borderRadius()}px;
  box-shadow: 0 4px 8px -2px hotpink, 0 0 1px hotpink;
  box-sizing: border-box;
  padding: 4px 0;
`;
