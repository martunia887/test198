import { Action, Store, Dispatch } from 'redux';

import {
  GET_CONNECTED_REMOTE_ACCOUNTS,
  GetConnectedRemoteAccountsAction,
} from '../actions/getConnectedRemoteAccounts';
import { updateServiceList } from '../actions/updateServiceList';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';

const isGetConnectedRemoteAccountsAction = (
  action: Action,
): action is GetConnectedRemoteAccountsAction => {
  return action.type === GET_CONNECTED_REMOTE_ACCOUNTS;
};

export const getConnectedRemoteAccounts = (fetcher: Fetcher) => (
  store: Store<State>,
) => (next: Dispatch<Action>) => (action: Action) => {
  if (isGetConnectedRemoteAccountsAction(action)) {
    const { userMediaClient } = store.getState();

    store.dispatch(
      updateServiceList(
        userMediaClient.config
          .authProvider()
          .then(auth => fetcher.getServiceList(auth)),
      ),
    );
  }

  return next(action);
};
