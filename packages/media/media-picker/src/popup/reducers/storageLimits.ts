import { Action } from 'redux';
import { State } from '../domain';
import { isGetStorageLimitsFullfilledAction } from '../actions/getStorageLimits';

export const getStorageLimitsFullfilled = (
  state: State,
  action: Action,
): State => {
  if (isGetStorageLimitsFullfilledAction(action)) {
    const { limits } = action;

    return {
      ...state,
      storageLimits: limits,
    };
  }

  return state;
};
