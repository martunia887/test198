// @flow

import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';
import { HORIZONTAL_GLOBAL_NAV_HEIGHT } from '../../common/constants';
import { CSSObject } from '@emotion/core';

const gridSize = gridSizeFn();

const baseStyles: CSSObject = {
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  justifyContent: 'space-between',
  paddingLeft: gridSize * 2,
  paddingRight: gridSize * 2,
  height: HORIZONTAL_GLOBAL_NAV_HEIGHT,
  width: '100vw',
};

export default () => ({
  ...baseStyles,
  backgroundColor: colors.B300,
  color: colors.N0,
  fill: colors.B300,
});
