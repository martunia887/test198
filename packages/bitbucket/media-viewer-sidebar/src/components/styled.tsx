// StyledComponentClass and React types are imported to prevent a typescript error caused by inferred types sourced
// from external modules - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
// @ts-ignore: unused variable
// prettier-ignore
import styled, { StyledComponentClass } from 'styled-components';

import { gridSize } from '@atlaskit/theme';

export const Sidebar = styled.div`
  width: 25%;
  margin-left: 75%;
  height: 100%;
  padding: ${gridSize() * 4}px;
`;

export const Table = styled.table`
  margin-top: ${gridSize() * 2}px;
  margin-bottom: ${gridSize() * 2}px;
`;
