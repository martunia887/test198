import { AvailableProductsResponse } from '../types';
import { createProvider, ExportedDataProvider } from './create-data-provider';

export const DEFAULT_AVAILABLE_PRODUCTS_ENDPOINT =
  '/gateway/api/worklens/api/available-products';

export const createAvailableProductsProvider = (
  url: string = DEFAULT_AVAILABLE_PRODUCTS_ENDPOINT,
): ExportedDataProvider<AvailableProductsResponse> => {
  return createProvider<AvailableProductsResponse>('availableProducts', url);
};
