import { HTMLAttributes, ComponentClass } from 'react';
import styled from 'styled-components';
import { N0 } from '@atlaskit/theme/colors';
import { borderRadius } from '@atlaskit/theme/constants';

export const ColorSample: ComponentClass<HTMLAttributes<{}>> = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 4px;
  border-radius: ${borderRadius()}px;
  border-width: 2px;
  border-style: solid;
`;

export const CheckArea: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${N0};
`;
