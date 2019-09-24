// StyledComponentClass and React types are imported to prevent a typescript error caused by inferred types sourced
// from external modules - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
// @ts-ignore: unused variable
// prettier-ignore
import styled, { StyledComponentClass } from 'styled-components';

import { colors, gridSize, layers } from '@atlaskit/theme';

const overlayZindex = layers.modal() + 10;

// Seems like `box-sizing` would be handled by a CSS reset?
export const Sidebar = styled.div`
  background-color: ${colors.DN50};
  box-sizing: border-box;
  color: ${colors.N0};
  overflow-y: scroll;
  padding: ${gridSize() * 4}px;
  width: 25%;
  margin-left: 75%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${overlayZindex};
`;
