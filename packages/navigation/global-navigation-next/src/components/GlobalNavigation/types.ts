// @flow

import { ComponentType } from 'react';
import { PlatformServicesProps } from './PlatformServices';

// type ItemDataShape = {
//   ...$Exact<ElementConfig<typeof GlobalItem>>,
//   id: string,
// };

export type GlobalNavigationProps = {
  /* The component used to render the `primaryItems` and `secondaryItems`. By
   * default this will render a `GlobalItem`.
   */
  // itemComponent: ComponentType<any>;
  /** The product logo. Expected to be an Atlaskit Logo component. Visible on smaller screen sizes */
  productLogo?: ComponentType<{}>;
  /** The product wordmark, visible on larger screen sizes */
  productWordmark: ComponentType<{}>;
  /* An array of objects to render as GlobalItems at the top of the GlobalNavigation
   * bar.
   */
  // primaryItems: any[];
} & PlatformServicesProps;
