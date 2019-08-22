import { FindReplaceState, getInitialState } from './plugin';
import { FindReplaceActionTypes, FindReplaceAction } from './actions';

const reducer = (
  state: FindReplaceState,
  action: FindReplaceAction,
): FindReplaceState => {
  switch (action.type) {
    case FindReplaceActionTypes.ACTIVATE:
    case FindReplaceActionTypes.FIND:
      return {
        ...state,
        isActive: true,
        shouldFocus: action.type === FindReplaceActionTypes.ACTIVATE,
        findText:
          action.findText !== undefined ? action.findText : state.findText,
        matches: action.matches || state.matches,
        index: action.index !== undefined ? action.index : state.index,
        selectionPos: action.selectionPos || state.selectionPos,
      };

    case FindReplaceActionTypes.FIND_NEXT:
      return {
        ...state,
        index: (state.index + 1) % state.matches.length,
      };

    case FindReplaceActionTypes.FIND_PREV:
      return {
        ...state,
        index: (state.index - 1 + state.matches.length) % state.matches.length,
      };

    case FindReplaceActionTypes.REPLACE:
    case FindReplaceActionTypes.REPLACE_ALL:
      // todo: both of these properly
      // handle jumping to next selection for single replace
      // update count/index for both
      return {
        ...state,
        replaceText: action.replaceText,
      };

    case FindReplaceActionTypes.CANCEL:
      return getInitialState();

    case FindReplaceActionTypes.UNFOCUS:
      return {
        ...state,
        shouldFocus: false,
      };
  }

  return state;
};

export default reducer;
