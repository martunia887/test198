import * as firebase from 'firebase/app';

import { REFS_SERVER_ACTIONS, pluginKey, PushRefs } from './pm-plugins/main';
import { Command } from '../../types';

export const addPushRef = (pushRefs: PushRefs): Command => (
  state,
  dispatch,
) => {
  if (dispatch) {
    dispatch(
      state.tr
        .setMeta(pluginKey, {
          action: REFS_SERVER_ACTIONS.ADD_PUSH_REF,
          data: { pushRefs },
        })
        .setMeta('addToHistory', false),
    );
    return true;
  }
  return false;
};

export const setDatabase = (database: firebase.database.Database): Command => (
  state,
  dispatch,
) => {
  if (dispatch) {
    dispatch(
      state.tr
        .setMeta(pluginKey, {
          action: REFS_SERVER_ACTIONS.SET_DATABASE,
          data: { database },
        })
        .setMeta('addToHistory', false),
    );
    return true;
  }
  return false;
};
