import { JoinableSiteDataFetcher } from '../../default-joinable-sites-provider';
import fetchMock from 'fetch-mock';

describe('default-joinabble-sites-provider', () => {
  const createProviderWithCustomFetchData = jest.fn();

  jest.doMock('../../create-data-provider', () => ({
    createProviderWithCustomFetchData,
  }));

  test('should create a provider using the internal url (/gateway) by default', () => {
    const {
      createJoinableSitesProvider,
      defaultFetchData,
    } = require('../../default-joinable-sites-provider');
    createJoinableSitesProvider();
    expect(createProviderWithCustomFetchData).toBeCalledWith(
      'joinableSites',
      defaultFetchData,
    );
  });

  test('should allow to create a provider with custom endpoint url', () => {
    const {
      createJoinableSitesProvider,
    } = require('../../default-joinable-sites-provider');
    const promise: JoinableSiteDataFetcher = () =>
      new Promise(resolve => ({
        sites: [],
      }));
    createJoinableSitesProvider(promise);
    expect(createProviderWithCustomFetchData).toBeCalledWith(
      'joinableSites',
      promise,
    );
  });

  test('should return empty joinable sites when fetch could not retrieve data', async () => {
    const {
      fetchJoinableSites,
      EXPERIMENT_API_BASE_URL,
      emptyJoinableSites,
    } = require('../../default-joinable-sites-provider');
    fetchMock.post(
      `${EXPERIMENT_API_BASE_URL}/trello-cross-product-join/recommended-sites`,
      400,
    );

    const joinableSites = await fetchJoinableSites(['jira-software.ondemand']);
    expect(joinableSites).toBe(emptyJoinableSites);
  });

  test('should return joinable sites when fetch succeeds', async () => {
    const {
      fetchJoinableSites,
      EXPERIMENT_API_BASE_URL,
    } = require('../../default-joinable-sites-provider');
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
      `${EXPERIMENT_API_BASE_URL}/trello-cross-product-join/recommended-sites`,
      experimentApiSites,
      { method: 'POST', overwriteRoutes: true },
    );

    const joinableSites = await fetchJoinableSites(['jira-software.ondemand']);
    expect(joinableSites).toStrictEqual(experimentApiSites);
  });

  test('should transform experiment sites with no avatar properly', () => {
    const {
      transformExperimentSitesToSwitcherSites,
    } = require('../../default-joinable-sites-provider');
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
});
