import { Actions } from './file-states-actions';
import * as actions from './file-states-actions';
import { FileStates } from '../models/file-state';

const INITIAL_STATE: FileStates = {};

export function fileStatesReducer(
  fileStates: FileStates = INITIAL_STATE,
  action: Actions,
): FileStates {
  switch (action.type) {
    case actions.RESOLVE_FILE_STATE_SUCCESS_ACTION: {
      const {
        payload: { fileState },
      } = action;

      return {
        ...fileStates,
        [fileState.id]: fileState,
      };
    }
  }

  return fileStates;
}
