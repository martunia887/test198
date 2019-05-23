// @flow

import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { HORIZONTAL_GLOBAL_NAV_HEIGHT } from '../../../common/constants';
import type { ModeColors } from '../../../theme/types';

const gridSize = gridSizeFn();

const baseStyles = {
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

export default ({ global }: ModeColors) => {
  return () => ({
    ...baseStyles,
    backgroundColor: global.background.default,
    color: global.text.default,
    fill: global.background.default,
  });
};
