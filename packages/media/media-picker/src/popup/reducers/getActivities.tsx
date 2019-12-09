import { Action } from 'redux';
import {
  isGetActivitiesAction,
  isGetActivitiesFullfilledAction,
  isGetActivitiesFailedAction,
} from '../actions/getActivities';
import { State } from '../domain';

export const getActivitiesStarted = (state: State, action: Action): State => {
  if (isGetActivitiesAction(action)) {
    return {
      ...state,
      view: {
        ...state.view,
        path: [],
        hasError: false,
      },
    };
  } else {
    return state;
  }
};

export const getActivitiesFullfilled = (
  state: State,
  action: Action,
): State => {
  if (isGetActivitiesFullfilledAction(action)) {
    const { items } = action;

    return {
      ...state,
      view: {
        ...state.view,
        isLoading: false,
      },
      activities: items,
    };
  }

  return state;
};

export const getActivitiesFailed = (state: State, action: Action): State => {
  if (isGetActivitiesFailedAction(action)) {
    return {
      ...state,
      view: {
        ...state.view,
        hasError: true,
        isLoading: false,
      },
    };
  }

  return state;
};
