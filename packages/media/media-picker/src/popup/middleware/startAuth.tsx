import { Store, Dispatch } from 'redux';

import { changeAccount } from '../actions/changeAccount';
import { START_AUTH, StartAuthAction } from '../actions/startAuth';
import { updateServiceList } from '../actions/updateServiceList';
import { State, ServiceAccountWithType } from '../domain';
import { CloudService } from '../services/cloud-service';
import { Fetcher } from '../tools/fetcher/fetcher';

export const startCloudAccountOAuthFlow = (
  fetcher: Fetcher,
  cloudService: CloudService,
) => (store: Store<State>) => (next: Dispatch<State>) => (
  action: StartAuthAction,
) => {
  if (action.type === START_AUTH) {
    const { redirectUrl, userMediaClient } = store.getState();
    const { serviceName } = action;

    const accounts = cloudService
      .startAuth(redirectUrl, serviceName)
      .then(() => userMediaClient.config.authProvider())
      .then(auth => fetcher.getServiceList(auth));

    store.dispatch(updateServiceList(accounts));

    accounts.then((accounts: ServiceAccountWithType[]) => {
      const selectedAccount = accounts.find(
        account => account.type === serviceName,
      );
      if (selectedAccount) {
        store.dispatch(changeAccount(serviceName, selectedAccount.id));
      }
    });
  }

  return next(action);
};
