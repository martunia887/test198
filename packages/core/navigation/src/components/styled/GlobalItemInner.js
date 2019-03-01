// @flow
import { css } from '@emotion/core';

import styled from '@emotion/styled';
import { globalItemSizes, gridSize } from '../../shared-variables';
import { focusOutline } from '../../utils/mixins';
import { getProvided } from '../../theme/util';
import type { Provided } from '../../theme/types';

const getOutline = props => {
  const provided: Provided = getProvided(props.theme);

  return focusOutline(provided.item.focus.outline);
};

const globalItemStyles = props => css`
  color: ${({ theme }) => getProvided(theme).text(props)};
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? getProvided(theme).item.selected.background(props)
      : getProvided(theme).item.default.background(props)};
  /* fill controls the secondary color used by some icons like the help icon */
  fill: ${({ theme }) =>
    getProvided(theme)
      .background(props)
      .primary(props)};
  align-items: center;
  border: none;
  border-radius: ${({ appearance }) =>
    appearance === 'square' ? '5px' : '50%'};
  cursor: pointer;
  display: flex;
  line-height: 1;
  width: ${({ size }) => globalItemSizes[size]}px;
  height: ${({ size }) => globalItemSizes[size]}px;
  justify-content: center;
  margin-top: ${({ size }) => (size === 'small' ? gridSize() : 0)}px;
  padding: 0;
  outline: none;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) =>
      getProvided(theme).item.hover.background(props)};
  }

  &:focus {
    background-color: ${({ theme }) =>
      getProvided(theme).item.focus.background(props)};
    ${getOutline};
  }

  &:active {
    background-color: ${({ theme }) =>
      getProvided(theme).item.active.background(props)};
  }
`;

const GlobalItemInner = styled.button`
  -moz-appearance: none;
  -webkit-appearance: none;
  ${globalItemStyles};
`;

GlobalItemInner.displayName = 'GlobalItemInner';
export default GlobalItemInner;
export { globalItemStyles };
