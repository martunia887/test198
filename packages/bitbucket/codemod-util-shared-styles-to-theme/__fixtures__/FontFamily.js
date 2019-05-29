// @flow
import { akFontFamily as font } from "@atlaskit/util-shared-styles";
import { N0 } from "@atlaskit/theme/colors";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${N0};
  font-family: ${font};
  vertical-align: top;
`;

//////
// @flow
import { fontFamily } from "@atlaskit/theme/constants";

import * as colors from "@atlaskit/theme/colors";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${N0};
  font-family: ${fontFamily()};
  vertical-align: top;
`;
