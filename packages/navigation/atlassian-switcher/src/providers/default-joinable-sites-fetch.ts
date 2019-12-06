import { JoinableSitesResponse } from '../types';

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

const joinSupportedProducts = [
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
  baseUrl: string = '',
  resultTransformer?: (rawResponse: any) => JoinableSitesResponse,
): Promise<JoinableSitesResponse> => {
  return fetch(
    `${baseUrl}/gateway/api/trello-cross-product-join/recommended-sites`,
    {
      method: 'post',
      body: JSON.stringify({ products }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(response => {
    if (!response.ok) {
      return emptyJoinableSites;
    }
    const json = response.json();
    json.then(json => (resultTransformer ? resultTransformer(json) : json));
    json.catch(() => emptyJoinableSites);
    return json;
  });
};

export const defaultFetchData = () =>
  fetchJoinableSites(
    joinSupportedProducts,
    '',
    transformExperimentSitesToSwitcherSites,
  );
