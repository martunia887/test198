import fetchMock from 'fetch-mock';
import CachingConfluenceClient from '../../api/CachingConfluenceClient';
import {
  ConfluenceClient,
  RecentPage,
  RecentSpace,
} from '../../api/ConfluenceClient';
import {
  AnalyticsType,
  ConfluenceRecentsMap,
  ContainerResult,
  ContentType,
  ResultType,
} from '../../model/Result';
import {
  buildMockPage,
  DUMMY_CLOUD_ID,
  DUMMY_CONFLUENCE_HOST,
  mockRecentlyViewedPages,
  MOCK_SPACE,
  mockRecentlyViewedSpaces,
} from './helpers/_confluence-client-mocks';

describe('CachingConfluenceClient', () => {
  let confluenceClient: ConfluenceClient;

  const pages: RecentPage[] = [
    buildMockPage('page'),
    buildMockPage('blogpost'),
  ];

  const spaces: RecentSpace[] = [MOCK_SPACE, MOCK_SPACE];

  const prefetchedResults: ConfluenceRecentsMap = {
    objects: pages.map(page => ({
      resultId: page.id,
      name: page.title,
      href: `${DUMMY_CONFLUENCE_HOST}${page.url}?search_id=search_id`,
      containerName: page.space,
      analyticsType: AnalyticsType.RecentConfluence,
      resultType: ResultType.ConfluenceObjectResult,
      contentType: `confluence-${page.contentType}` as ContentType,
      containerId: 'abc',
      iconClass: 'iconClass',
    })),
    spaces: spaces.map(space => ({
      resultId: space.id,
      name: space.name,
      href: `${DUMMY_CONFLUENCE_HOST}/spaces/${
        space.key
      }/overview?search_id=search_id`,
      avatarUrl: space.icon,
      analyticsType: AnalyticsType.RecentConfluence,
      resultType: ResultType.GenericContainerResult,
      contentType: ContentType.ConfluenceSpace,
    })),
  };

  beforeEach(() => {
    confluenceClient = new CachingConfluenceClient(
      DUMMY_CONFLUENCE_HOST,
      DUMMY_CLOUD_ID,
    );
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('getRecentItems', () => {
    const expectedResults = [
      {
        resultId: pages[0].id,
        name: pages[0].title,
        href: `${DUMMY_CONFLUENCE_HOST}${pages[0].url}?search_id=search_id`,
        containerName: pages[0].space,
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.ConfluenceObjectResult,
        contentType: ContentType.ConfluencePage,
        containerId: 'abc',
        iconClass: 'iconClass',
      },
      {
        resultId: pages[1].id,
        name: pages[1].title,
        href: `${DUMMY_CONFLUENCE_HOST}${pages[1].url}?search_id=search_id`,
        containerName: pages[1].space,
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.ConfluenceObjectResult,
        contentType: ContentType.ConfluenceBlogpost,
        containerId: 'abc',
        iconClass: 'iconClass',
      },
    ];

    it('should return the pre fetched results if present', async () => {
      confluenceClient = new CachingConfluenceClient(
        DUMMY_CONFLUENCE_HOST,
        DUMMY_CLOUD_ID,
        Promise.resolve(prefetchedResults),
      );

      expect(fetchMock.called()).toBeFalsy();
      const result = await confluenceClient.getRecentItems('search_id');
      expect(result).toEqual(expectedResults);
    });

    it('should do an actual search if the pre-fetching isnt available', async () => {
      mockRecentlyViewedPages(pages);

      const result = await confluenceClient.getRecentItems('search_id');
      expect(fetchMock.called()).toBeTruthy();
      expect(result).toEqual(expectedResults);
    });
  });

  describe('getRecentSpaces', () => {
    const expectedResults: ContainerResult[] = [
      {
        resultId: MOCK_SPACE.id,
        name: MOCK_SPACE.name,
        href: `${DUMMY_CONFLUENCE_HOST}/spaces/${
          MOCK_SPACE.key
        }/overview?search_id=search_id`,
        avatarUrl: MOCK_SPACE.icon,
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.GenericContainerResult,
        contentType: ContentType.ConfluenceSpace,
      },
      {
        resultId: MOCK_SPACE.id,
        name: MOCK_SPACE.name,
        href: `${DUMMY_CONFLUENCE_HOST}/spaces/${
          MOCK_SPACE.key
        }/overview?search_id=search_id`,
        avatarUrl: MOCK_SPACE.icon,
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.GenericContainerResult,
        contentType: ContentType.ConfluenceSpace,
      },
    ];

    it('should return the pre fetched results if present', async () => {
      confluenceClient = new CachingConfluenceClient(
        DUMMY_CONFLUENCE_HOST,
        DUMMY_CLOUD_ID,
        Promise.resolve(prefetchedResults),
      );

      expect(fetchMock.called()).toBeFalsy();
      const result = await confluenceClient.getRecentSpaces('search_id');
      expect(result).toEqual(expectedResults);
    });

    it('should do an actual search if the pre-fetching isnt available', async () => {
      mockRecentlyViewedSpaces(spaces);

      const result = await confluenceClient.getRecentSpaces('search_id');
      expect(fetchMock.called()).toBeTruthy();
      expect(result).toEqual(expectedResults);
    });
  });
});
