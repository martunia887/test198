import { Action } from 'redux';
import { buttonClickPayload, HandlerResult } from '.';
import { isStartAuthAction } from '../../actions/startAuth';

export default (action: Action): HandlerResult => {
  if (isStartAuthAction(action)) {
    return [
      {
        ...buttonClickPayload,
        actionSubjectId: 'linkCloudAccountButton',
        attributes: {
          cloudType: action.serviceName,
        },
      },
    ];
  }
};
