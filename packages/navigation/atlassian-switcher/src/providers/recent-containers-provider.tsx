import React from 'react';
import asDataProvider, {
  ProviderResult,
  ResultComplete,
  Status,
} from './as-data-provider';
import {
  RecentContainersResponse,
  RecentContainerType,
  WithCloudId,
} from '../types';
import { fetchJson, postJson } from '../utils/fetch';

// DEPRECATED - Fetch recent containers from activity-service
const fetchRecentContainersFromActivityService = ({ cloudId }: WithCloudId) =>
  fetchJson<RecentContainersResponse>(
    `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
  );

// Fetch recent containers from activity-platform via graphql gateway
interface APRecentContainersResponse {
  data?: {
    myActivities?: {
      all?: {
        nodes?: {
          object: {
            id: string;
            name: string;
            url: string;
            iconURL: string;
            type: string;
          };
        }[];
      };
    };
  };
}

const recentContainersQuery = (cloudId: string = '') => `
  {
    myActivities {
      all(first: 10, filter: { objectTypes: [SPACE, PROJECT], cloudIDs: [${cloudId}] }) {
        nodes {
          object {
            id
            name
            url
            iconURL
            type
          }
        }
      }
    }
  }
`;

const fetchRecentContainersFromActivityPlatform = (params: {
  cloudId?: string;
}): Promise<RecentContainersResponse> =>
  postJson<APRecentContainersResponse>(`/gateway/api/graphql`, {
    query: recentContainersQuery(params.cloudId),
  }).then(response => {
    const data = response.data || {};
    const myActivities = data.myActivities || {};
    const all = myActivities.all || {};
    const nodes = all.nodes || [];

    return {
      data: nodes.map(node => ({
        objectId: node.object.id,
        name: node.object.name,
        url: node.object.url,
        iconUrl: node.object.iconURL,
        type:
          node.object.type === 'SPACE'
            ? RecentContainerType.CONFLUENCE_SPACE
            : RecentContainerType.JIRA_PROJECT,
      })),
    };
  });

const LegacyRecentContainers = asDataProvider(
  'legacyRecentContainers',
  fetchRecentContainersFromActivityService,
);

const RecentContainers = asDataProvider(
  'recentContainers',
  fetchRecentContainersFromActivityPlatform,
);

const emptyRecentContainers: ResultComplete<RecentContainersResponse> = {
  status: Status.COMPLETE,
  data: { data: [] },
};

type Params = {
  isUsingAPRecentContainers?: boolean;
  disableRecentContainers?: boolean;
  children: (
    recentContainers: ProviderResult<RecentContainersResponse>,
  ) => React.ReactNode;
  cloudId?: string;
};

export const RecentContainersProvider = (params: Params) => {
  const {
    cloudId,
    disableRecentContainers,
    isUsingAPRecentContainers,
    children,
  } = params;

  if (disableRecentContainers || !cloudId) {
    return <React.Fragment>{children(emptyRecentContainers)}</React.Fragment>;
  }

  if (isUsingAPRecentContainers) {
    return <RecentContainers cloudId={cloudId}>{children}</RecentContainers>;
  }
  return (
    <LegacyRecentContainers cloudId={cloudId}>
      {children}
    </LegacyRecentContainers>
  );
};
