import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { borderRadius } from '@atlaskit/theme/constants';
import { N30 } from '@atlaskit/theme/colors';

export const Toolbar: ComponentClass<HTMLAttributes<{}>> = styled.div`
  background: white;
  border-radius: ${borderRadius()}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
  padding: 5px;
  display: flex;
`;

export const Separator: ComponentClass<HTMLAttributes<{}>> = styled.span`
  border-left: 1px solid ${N30};
  width: 1px;
  display: inline-block;
  margin: 0 5px;
`;
