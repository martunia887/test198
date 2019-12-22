import {
  EditorShowImageAction,
  isEditorShowImageAction,
} from '../actions/editorShowImage';
import { State } from '../domain';

export default function editorShowImage(
  state: State,
  action: EditorShowImageAction,
): State {
  if (isEditorShowImageAction(action)) {
    const { editorData } = state;
    const { imageUrl } = action;
    const originalFile =
      action.originalFile || (editorData && editorData.originalFile);

    return {
      ...state,
      editorData: {
        imageUrl,
        originalFile,
      },
    };
  }

  return state;
}
