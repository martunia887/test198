import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { gridSize } from '@atlaskit/theme';

export const ColorPaletteWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  padding: 0 ${gridSize()}px;
  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */
  display: flex;
  flex-wrap: wrap;
`;

export const ShowMoreWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  margin-top: 4px;
  padding: 4px;
  padding-bottom: 0;
  border-top: 1px solid #dfe1e6;

  > button {
    flex-grow: 1;
  }
`;
