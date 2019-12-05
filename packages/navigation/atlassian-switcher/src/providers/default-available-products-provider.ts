import { createProvider, ExportedDataProvider } from './create-data-provider';
import { AvailableProductsResponse, AvailableSite } from '../types';

const DEFAULT_AVAILABLE_PRODUCTS_ENDPOINT =
  '/gateway/api/worklens/api/available-products';

export const createAvailableProductsProvider = (
  url: string = DEFAULT_AVAILABLE_PRODUCTS_ENDPOINT,
): ExportedDataProvider<AvailableProductsResponse> => {
  const isResultEmpty = (result: AvailableProductsResponse) => {
    return (
      !result ||
      !result.sites ||
      result.sites.length == 0 ||
      result.sites.every(
        (site: AvailableSite) =>
          !site.availableProducts || site.availableProducts.length == 0,
      )
    );
  };

  return createProvider<AvailableProductsResponse>(
    'availableProducts',
    url,
    isResultEmpty,
  );
};
