import fetchMock from 'fetch-mock';
import {
  fetchJoinableSites,
  emptyJoinableSites,
  transformExperimentSitesToSwitcherSites,
} from '../../default-joinable-sites-fetch';

describe('default-joinabble-sites-fetch', () => {
  test('should return empty joinable sites when fetch could not retrieve data', async () => {
    fetchMock.post(
      `gateway/api/trello-cross-product-join/recommended-sites`,
      400,
    );

    const joinableSites = await fetchJoinableSites(['jira-software.ondemand']);
    expect(joinableSites).toBe(emptyJoinableSites);
  });

  test('should return joinable sites when fetch succeeds', async () => {
    const experimentApiSites = {
      sites: [
        {
          cloudId: 'cloud-1',
          url: 'https://teamsinspace.com',
          products: {
            'jira-software.ondemand': [],
          },
          displayName: 'Example',
          avatarUrl: 'http://avatarSite/avatar',
          relevance: 0,
        },
      ],
    };
    fetchMock.post(
      `gateway/api/trello-cross-product-join/recommended-sites`,
      experimentApiSites,
      { method: 'POST', overwriteRoutes: true },
    );

    const joinableSites = await fetchJoinableSites(['jira-software.ondemand']);
    expect(joinableSites).toStrictEqual(experimentApiSites);
  });

  test('should transform experiment sites with no avatar properly', () => {
    const experimentApiSites = {
      sites: [
        {
          cloudId: 'cloud-1',
          url: 'https://teamsinspace.com',
          products: {
            'jira-software.ondemand': [],
          },
          displayName: 'Example',
          avatarUrl: 'http://avatarSite/avatar',
          relevance: 0,
        },
      ],
    };
    const expectedTransformation = {
      sites: [
        {
          cloudId: 'cloud-1',
          url: 'https://teamsinspace.com',
          users: {
            'jira-software.ondemand': [],
          },
          displayName: 'Example',
          avatarUrl: 'http://avatarSite/avatar',
          relevance: 0,
        },
      ],
    };
    const transformedSites = transformExperimentSitesToSwitcherSites(
      experimentApiSites,
    );
    expect(transformedSites).toStrictEqual(expectedTransformation);
  });

  test('should transform empty sites as is', () => {
    const experimentApiSites = {
      sites: [],
    };
    const expectedTransformation = {
      sites: [],
    };
    const transformedSites = transformExperimentSitesToSwitcherSites(
      experimentApiSites,
    );
    expect(transformedSites).toStrictEqual(expectedTransformation);
  });
});
