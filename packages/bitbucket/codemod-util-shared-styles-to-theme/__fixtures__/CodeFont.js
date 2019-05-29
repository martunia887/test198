// @flow
import { akCodeFontFamily as codeFont } from "@atlaskit/util-shared-styles";
import { N0 } from "@atlaskit/theme/colors";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${N0};
  font-family: ${codeFont};
  vertical-align: top;
`;

//////
// @flow
import { codeFontFamily } from "@atlaskit/theme/constants";

import * as colors from "@atlaskit/theme/colors";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${N0};
  font-family: ${codeFontFamily()};
  vertical-align: top;
`;
