import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
import { getActivitiesFullfilled, getActivitiesFailed } from '../actions';
import { isGetActivitiesAction } from '../actions/getActivities';

const BASE_URL = 'https://api-private.stg.atlassian.com';
const GRAPHQL_PATH = '/graphql';

const ACTIVITIES_LIMIT = 50;
const ACTIVITIES = `
  nodes {
    id
    timestamp
    eventType
    object {
      id
      name
      cloudID
      url
      iconURL
    }
    containers {
      name
    }
    contributors {
      profile {
        accountId
        name
        picture
      }
    }
  }
`;
const ACTIVITIES_QUERY = `
    query start_MyActivity($first: Int) {
      myActivities {
        workedOn(first: $first) {
          ${ACTIVITIES}
        }
        viewed(first: $first) {
          ${ACTIVITIES}
        }
      }
    }
    `;

export const getActivities = () => (store: Store<State>) => (
  next: Dispatch<Action>,
) => (action: Action) => {
  if (isGetActivitiesAction(action)) {
    requestActivities(store);
  }

  return next(action);
};

export const requestActivities = (store: Store<State>): void => {
  const { dispatch } = store;
  const request = fetch(BASE_URL + GRAPHQL_PATH, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      operationName: 'start_MyActivity',
      query: ACTIVITIES_QUERY,
      variables: {
        first: ACTIVITIES_LIMIT,
      },
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  request
    .then(response => response.json())
    .then(response => {
      dispatch(getActivitiesFullfilled(response.data.myActivities));
    })
    .catch((_err: any) => {
      dispatch(getActivitiesFailed());
    });
};
