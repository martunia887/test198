// @flow

import type { StyleReducer, ProductTheme } from '../../../theme/types';
import type { ItemPresentationProps } from '../Item/types';

export type ConnectedItemAvatarProps = {
  /** The current UI state of the Item which this ItemAvatar is within. This should be provided to you by the `after` or `before` prop  */
  itemState: ItemPresentationProps,
  /** ItemAvatar inherits its border color from the style of its parent Item.
   * This function will be passed the default styles object for the Item, and
   * should return a new styles object. */
  styles: StyleReducer,
};

export type ItemAvatarProps = {
  ...$Exact<ConnectedItemAvatarProps>,
  theme: ProductTheme,
};
