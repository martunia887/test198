// @flow
import { akFontSizeDefault as fontSize } from "@atlaskit/util-shared-styles";
import { N0 } from "@atlaskit/theme/colors";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${N0};
  font-size: ${fontSize};
  vertical-align: top;
`;

//////
// @flow
import { fontSize } from "@atlaskit/theme/constants";

import * as colors from "@atlaskit/theme/colors";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${N0};
  font-size: ${fontSize() + "px"};
  vertical-align: top;
`;