// @flow
import { akGridSizeUnitless as gridSize } from "@atlaskit/util-shared-styles";
import styled from "styled-components";
import * as colors from "@atlaskit/theme/colors";

const blah = gridSize;
const MyDiv = styled.div`
  padding: ${gridSize}px;
`;
//////
// @flow
import styled from "styled-components";
import { gridSize } from "@atlaskit/theme/constants";
import * as colors from "@atlaskit/theme/colors";

const blah = gridSize();
const MyDiv = styled.div`
  padding: ${gridSize()}px;
`;
