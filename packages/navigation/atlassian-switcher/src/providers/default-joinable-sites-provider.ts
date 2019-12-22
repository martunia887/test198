import { JoinableSitesResponse } from '../types';
import {
  createProviderWithCustomFetchData,
  ExportedDataProvider,
} from './create-data-provider';

export type JoinableSiteDataFetcher = () => Promise<JoinableSitesResponse>;

export const fetchEmptyData: JoinableSiteDataFetcher = () =>
  Promise.resolve({ sites: [] });

export const createJoinableSitesProvider = (
  fetchData: JoinableSiteDataFetcher = fetchEmptyData,
): ExportedDataProvider<JoinableSitesResponse> => {
  return createProviderWithCustomFetchData<JoinableSitesResponse>(
    'joinableSites',
    fetchData,
  );
};
