import { MobileScrollPluginState } from './index';
import { MobileScrollAction, MobileScrollActionTypes } from './actions';

export default function(
  state: MobileScrollPluginState,
  action: MobileScrollAction,
): MobileScrollPluginState {
  switch (action.type) {
    case MobileScrollActionTypes.SET_KEYBOARD_HEIGHT:
      return {
        ...state,
        keyboardHeight: action.keyboardHeight,
      };

    case MobileScrollActionTypes.SET_HEIGHT_DIFF:
      return {
        ...state,
        heightDiff: action.heightDiff,
      };

    case MobileScrollActionTypes.SET_WINDOW_HEIGHT:
      return {
        ...state,
        windowHeight: action.windowHeight,
      };
  }
  return state;
}
