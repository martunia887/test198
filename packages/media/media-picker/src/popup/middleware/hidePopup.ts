import { Store, Action, Dispatch } from 'redux';

import { PopupUploadEventEmitter } from '../../components/types';
import { isHidePopupAction } from '../actions/hidePopup';
import { State } from '../domain';

export default (eventEmitter: PopupUploadEventEmitter) => (_: Store<State>) => (
  next: Dispatch<State>,
) => (action: Action) => {
  if (isHidePopupAction(action)) {
    eventEmitter.emitClosed();
  }
  return next(action);
};
