import { Store, Action, Dispatch } from 'redux';
import { isHidePopupAction } from '../actions/hidePopup';
import { State } from '../domain';
import { UploadComponent } from '../../components/component';
import { UploadEventPayloadMap } from '../../domain/uploadEvent';

export default (eventEmitter: UploadComponent<UploadEventPayloadMap>) => (
  _: Store<State>,
) => (next: Dispatch<State>) => (action: Action) => {
  if (isHidePopupAction(action)) {
    eventEmitter.emit('closed', undefined);
  }
  return next(action);
};
