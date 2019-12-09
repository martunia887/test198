import { Action } from 'redux';
import { Activities } from '../domain/activities';

export const GET_ACTIVITIES = 'GET_ACTIVITIES';

export interface GetActivitiesAction extends Action {
  type: 'GET_ACTIVITIES';
}

export const isGetActivitiesAction = (
  action: Action,
): action is GetActivitiesAction => {
  return action.type === GET_ACTIVITIES;
};

export const getActivities = (): GetActivitiesAction => {
  return {
    type: GET_ACTIVITIES,
  };
};

export const GET_ACTIVITIES_FULLFILLED = 'GET_ACTIVITIES_FULLFILLED';

export interface GetActivitiesFullfilledAction {
  readonly type: 'GET_ACTIVITIES_FULLFILLED';
  readonly items: Activities;
}

export const isGetActivitiesFullfilledAction = (
  action: Action,
): action is GetActivitiesFullfilledAction => {
  return action.type === GET_ACTIVITIES_FULLFILLED;
};

export function getActivitiesFullfilled(
  items: Activities,
): GetActivitiesFullfilledAction {
  return {
    type: GET_ACTIVITIES_FULLFILLED,
    items,
  };
}

export const GET_ACTIVITIES_FAILED = 'GET_ACTIVITIES_FAILED';

export interface GetActivitiesFailedAction {
  readonly type: 'GET_ACTIVITIES_FAILED';
}

export const isGetActivitiesFailedAction = (
  action: Action,
): action is GetActivitiesFailedAction => {
  return action.type === GET_ACTIVITIES_FAILED;
};

export function getActivitiesFailed(): GetActivitiesFailedAction {
  return {
    type: GET_ACTIVITIES_FAILED,
  };
}
