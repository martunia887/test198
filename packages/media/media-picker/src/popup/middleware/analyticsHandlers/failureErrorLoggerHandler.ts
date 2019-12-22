import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { Action } from 'redux';
import { HandlerResult } from '.';

import { isFailureErrorAction } from '../../actions/failureErrorLogger';

export default (action: Action): HandlerResult => {
  if (isFailureErrorAction(action)) {
    const { error, info = undefined } = action;
    return [
      {
        name: 'UnhandledError',
        action: 'UnhandledError',
        eventType: OPERATIONAL_EVENT_TYPE,
        attributes: {
          browserInfo: !!(
            window &&
            window.navigator &&
            window.navigator.userAgent
          )
            ? window.navigator.userAgent
            : 'unknown',
          error,
          info,
        },
      },
    ];
  }
};
