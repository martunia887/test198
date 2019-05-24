import { ProductProps } from './../ProductHome/types';
import { PlatformServicesProps } from './PlatformServices';
import PrimaryItem from '../PrimaryItem';

export type GlobalNavigationProps = {
  product: ProductProps;
  primaryItems: JSX.LibraryManagedAttributes<
    typeof PrimaryItem,
    PrimaryItem['props']
  >[];
} & PlatformServicesProps;
