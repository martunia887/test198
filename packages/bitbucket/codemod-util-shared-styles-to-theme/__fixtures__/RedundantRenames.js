// @flow
import {
  akTypographyMixins as typo,
  akGridSizeUnitless as gridSize,
} from "@atlaskit/util-shared-styles";
import styled from "styled-components";
const gridSizePx = `${gridSize}px`;
const Fonty = styled.div`
  font-size: ${gridSizePx};
  ${typo.h100};
`;

//////
// @flow
import { gridSize } from "@atlaskit/theme/constants";

import { h100 } from "@atlaskit/theme/typography";
import styled from "styled-components";
const gridSizePx = `${gridSize()}px`;
const Fonty = styled.div`
  font-size: ${gridSizePx};
  ${h100()};
`;
