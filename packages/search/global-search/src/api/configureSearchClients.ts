import CachingConfluenceClient from './CachingConfluenceClient';
import { CachingPeopleSearchClient } from './CachingPeopleSearchClient';
import { ConfluenceClient } from './ConfluenceClient';
import CachingCrossProductSearchClientImpl, {
  CrossProductSearchClient,
} from './CrossProductSearchClient';
import JiraClientImpl, { JiraClient } from './JiraClient';
import { PeopleSearchClient } from './PeopleSearchClient';
import {
  ConfluencePrefetchedResults,
  GlobalSearchPrefetchedResults,
} from './prefetchResults';
import RecentSearchClientImpl, {
  RecentSearchClient,
} from './RecentSearchClient';
import memoizeOne from 'memoize-one';
import deepEqual from 'deep-equal';

export interface SearchClients {
  recentSearchClient: RecentSearchClient;
  crossProductSearchClient: CrossProductSearchClient;
  peopleSearchClient: PeopleSearchClient;
  confluenceClient: ConfluenceClient;
  jiraClient: JiraClient;
}

export interface Config {
  activityServiceUrl: string;
  searchAggregatorServiceUrl: string;
  directoryServiceUrl: string;
  confluenceUrl: string;
  jiraUrl: string;
}

const defaultConfig: Config = {
  activityServiceUrl: '/gateway/api/activity',
  searchAggregatorServiceUrl: '/gateway/api/xpsearch-aggregator',
  directoryServiceUrl: '/gateway/api/directory',
  confluenceUrl: '/wiki',
  jiraUrl: '',
};

function configureSearchClients(
  cloudId: string,
  partialConfig: Partial<Config>,
  prefetchedResults?: GlobalSearchPrefetchedResults,
): SearchClients {
  const config = {
    ...defaultConfig,
    ...partialConfig,
  };

  const confluencePrefetchedResults =
    prefetchedResults &&
    (<ConfluencePrefetchedResults>prefetchedResults)
      .confluenceRecentItemsPromise
      ? (<ConfluencePrefetchedResults>prefetchedResults)
          .confluenceRecentItemsPromise
      : undefined;

  return {
    recentSearchClient: new RecentSearchClientImpl(
      config.activityServiceUrl,
      cloudId,
    ),
    crossProductSearchClient: new CachingCrossProductSearchClientImpl(
      config.searchAggregatorServiceUrl,
      cloudId,
      prefetchedResults,
    ),
    peopleSearchClient: new CachingPeopleSearchClient(
      config.directoryServiceUrl,
      cloudId,
    ),
    confluenceClient: new CachingConfluenceClient(
      config.confluenceUrl,
      confluencePrefetchedResults,
    ),
    jiraClient: new JiraClientImpl(config.jiraUrl, cloudId),
  };
}

export default memoizeOne(configureSearchClients, deepEqual);
