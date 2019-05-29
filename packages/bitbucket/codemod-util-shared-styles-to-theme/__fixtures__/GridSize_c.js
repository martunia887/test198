// @flow
import {
  akGridSizeUnitless,
  akTypographyMixins
} from "@atlaskit/util-shared-styles";
import styled from "styled-components";

export const EventContainer = styled.div`
  display: flex;
  margin-bottom: ${akGridSizeUnitless * 2}px;
`;

//////
// @flow
import { gridSize } from "@atlaskit/theme/constants";

import * as typography from "@atlaskit/theme/typography";
import styled from "styled-components";

export const EventContainer = styled.div`
  display: flex;
  margin-bottom: ${gridSize() * 2}px;
`;
