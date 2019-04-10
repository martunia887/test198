import fetchMock from 'fetch-mock';
import CachingJiraClient from '../../../api/CachingJiraClient';
import { JiraClient } from '../../../api/JiraClient';
import { JiraResult } from '../../../model/Result';
import {
  DUMMY_CLOUD_ID,
  DUMMY_JIRA_HOST,
  mockRecentlyViewItems,
  mockUserPermissions,
} from '../helpers/_jira-client-mocks';

describe('CachingJiraClient', () => {
  let jiraClient: JiraClient;

  const results: JiraResult[] = [];

  const prefetchedResults: JiraResult[] = results;

  beforeEach(() => {
    jiraClient = new CachingJiraClient(DUMMY_JIRA_HOST, DUMMY_CLOUD_ID);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('getRecentItems', () => {
    const expectedResults: JiraResult[] = [];

    it('should return the pre fetched results if present', async () => {
      jiraClient = new CachingJiraClient(
        DUMMY_JIRA_HOST,
        DUMMY_CLOUD_ID,
        Promise.resolve(prefetchedResults),
      );

      expect(fetchMock.called()).toBeFalsy();
      const result = await jiraClient.getRecentItems('search_id');
      expect(result).toEqual(expectedResults);
    });

    it('should do an actual search if the pre-fetching isnt available', async () => {
      mockRecentlyViewItems(results);

      const result = await jiraClient.getRecentItems('search_id');
      expect(fetchMock.called()).toBeTruthy();
      expect(result).toEqual(expectedResults);
    });
  });

  describe('canSearchUsers', () => {
    it('should always pass through', async () => {
      mockUserPermissions({
        permissions: {
          USER_PICKER: {
            havePermission: false,
          },
        },
      });
      const result = await jiraClient.canSearchUsers();
      expect(fetchMock.called()).toBeTruthy();
      expect(result).toEqual(false);
    });
  });
});
