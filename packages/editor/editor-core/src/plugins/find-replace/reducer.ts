import { FindReplaceState, getInitialState } from './plugin';
import { FindReplaceActionTypes, FindReplaceAction } from './actions';

const reducer = (
  state: FindReplaceState,
  action: FindReplaceAction,
): FindReplaceState => {
  switch (action.type) {
    case FindReplaceActionTypes.FIND: {
      return {
        ...state,
        active: true,
        index: action.index,
        matches: action.matches,
        findText: action.findText,
      };
    }

    case FindReplaceActionTypes.FIND_NEXT: {
      return {
        ...state,
        index: (state.index + 1) % state.matches.length,
      };
    }

    case FindReplaceActionTypes.FIND_PREV: {
      return {
        ...state,
        index: (state.index - 1 + state.matches.length) % state.matches.length,
      };
    }

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
  }

  return state;
};

export default reducer;
