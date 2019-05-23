import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';

import { CSSObject } from '@emotion/core';

const gridSize = gridSizeFn();

const baseStyles: CSSObject = {
  alignItems: 'center',
  boxSizing: 'border-box',
  flexShrink: 0,
  justifyContent: 'space-between',
  paddingLeft: gridSize * 2,
  paddingRight: gridSize * 2,
};

export default () => ({
  ...baseStyles,
  backgroundColor: colors.B300,
  color: colors.N0,
  fill: colors.B300,
});
