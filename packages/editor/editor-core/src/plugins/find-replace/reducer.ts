import { FindReplaceState, getInitialState } from '.';
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
      };

    case FindReplaceActionTypes.FIND: {
      const isNewWord =
        state.searchWord && state.searchWord !== action.searchWord;
      if (isNewWord) {
        return {
          ...state,
          searchWord: action.searchWord,
          index: 0,
        };
      } else {
        return {
          ...state,
          index: state.index + 1, // todo: handle wrap around
        };
      }
    }

    case FindReplaceActionTypes.REPLACE:
      return {
        ...state,
        replaceWord: action.replaceWord,
        // jump to next occurence
        index: state.index + 1, // todo: handle wrap around & no more words left
      };

    case FindReplaceActionTypes.CANCEL:
      return getInitialState();
  }

  return state;
};

export default reducer;
