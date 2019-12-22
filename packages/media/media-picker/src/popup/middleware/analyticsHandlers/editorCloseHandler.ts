import { Action } from 'redux';
import { buttonClickPayload, HandlerResult } from '.';
import { isEditorCloseAction } from '../../actions/editorClose';

export default (action: Action): HandlerResult => {
  if (isEditorCloseAction(action)) {
    return [
      {
        ...buttonClickPayload,
        actionSubjectId: `mediaEditor${action.selection}Button`,
      },
    ];
  }
};
