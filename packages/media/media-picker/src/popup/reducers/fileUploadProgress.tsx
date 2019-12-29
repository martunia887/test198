import { Action } from 'redux';

import { isFileUploadProgressAction } from '../actions/fileUploadProgress';
import { State } from '../domain';

export default function fileUploadProgress(
  state: State,
  action: Action,
): State {
  if (isFileUploadProgressAction(action)) {
    const uploads = { ...state.uploads };
    if (uploads[action.file.id]) {
      uploads[action.file.id].progress = action.progress;
    }
    return { ...state, ...{ uploads } };
  } else {
    return state;
  }
}
