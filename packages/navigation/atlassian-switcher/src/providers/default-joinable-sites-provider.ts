import {
  createProviderWithCustomFetchData,
  ExportedDataProvider,
} from './create-data-provider';
import { JoinableSitesResponse, Product } from '../types';
import { defaultFetchData } from './default-joinable-sites-fetch';

export type JoinableSiteDataFetcher = () => Promise<JoinableSitesResponse>;

export const createJoinableSitesProvider = (
  fetchData?: JoinableSiteDataFetcher,
  product?: Product,
): ExportedDataProvider<JoinableSitesResponse> => {
  return createProviderWithCustomFetchData<JoinableSitesResponse>(
    'joinableSites',
    fetchData || defaultFetchData(product),
  );
};
