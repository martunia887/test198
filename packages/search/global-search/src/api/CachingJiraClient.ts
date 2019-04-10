import { JiraResult } from '../model/Result';
import JiraClientImpl, { RecentItemsCounts } from './JiraClient';

export default class CachingJiraClient extends JiraClientImpl {
  prefetchedResults?: Promise<JiraResult[]>;

  constructor(
    url: string,
    cloudId: string,
    prefetchedResults?: Promise<JiraResult[]>,
  ) {
    super(url, cloudId);
    this.prefetchedResults = prefetchedResults;
  }

  async getRecentItems(
    searchSessionId: string,
    recentItemCounts?: RecentItemsCounts,
  ): Promise<JiraResult[]> {
    if (this.prefetchedResults) {
      return await this.prefetchedResults;
    }
    return super.getRecentItems(searchSessionId, recentItemCounts);
  }

  async canSearchUsers(): Promise<boolean> {
    return super.canSearchUsers();
  }
}
