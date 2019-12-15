import { getInitialState } from './plugin';
import { FindReplacePluginState } from './types';
import { FindReplaceActionTypes, FindReplaceAction } from './actions';
import { nextIndex, prevIndex } from './utils';

const reducer = (
  state: FindReplacePluginState,
  action: FindReplaceAction,
): FindReplacePluginState => {
  console.log('reducer', action.type);
  switch (action.type) {
    case FindReplaceActionTypes.ACTIVATE:
    case FindReplaceActionTypes.FIND:
      return {
        ...state,
        isActive: true,
        shouldFocus: action.type === FindReplaceActionTypes.ACTIVATE,
        findText: action.findText || '',
        matches: action.matches || [],
        index: action.index || 0,
      };

    case FindReplaceActionTypes.UPDATE_DECORATIONS:
      return {
        ...state,
        decorationSet: action.decorationSet,
      };

    case FindReplaceActionTypes.FIND_NEXT:
      return {
        ...state,
        index: nextIndex(state.index, state.matches.length),
        decorationSet: action.decorationSet,
      };

    case FindReplaceActionTypes.FIND_PREV:
      return {
        ...state,
        index: prevIndex(state.index, state.matches.length),
        decorationSet: action.decorationSet,
      };

    case FindReplaceActionTypes.REPLACE:
    case FindReplaceActionTypes.REPLACE_ALL:
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
