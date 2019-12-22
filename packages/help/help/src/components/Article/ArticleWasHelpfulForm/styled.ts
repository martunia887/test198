/** @jsx jsx */

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import styled from '@emotion/styled';

export const ArticleRateContainer = styled.div`
  padding-bottom: ${2 * gridSize()}px;
  position: relative;
`;

export const ArticleRateText = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  color: ${colors.N200};
  line-height: ${gridSize() * 2}px;
  position: relative;
  display: inline-block;
`;

export const ArticleRateAnswerWrapper = styled.div`
  padding-top: ${gridSize() * 2}px;
`;
