import { Action } from 'redux';
import { isEditorCloseAction } from '../actions';
import { State } from '../domain';

export default function editorClose(state: State, action: Action): State {
  if (isEditorCloseAction(action)) {
    return {
      ...state,
      editorData: undefined,
    };
  }

  return state;
}
