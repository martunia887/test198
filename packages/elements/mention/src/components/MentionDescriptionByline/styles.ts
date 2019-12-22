import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export const DescriptionBylineStyle: ComponentClass<HTMLAttributes<{}>> = styled.span`
  color: ${colors.N100};
  font-size: 12px;

  margin-top: 2px;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
