// @flow

import { colors } from '@atlaskit/theme';

import { CONTENT_NAV_WIDTH } from '../../../common/constants';

import type { ModeColors } from '../../../theme/types';

const baseStyles = {
  boxSizing: 'border-box',
  height: '100%',
  left: 0,
  minWidth: CONTENT_NAV_WIDTH,
  overflowX: 'hidden',
  position: 'absolute',
  top: 0,
  width: '100%',
};

export default ({ product, container }: ModeColors) => () => ({
  container: {
    ...baseStyles,
    backgroundColor: container.background.default,
    color: container.text.default,
  },
  product: {
    ...baseStyles,
    backgroundColor: product.background.default,
    color: product.text.default,
  },
});
