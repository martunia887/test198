import { Action } from 'redux';
import { isUpdatePopupUrlsAction } from '../actions/updatePopupUrls';
import { State } from '../domain';

export default function updatePopupUrls(state: State, action: Action): State {
  if (isUpdatePopupUrlsAction(action)) {
    const { urls } = action;
    return {
      ...state,
      ...urls,
    };
  }

  return state;
}
