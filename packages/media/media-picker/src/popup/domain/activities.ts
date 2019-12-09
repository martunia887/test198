export enum VIEWED_EVENT {
  VIEWED = 'VIEWED',
}

export enum WORKED_EVENT {
  COMMENTED = 'COMMENTED',
  CREATED = 'CREATED',
  EDITED = 'EDITED',
  PUBLISHED = 'PUBLISHED',
  UPDATED = 'UPDATED',
}

export type ACTIVITY_EVENT_TYPE = VIEWED_EVENT | WORKED_EVENT;

export interface ActivityContainer {
  name: string;
}

export interface ActivityContributor {
  accountID: string;
  name?: string;
  picture: string;
}

export interface ActivityObjectItem {
  cloudID: string;
  iconURL: string;
  id: string;
  name: string;
  product: string;
  url: string;
}

export interface ActivityItem {
  container: ActivityContainer;
  contributors: ActivityContributor[];
  eventType: ACTIVITY_EVENT_TYPE;
  object: ActivityObjectItem;
  timestamp: string;
}

export interface ActivityContributorConnection {
  profile: {
    accountId: string;
    name?: string;
    picture: string;
  };
}

export interface ActivityConnectionItem {
  containers?: ActivityContainer[];
  contributors?: ActivityContributorConnection[];
  eventType: ACTIVITY_EVENT_TYPE;
  id: string;
  object: ActivityObjectItem;
  timestamp: string;
}

export interface ActivityConnection {
  nodes?: ActivityConnectionItem[];
}

export interface Activities {
  viewed: ActivityConnection;
  workedOn: ActivityConnection;
}
