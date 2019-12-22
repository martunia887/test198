import { HTMLAttributes, ComponentClass } from 'react';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

export const AlignmentWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  padding: 0 ${gridSize()}px;
  display: flex;
  flex-wrap: wrap;
`;
