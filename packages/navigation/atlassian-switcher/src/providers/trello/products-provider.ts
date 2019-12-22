import { AvailableProductsResponse } from '../../types';
import { Environment, getEnvName } from '../../utils/environment';
import { fetchJson } from '../../utils/fetch';
import { withCached } from '../../utils/with-cached';
import asDataProvider from '../as-data-provider';

export const getAvailableProductsUrl = (env: Environment) => {
  const origin =
    env === Environment.Production
      ? 'https://api-gateway.trello.com'
      : 'https://api-gateway.trellis.coffee';

  return `${origin}/gateway/api/worklens/api/available-products`;
};

const fetchAvailableProducts = withCached(() =>
  fetchJson<AvailableProductsResponse>(
    getAvailableProductsUrl(getEnvName(location.origin)),
  ),
);

export const TrelloAvailableProductsProvider = asDataProvider(
  'availableProducts',
  fetchAvailableProducts,
  fetchAvailableProducts.cached,
);
