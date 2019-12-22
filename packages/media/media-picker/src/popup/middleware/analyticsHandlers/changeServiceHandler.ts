import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { Action } from 'redux';
import { buttonClickPayload, HandlerResult } from '.';

import { isChangeServiceAction } from '../../actions/changeService';

export default (action: Action): HandlerResult => {
  if (isChangeServiceAction(action)) {
    if (action.serviceName === 'upload') {
      return [
        {
          ...buttonClickPayload,
          actionSubjectId: 'uploadButton',
        },
        {
          name: 'recentFilesBrowserModal',
          eventType: SCREEN_EVENT_TYPE,
        },
      ];
    } else {
      return [
        {
          ...buttonClickPayload,
          actionSubjectId: 'cloudBrowserButton',
          attributes: {
            cloudType: action.serviceName,
          },
        },
      ];
    }
  }
};
