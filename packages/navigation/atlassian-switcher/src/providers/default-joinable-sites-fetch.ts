import { JoinableSitesResponse, ProductKey } from '../types';
import { customFetchJson } from '../utils/fetch';

interface ExperimentApiJoinableSiteUser {
  avatarUrl: string;
  displayName: string;
  relevance?: number;
}

interface ExperimentApiJoinableSiteProducts {
  [productKey: string]: ExperimentApiJoinableSiteUser[];
}

interface ExperimentApiJoinableSite {
  cloudId: string;
  url: string;
  products: ExperimentApiJoinableSiteProducts;
  displayName: string;
  avatarUrl: string;
  relevance: number;
}

interface ExperimentApiJoinableSites {
  sites: ExperimentApiJoinableSite[];
}

const joinSupportedProducts: ProductKey[] = [
  ProductKey.JIRA_SOFTWARE,
  ProductKey.JIRA_SERVICE_DESK,
  ProductKey.JIRA_CORE,
  ProductKey.CONFLUENCE,
];

export const transformExperimentSitesToSwitcherSites = (
  rawResponse: ExperimentApiJoinableSites,
): JoinableSitesResponse => {
  const transformedSites = rawResponse.sites.map(site => ({
    cloudId: site.cloudId,
    url: site.url,
    users: site.products,
    displayName: site.displayName,
    avatarUrl: site.avatarUrl,
    relevance: site.relevance,
  }));
  const result = { sites: transformedSites };
  return result;
};

export const fetchJoinableSites = (
  products: string[],
  baseUrl: string = '',
  resultTransformer: (
    rawResponse: any,
  ) => JoinableSitesResponse = transformExperimentSitesToSwitcherSites,
): Promise<JoinableSitesResponse> => {
  return customFetchJson<ExperimentApiJoinableSites>(
    `${baseUrl}/gateway/api/trello-cross-product-join/recommended-sites`,
    {
      method: 'post',
      body: JSON.stringify({ products }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: baseUrl && baseUrl.length === 0 ? 'same-origin' : 'include',
    },
  ).then(json => resultTransformer(json));
};

export const defaultFetchData = () =>
  fetchJoinableSites(
    joinSupportedProducts,
    '',
    transformExperimentSitesToSwitcherSites,
  );
