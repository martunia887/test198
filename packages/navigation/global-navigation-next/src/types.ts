// @flow

import { ComponentType } from 'react';
import PrimaryItem from './components/PrimaryItem';

// type ItemDataShape = {
//   ...$Exact<ElementConfig<typeof GlobalItem>>,
//   id: string,
// };

export type ProductProps = {
  /** The product icon. Expected to be an Icon from the Atlaskit Logo package. Visible on smaller screen sizes */
  icon: ComponentType<{
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  }>;
  /** The product wordmark, visible on larger screen sizes */
  wordmark: ComponentType<{}>;
};

export type GlobalNavigationProps = {
  /* The component used to render the `primaryItems` and `secondaryItems`. By
   * default this will render a `GlobalItem`.
   */
  // itemComponent: ComponentType<any>;
  /** The  */
  product: ProductProps;
  /* An array of objects to render as GlobalItems at the top of the GlobalNavigation
   * bar.
   */
  primaryItems: JSX.LibraryManagedAttributes<
    typeof PrimaryItem,
    PrimaryItem['props']
  >[];
};
