import fetchMock from 'fetch-mock';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import { CachingPeopleSearchClient } from '../../api/CachingPeopleSearchClient';
import {
  AnalyticsType,
  ContentType,
  Result,
  ResultType,
} from '../../model/Result';
import { recentPeopleApiWillReturn } from './helpers/_people-client-mocks';

describe('CachingPeopleSearchClient', () => {
  let searchClient: PeopleSearchClient;
  const mockUser = [
    {
      id: '123',
      fullName: 'fullName',
      avatarUrl: 'avatarUrl',
      department: 'department',
      title: 'abc',
      nickname: 'nickname',
    },
  ];

  const expectedResults: Result[] = mockUser.map(person => ({
    resultType: ResultType.PersonResult,
    resultId: 'people-' + person.id,
    name: person.fullName,
    href: '/people/' + person.id,
    avatarUrl: person.avatarUrl,
    contentType: ContentType.Person,
    analyticsType: AnalyticsType.RecentPerson,
    mentionName: person.nickname,
    presenceMessage: person.title,
  }));

  beforeEach(() => {
    searchClient = new CachingPeopleSearchClient('localhost', '123');
    recentPeopleApiWillReturn(mockUser);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('getRecentItems', () => {
    it('should return the pre fetched results if present', async () => {
      searchClient = new CachingPeopleSearchClient(
        'localhost',
        '123',
        Promise.resolve(expectedResults),
      );
      const items = await searchClient.getRecentPeople();

      expect(fetchMock.called()).toBeFalsy();
      expect(items).toEqual(expectedResults);
    });

    it('should do an actual search if the pre-fetching isnt available', async () => {
      const items = await searchClient.getRecentPeople();

      expect(fetchMock.called()).toBeTruthy();
      expect(items).toEqual(expectedResults);
    });
  });
});
