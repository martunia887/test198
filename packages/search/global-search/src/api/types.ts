export enum Scope {
  ConfluencePageBlog = 'confluence.page,blogpost',
  ConfluencePageBlogAttachment = 'confluence.page,blogpost,attachment',
  ConfluenceSpace = 'confluence.space',
  JiraIssue = 'jira.issue',
  JiraBoard = 'jira.board',
  JiraProject = 'jira.project',
  JiraFilter = 'jira.filter',
  JiraBoardProjectFilter = 'jira.board,project,filter',
  People = 'cpus.user',
}

export type QuickSearchContext = 'jira' | 'confluence' | 'home';

type ConfluenceItemContentType = 'page' | 'blogpost';
export interface ConfluenceItem {
  title: string; // this is highlighted
  baseUrl: string;
  url: string;
  content?: {
    id: string;
    type: ConfluenceItemContentType;
    space?: {
      id: string;
    };
  };
  container: {
    title: string; // this is unhighlighted
    displayUrl: string;
  };
  space?: {
    key: string; // currently used as instance-unique ID
    icon: {
      path: string;
    };
  };
  iconCssClass: string; // icon-file-* for attachments, otherwise not needed
}

export interface JiraItemV1 {
  key: string;
  fields: {
    summary: string;
    project: {
      name: string;
    };
    issuetype: {
      iconUrl: string;
    };
  };
}

export interface JiraItemAvatar {
  url?: string;
  css?: string;
  urls?: Record<string, string>;
}

export interface JiraItemAttributes {
  '@type': 'issue' | 'board' | 'project' | 'filter';
  containerId?: string;
  containerName?: string;
  ownerId?: string;
  ownerName?: string;
  key?: string;
  issueTypeId?: string;
  issueTypeName?: string;
  projectType?: string;
  avatar?: JiraItemAvatar;
}

export interface JiraItemV2 {
  id: string;
  name: string;
  url: string;
  attributes: JiraItemAttributes;
}

export type JiraItem = JiraItemV1 | JiraItemV2;

export interface PersonItem {
  account_id: string;
  name: string;
  nickname?: string;
  job_title?: string;
  picture: string;
}

export interface JiraResultQueryParams {
  searchSessionId: string;
  searchContainerId?: string;
  searchObjectId?: string;
  searchContentType?: 'issue' | 'board' | 'project' | 'filter';
}
