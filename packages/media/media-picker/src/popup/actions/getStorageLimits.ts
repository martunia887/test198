import { Action } from 'redux';
import { LimitsPayload } from '@atlaskit/media-store';

export const GET_STORAGE_LIMITS = 'GET_STORAGE_LIMITS';

export interface GetStorageLimitsAction extends Action {
  type: 'GET_STORAGE_LIMITS';
}

export const isGetStorageLimitsActionAction = (
  action: Action,
): action is GetStorageLimitsAction => {
  return action.type === GET_STORAGE_LIMITS;
};

export const getStorageLimits = (): GetStorageLimitsAction => {
  return {
    type: GET_STORAGE_LIMITS,
  };
};

export const GET_STORAGE_LIMITS_FULLFILLED = 'GET_STORAGE_LIMITS_FULLFILLED';

export interface GetStorageLimitsFullfilledAction {
  readonly type: 'GET_STORAGE_LIMITS_FULLFILLED';
  readonly limits: LimitsPayload;
}

export const isGetStorageLimitsFullfilledAction = (
  action: Action,
): action is GetStorageLimitsFullfilledAction => {
  return action.type === GET_STORAGE_LIMITS_FULLFILLED;
};

export function getStorageLimitsFullfilled(
  limits: LimitsPayload,
): GetStorageLimitsFullfilledAction {
  return {
    type: GET_STORAGE_LIMITS_FULLFILLED,
    limits,
  };
}
