import { ProductProps } from './ProductHome/types';
import { CreateProps } from './Create/types';
import { PlatformServicesProps } from './PlatformServices';
import Item from '../Item';

export type GlobalNavigationProps = {
  create?: CreateProps;
  product: ProductProps;
  primaryItems: JSX.LibraryManagedAttributes<typeof Item, Item['props']>[];
} & PlatformServicesProps;
