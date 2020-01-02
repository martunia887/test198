import { Action } from 'redux';

import { isFileUploadProgressAction } from '../actions/fileUploadProgress';
import { State } from '../domain';

export default function fileUploadProgress(
  state: State,
  action: Action,
): State {
  if (isFileUploadProgressAction(action)) {
    const uploads = { ...state.uploads };
    return { ...state, ...{ uploads } };
  } else {
    return state;
  }
}
