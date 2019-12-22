import { Action, MiddlewareAPI } from 'redux';
import { buttonClickPayload, HandlerResult } from '.';

import { isHidePopupAction } from '../../actions/hidePopup';
import { State } from '../../domain';

export default (action: Action, store: MiddlewareAPI<State>): HandlerResult => {
  if (isHidePopupAction(action)) {
    const { selectedItems = [] } = store.getState();
    const actionSubjectId =
      selectedItems.length > 0 ? 'insertFilesButton' : 'cancelButton';

    const files =
      actionSubjectId === 'insertFilesButton'
        ? selectedItems.map(item => ({
            fileId: item.id,
            fileMimetype: item.mimeType,
            fileSize: item.size,
            accountId: item.accountId,
            serviceName: item.serviceName,
          }))
        : [];

    const serviceNames =
      selectedItems.length > 0
        ? {
            serviceNames: selectedItems.map(i => i.serviceName),
          }
        : {};

    return [
      {
        ...buttonClickPayload,
        actionSubjectId,
        attributes: {
          fileCount: selectedItems.length,
          ...serviceNames,
          ...(actionSubjectId === 'insertFilesButton' ? { files } : {}),
        },
      },
    ];
  }
};
