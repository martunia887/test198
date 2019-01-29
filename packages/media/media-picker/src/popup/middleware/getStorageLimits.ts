import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
import {
  isGetStorageLimitsActionAction,
  getStorageLimitsFullfilled,
} from '../actions/getStorageLimits';

export const getStorageLimits = () => (store: Store<State>) => (
  next: Dispatch<Action>,
) => (action: Action) => {
  if (isGetStorageLimitsActionAction(action)) {
    requestStorageLimits(store);
  }

  return next(action);
};

export const requestStorageLimits = async (store: Store<State>) => {
  const { tenantContext, config } = store.getState();
  const { storageUsageKey } = config;

  if (storageUsageKey) {
    const limits = await tenantContext.getLimits(storageUsageKey);
    store.dispatch(getStorageLimitsFullfilled(limits));
  }
};
