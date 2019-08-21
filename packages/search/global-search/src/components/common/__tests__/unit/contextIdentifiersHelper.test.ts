import {
  attachConfluenceContextIdentifiers,
  attachJiraContextIdentifiers,
  AWC_SEARCH_SESSION_ID_TASK_NAME,
} from '../../contextIdentifiersHelper';
import {
  AnalyticsType,
  ConfluenceResultsMap,
  ContentType,
  ResultType,
  Result,
  JiraResultsMap,
} from '../../../../model/Result';
import {
  noopTaskSessionClient,
  AWCTaskSessionClient,
} from '../../../../util/AnalyticsWebClientTaskSessionHelper';

const searchSessionId = 'searchSessionId';

const confluenceBaseResults: ConfluenceResultsMap = {
  objects: {
    items: [
      {
        resultId: 'resultId',
        name: 'name',
        href: 'http://localhost/',
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.ConfluenceObjectResult,
        contentType: ContentType.ConfluencePage,
        containerName: 'space',
        containerId: 'space-id',
        friendlyLastModified: 'friendly-last-modified',
      },
    ],
    totalSize: 1,
  },
  spaces: {
    items: [
      {
        resultId: 'resultId',
        name: 'name',
        href: 'http://localhost/',
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.GenericContainerResult,
        contentType: ContentType.ConfluenceSpace,
      },
    ],
    totalSize: 1,
  },
  people: {
    items: [
      {
        resultId: 'resultId',
        name: 'name',
        href: 'http://localhost/',
        analyticsType: AnalyticsType.RecentPerson,
        resultType: ResultType.PersonResult,
        contentType: ContentType.Person,
        mentionName: 'mentionName',
        presenceMessage: 'prescenceMessage',
      },
    ],
    totalSize: 1,
  },
};

const getJiraBaseResults = (result?: Partial<Result>): JiraResultsMap => ({
  objects: [
    {
      resultId: 'resultId',
      name: 'name',
      href: 'http://localhost/',
      containerId: 'containerId',
      analyticsType: AnalyticsType.RecentJira,
      resultType: ResultType.JiraObjectResult,
      contentType: ContentType.JiraIssue,
      ...result,
    },
  ],
  containers: [
    {
      resultId: 'resultId',
      name: 'name',
      href: 'http://localhost/',
      containerId: 'containerId',
      analyticsType: AnalyticsType.RecentJira,
      resultType: ResultType.JiraProjectResult,
      contentType: ContentType.JiraProject,
      ...result,
    },
  ],
  people: [
    {
      resultId: 'resultId',
      name: 'name',
      href: 'http://localhost/',
      containerId: 'containerId',
      analyticsType: AnalyticsType.RecentPerson,
      resultType: ResultType.PersonResult,
      contentType: ContentType.Person,
      ...result,
    },
  ],
});

describe('searchSessionUtils', () => {
  it('attaches the search session id in confluence', () => {
    const { objects, spaces, people } = attachConfluenceContextIdentifiers(
      searchSessionId,
      confluenceBaseResults,
      noopTaskSessionClient,
    );

    expect(objects.items.map(o => o.href)).toEqual([
      'http://localhost/?search_id=searchSessionId',
    ]);
    expect(spaces.items.map(o => o.href)).toEqual([
      'http://localhost/?search_id=searchSessionId',
    ]);
    expect(people.items.map(o => o.href)).toEqual(['http://localhost/']);
  });

  it('attaches the search session id and others in jira', () => {
    const { objects, containers, people } = attachJiraContextIdentifiers(
      searchSessionId,
      getJiraBaseResults(),
      noopTaskSessionClient,
    );

    expect(objects.map(o => o.href)).toEqual([
      'http://localhost/?searchSessionId=searchSessionId&searchContainerId=containerId&searchContentType=issue&searchObjectId=resultId',
    ]);
    expect(containers.map(o => o.href)).toEqual([
      'http://localhost/?searchSessionId=searchSessionId&searchContainerId=containerId&searchContentType=project&searchObjectId=resultId',
    ]);
    expect(people.map(o => o.href)).toEqual(['http://localhost/']);
  });

  it('attaches everything but not the container id jira', () => {
    const { objects, containers, people } = attachJiraContextIdentifiers(
      searchSessionId,
      getJiraBaseResults({ containerId: undefined }),
      noopTaskSessionClient,
    );

    expect(objects.map(o => o.href)).toEqual([
      'http://localhost/?searchSessionId=searchSessionId&searchContentType=issue&searchObjectId=resultId',
    ]);
    expect(containers.map(o => o.href)).toEqual([
      'http://localhost/?searchSessionId=searchSessionId&searchContentType=project&searchObjectId=resultId',
    ]);
    expect(people.map(o => o.href)).toEqual(['http://localhost/']);
  });

  describe('works with awc task sessions', () => {
    let formatFn: jest.Mock;
    let createTaskSessionFn: jest.Mock;
    let taskSessionClient: AWCTaskSessionClient;

    beforeEach(() => {
      formatFn = jest.fn(url => url);
      createTaskSessionFn = jest.fn();
      taskSessionClient = {
        ...noopTaskSessionClient,
        createTaskSessionWithProvidedId: createTaskSessionFn,
        formatTaskSessionQueryString: formatFn,
      };
    });

    it('works for conflunece', () => {
      attachConfluenceContextIdentifiers(
        searchSessionId,
        confluenceBaseResults,
        taskSessionClient,
      );

      expect(createTaskSessionFn).toBeCalledWith(
        AWC_SEARCH_SESSION_ID_TASK_NAME,
        searchSessionId,
      );
      expect(formatFn).toHaveBeenCalledWith({
        taskSessions: ['searchSessionId'],
        uri: 'http://localhost/?search_id=searchSessionId',
      });
    });

    it('works for jira', () => {
      attachJiraContextIdentifiers(
        searchSessionId,
        getJiraBaseResults({ containerId: undefined }),
        taskSessionClient,
      );

      expect(createTaskSessionFn).toBeCalledWith(
        AWC_SEARCH_SESSION_ID_TASK_NAME,
        searchSessionId,
      );
      expect(formatFn).toHaveBeenCalledWith({
        taskSessions: ['searchSessionId'],
        uri: 'http://localhost/?searchSessionId=searchSessionId',
      });
    });
  });
});
