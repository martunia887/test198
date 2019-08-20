import { FindReplaceState, getInitialState } from './plugin';
import { FindReplaceActionTypes, FindReplaceAction } from './actions';

const reducer = (
  state: FindReplaceState,
  action: FindReplaceAction,
): FindReplaceState => {
  switch (action.type) {
    case FindReplaceActionTypes.ACTIVATE:
      // todo: is it better to remember previous details or not?
      return {
        ...state,
        active: true,
        // searchWord: '',
        index: 0,
      };

    case FindReplaceActionTypes.FIND: {
      const isNewWord =
        action.searchWord && state.searchWord !== action.searchWord;
      if (isNewWord) {
        return {
          ...state,
          active: true,
          searchWord: action.searchWord,
          // TODO: Should be the first result after selection
          index: 0,
          matches: action.matches,
        };
      } else {
        return {
          ...state,
          active: true,
          index: state.index + 1, // todo: handle wrap around
          matches: action.matches,
        };
      }
    }

    case FindReplaceActionTypes.REPLACE:
    case FindReplaceActionTypes.REPLACE_ALL:
      // todo: both of these properly
      // handle jumping to next selection for single replace
      // update count/index for both
      return {
        ...state,
        replaceWord: action.replaceWord,
      };

    case FindReplaceActionTypes.CANCEL:
      return getInitialState();
  }

  return state;
};

export default reducer;
