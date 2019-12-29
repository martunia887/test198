import { Action } from 'redux';

import { MediaFile } from '../../types';

export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';

export interface FileUploadProgressAction extends Action {
  readonly type: 'FILE_UPLOAD_PROGRESS';
  readonly file: MediaFile;
  readonly progress: number;
}

export function isFileUploadProgressAction(
  action: Action,
): action is FileUploadProgressAction {
  return action.type === FILE_UPLOAD_PROGRESS;
}
