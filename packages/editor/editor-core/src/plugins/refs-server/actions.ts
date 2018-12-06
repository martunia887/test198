import * as firebase from 'firebase/app';

import { REFS_SERVER_ACTIONS, pluginKey, PushRefs } from './pm-plugins/main';

export const addPushRef = (pushRefs: PushRefs) => (
  state,
  dispatch,
): boolean => {
  dispatch(
    state.tr
      .setMeta(pluginKey, {
        action: REFS_SERVER_ACTIONS.ADD_PUSH_REF,
        data: { pushRefs },
      })
      .setMeta('addToHistory', false),
  );
  return true;
};

export const setDatabase = (database: firebase.database.Database) => (
  state,
  dispatch,
): boolean => {
  dispatch(
    state.tr
      .setMeta(pluginKey, {
        action: REFS_SERVER_ACTIONS.SET_DATABASE,
        data: { database },
      })
      .setMeta('addToHistory', false),
  );
  return true;
};
