import { Action } from 'redux';
import { buttonClickPayload, HandlerResult } from '.';
import { isEditRemoteImageAction } from '../../actions/editRemoteImage';

export default (action: Action): HandlerResult => {
  if (isEditRemoteImageAction(action)) {
    const { collectionName, item: { id = undefined } = {} } = action;
    return [
      {
        ...buttonClickPayload,
        actionSubjectId: 'annotateFileButton',
        attributes: {
          collectionName,
          fileId: id,
        },
      },
    ];
  }
};
