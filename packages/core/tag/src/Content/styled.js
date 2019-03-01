// @flow
import { css } from '@emotion/core';

import styled from '@emotion/styled';
import { gridSize, fontSize, colors, math } from '@atlaskit/theme';
import {
  buttonWidthUnitless,
  maxTextWidth,
  maxTextWidthUnitless,
} from '../constants';

// Common styles for Text & Link
const COMMON_STYLES = css`
  font-size: ${fontSize()}px;
  font-weight: normal;
  line-height: 1;
  margin-left: ${math.divide(gridSize, 2)}px;
  margin-right: ${math.divide(gridSize, 2)}px;
  padding: 2px 0;
  max-width: ${({ isRemovable }) =>
    isRemovable
      ? `${maxTextWidthUnitless - buttonWidthUnitless}px`
      : maxTextWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Text = styled.span`
  ${COMMON_STYLES};
`;

// Styles exclusive to Link

const getFocusedStyles = props => {
  if (color !== 'standard')
    return css`
      color: inherit;
    `;
  if (isFocused)
    return css`
      color: ${colors.link(rest)};
    `;
  return null;
};

export const linkStyles = props => css`
  ${COMMON_STYLES} ${getFocusedStyles} text-decoration: ${({ color }) =>
  color === 'standard' ? 'none' : 'underline'};

  &:hover {
    color: ${colors.linkHover(props)};
    ${({ color }) =>
      color === 'standard'
        ? ''
        : css`
            color: inherit;
          `};
  }
`;

export const Link = styled.a`
  ${linkStyles};
`;
