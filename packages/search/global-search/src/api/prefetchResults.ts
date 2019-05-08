import { ConfluenceRecentsMap, JiraResultsMap, Result } from '../model/Result';
import configureSearchClients from './configureSearchClients';
import { ConfluenceClient } from './ConfluenceClient';
import { ABTest } from './CrossProductSearchClient';
import { Scope } from './types';

interface CommonPrefetchedResults {
  abTestPromise: Promise<ABTest>;
  recentPeoplePromise: Promise<Result[]>;
}

export interface ConfluencePrefetchedResults extends CommonPrefetchedResults {
  confluenceRecentItemsPromise: Promise<ConfluenceRecentsMap>;
}

export interface JiraPrefetchedResults extends CommonPrefetchedResults {
  jiraRecentItemsPromise: Promise<JiraResultsMap>;
}

export type GlobalSearchPrefetchedResults =
  | ConfluencePrefetchedResults
  | JiraPrefetchedResults;

const PREFETCH_SEARCH_SESSION_ID = 'prefetch-unavailable';

const prefetchConfluence = async (
  confluenceClient: ConfluenceClient,
): Promise<ConfluenceRecentsMap> => {
  const [objects, spaces] = await Promise.all([
    confluenceClient.getRecentItems(PREFETCH_SEARCH_SESSION_ID),
    confluenceClient.getRecentSpaces(PREFETCH_SEARCH_SESSION_ID),
  ]);

  return {
    objects,
    spaces,
  };
};

export const getConfluencePrefetchedData = (
  cloudId: string,
  confluenceUrl?: string,
): ConfluencePrefetchedResults => {
  const config = confluenceUrl
    ? {
        confluenceUrl,
      }
    : {};
  const {
    confluenceClient,
    crossProductSearchClient,
    peopleSearchClient,
  } = configureSearchClients(cloudId, config);
  return {
    confluenceRecentItemsPromise: prefetchConfluence(confluenceClient),
    abTestPromise: crossProductSearchClient.getAbTestData(
      Scope.ConfluencePageBlogAttachment,
    ),
    recentPeoplePromise: peopleSearchClient.getRecentPeople(),
  };
};
