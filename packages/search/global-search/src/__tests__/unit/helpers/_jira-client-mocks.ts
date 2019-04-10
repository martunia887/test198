import fetchMock from 'fetch-mock';

import { JiraResult } from 'src/model/Result';
import { JiraMyPermissionsResponse } from '../../../api/JiraClient';

export const DUMMY_JIRA_HOST = 'http://localhost';
export const DUMMY_CLOUD_ID = '123';

export function mockRecentlyViewItems(results: JiraResult[]) {
  fetchMock.get(
    'begin:http://localhost/rest/internal/2/productsearch/recent',
    results,
  );
}

export function mockUserPermissions(permissions: JiraMyPermissionsResponse) {
  fetchMock.get(
    'begin:http://localhost/rest/api/2/mypermissions?permissions=USER_PICKER',
    permissions,
  );
}
