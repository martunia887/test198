import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { Action } from 'redux';
import { HandlerResult } from '.';

import { isFileListUpdateAction } from '../../actions/fileListUpdate';

export default (action: Action): HandlerResult => {
  if (isFileListUpdateAction(action)) {
    return [
      {
        name: 'cloudBrowserModal',
        eventType: SCREEN_EVENT_TYPE,
        attributes: {
          cloudType: action.serviceName,
        },
      },
    ];
  }
};
