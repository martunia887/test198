import { JoinableSitesResponse, Product } from '../types';
import { JoinableSiteDataFetcher } from './default-joinable-sites-provider';

interface ExperimentApiJoinableSiteUser {
  avatarUrl: string;
  displayName: string;
  relevance?: number;
}

interface ExperimentApiJoinableSiteProducts {
  [productKey: string]: ExperimentApiJoinableSiteUser[];
}

interface ExperiementApiJoinableSite {
  cloudId: string;
  url: string;
  products: ExperimentApiJoinableSiteProducts;
  displayName: string;
  avatarUrl: string;
  relevance: number;
}

interface ExperimentApiJoinableSites {
  sites: ExperiementApiJoinableSite[];
}

const jswProducts = [
  'jira-software.ondemand',
  'jira-servicedesk.ondemand',
  'jira-core.ondemand',
  'confluence.ondemand',
];

export const emptyJoinableSites = { sites: [] };
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
  urlPrefix: string = '',
): Promise<ExperimentApiJoinableSites> => {
  return fetch(`${urlPrefix}/trello-cross-product-join/recommended-sites`, {
    method: 'post',
    body: JSON.stringify({ collaborators: [], products }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      return emptyJoinableSites;
    }
    return response.json();
  });
};

export const defaultFetchData: (
  product?: Product,
) => JoinableSiteDataFetcher = (product?: Product) => () => {
  return fetchJoinableSites(jswProducts, getUrlPrefixByProduct(product))
    .then(json => transformExperimentSitesToSwitcherSites(json))
    .catch(() => emptyJoinableSites);
};

const getUrlPrefixByProduct = (product?: Product) => {
  switch (product) {
    case Product.TRELLO:
      return 'https://api-gateway.trellis.coffee/gateway/api';
    default:
      return '/gateway/api';
  }
};
