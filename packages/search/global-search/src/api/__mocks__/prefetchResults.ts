import { ConfluenceRecentsMap, JiraResult, Result } from '../../model/Result';

const confluenceRecentItemsPromise: Promise<
  ConfluenceRecentsMap
> = Promise.resolve({
  objects: [],
  spaces: [],
});

const jiraRecentItemsPromise: Promise<JiraResult[]> = Promise.resolve([]);

const abTestPromise: Promise<Result[]> = Promise.resolve([]);
const recentPeoplePromise: Promise<Result[]> = Promise.resolve([]);

export const getConfluencePrefetchedData = jest.fn(() => {
  return {
    confluenceRecentItemsPromise,
    abTestPromise,
    recentPeoplePromise,
  };
});

export const getJiraPrefetchedData = jest.fn(() => {
  return {
    jiraRecentItemsPromise,
    abTestPromise,
    recentPeoplePromise,
  };
});

export {
  confluenceRecentItemsPromise,
  jiraRecentItemsPromise,
  abTestPromise,
  recentPeoplePromise,
};
