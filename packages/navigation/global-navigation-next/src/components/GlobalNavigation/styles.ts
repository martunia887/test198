import { CSSProperties } from 'react';
// @flow

import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';
import { HORIZONTAL_GLOBAL_NAV_HEIGHT } from '../../common/constants';

const gridSize = gridSizeFn();

const baseStyles: CSSProperties = {
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'space-between',
  paddingLeft: gridSize * 2,
  paddingRight: gridSize * 2,
  height: HORIZONTAL_GLOBAL_NAV_HEIGHT,
  width: '100vw',
};

export default () => ({
  outer: {
    ...baseStyles,
    backgroundColor: colors.B300,
    color: colors.N0,
    fill: colors.B300,
    position: 'absolute',
  },
  left: {
    alignItems: 'center',
    display: 'flex',
  },
  right: {
    alignItems: 'center',
    display: 'flex',
    right: gridSize * 4,
  },
});
