/** @jsx jsx */
import { gridSize } from '@atlaskit/theme/constants';
import styled from '@emotion/styled';

export const ArticleContentInner = styled.div`
  padding-bottom: ${2 * gridSize()}px;
  position: relative;
`;

export const ArticleContentTitle = styled.div`
  padding-bottom: ${2 * gridSize()}px;
`;

export const ArticleContentTitleLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;
