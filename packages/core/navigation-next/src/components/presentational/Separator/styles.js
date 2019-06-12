// @flow

import { gridSize } from '@atlaskit/theme';
import type { ModeColors } from '../../../theme/types';

const dividerLineHeight = 2;
const dividerTotalHeight = gridSize() * 5;

const baseStyles = {
  borderRadius: '1px',
  flexShrink: 0,
  height: `${dividerLineHeight}px`,
  margin: `${(dividerTotalHeight - dividerLineHeight) / 2}px 0`,
};

export default ({ product, container }: ModeColors) => () => ({
  container: { ...baseStyles, backgroundColor: container.background.active },
  product: { ...baseStyles, backgroundColor: product.background.static },
});
