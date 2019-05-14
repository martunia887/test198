import {
  ResultsGroup,
  JiraResultsMap,
  GenericResultMap,
  Result,
  ResultType,
  AnalyticsType,
  ContentType,
} from '../../model/Result';
import {
  take,
  getJiraAdvancedSearchUrl,
  JiraEntityTypes,
} from '../SearchResultsUtil';
import { messages } from '../../messages';
import { JiraApplicationPermission } from '../GlobalQuickSearchWrapper';

const MAX_OBJECTS = 8;
const MAX_CONTAINERS = 6;
const MAX_PEOPLE = 3;

const DEFAULT_JIRA_RESULTS_MAP: GenericResultMap = {
  objects: [] as Result[],
  containers: [],
};

const isEmpty = (arr: Array<any> = []) => !arr.length;

const hasNoResults = (
  objects: Array<Result> = [],
  poeple: Array<Result> = [],
  containers: Array<Result> = [],
): boolean => isEmpty(objects) && isEmpty(poeple) && isEmpty(containers);

export const sliceResults = (resultsMap: GenericResultMap | null) => {
  const { objects, containers, people } = resultsMap
    ? resultsMap
    : DEFAULT_JIRA_RESULTS_MAP;

  const [objectsToDisplay, peopleToDisplay, containersToDisplay] = [
    { items: objects, count: MAX_OBJECTS },
    { items: people, count: MAX_PEOPLE },
    { items: containers, count: MAX_CONTAINERS },
  ].map(({ items, count }) => take(items, count));

  return {
    objectsToDisplay,
    containersToDisplay,
    peopleToDisplay,
  };
};

export const mapRecentResultsToUIGroups = (
  recentlyViewedObjects: JiraResultsMap | null,
  appPermission?: JiraApplicationPermission,
): ResultsGroup[] => {
  const {
    objectsToDisplay,
    peopleToDisplay,
    containersToDisplay,
  } = sliceResults(recentlyViewedObjects);

  return [
    {
      items: objectsToDisplay,
      key: 'issues',
      title: messages.jira_recent_issues_heading,
    },
    {
      items: containersToDisplay,
      key: 'containers',
      title:
        appPermission && !appPermission.hasSoftwareAccess
          ? messages.jira_recent_core_containers
          : messages.jira_recent_containers,
    },
    {
      items: peopleToDisplay,
      key: 'people',
      title: messages.jira_recent_people_heading,
    },
  ];
};

export const mapSearchResultsToUIGroups = (
  searchResultsObjects: JiraResultsMap | null,
  appPermission?: JiraApplicationPermission,
  query?: string,
): ResultsGroup[] => {
  const {
    objectsToDisplay,
    peopleToDisplay,
    containersToDisplay,
  } = sliceResults(searchResultsObjects);
  return [
    {
      items: objectsToDisplay,
      key: 'issues',
      title: messages.jira_search_result_issues_heading,
    },
    ...(!hasNoResults(objectsToDisplay, peopleToDisplay, containersToDisplay)
      ? [
          {
            items: [
              {
                resultType: ResultType.JiraIssueAdvancedSearch,
                resultId: 'search-jira',
                name: 'jira',
                href: getJiraAdvancedSearchUrl(JiraEntityTypes.Issues, query),
                analyticsType: AnalyticsType.LinkPostQueryAdvancedSearchJira,
                contentType: ContentType.JiraIssue,
              },
            ],
            key: 'issue-advanced',
            title: isEmpty(objectsToDisplay)
              ? messages.jira_search_result_issues_heading
              : undefined,
          },
        ]
      : []),
    {
      items: containersToDisplay,
      key: 'containers',
      title:
        appPermission && !appPermission.hasSoftwareAccess
          ? messages.jira_search_result_core_containers_heading
          : messages.jira_search_result_containers_heading,
    },
    {
      items: peopleToDisplay,
      key: 'people',
      title: messages.jira_search_result_people_heading,
    },
  ];
};
