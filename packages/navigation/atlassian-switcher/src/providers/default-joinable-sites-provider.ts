import {
  createProviderWithCustomFetchData,
  ExportedDataProvider,
} from './create-data-provider';
import { JoinableSitesResponse, Product } from '../types';
import { defaultFetchData } from './default-joinable-sites-fetch';

export type JoinableSiteDataFetcher = () => Promise<JoinableSitesResponse>;

export const isResultEmpty = (result: JoinableSitesResponse) =>
  !result || !result.sites || result.sites.length === 0;

export const createJoinableSitesProvider = (
  fetchData?: JoinableSiteDataFetcher,
  product?: Product,
): ExportedDataProvider<JoinableSitesResponse> => {
  return createProviderWithCustomFetchData<JoinableSitesResponse>(
    'joinableSites',
    fetchData || defaultFetchData(product),
    isResultEmpty,
  );
};
