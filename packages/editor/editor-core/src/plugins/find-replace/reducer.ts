import { FindReplaceState, getInitialState } from './plugin';
import { FindReplaceActionTypes, FindReplaceAction } from './actions';
import { nextIndex, prevIndex } from './utils';

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
        selectionPos: action.selectionPos || state.selectionPos, // todo: does selectionPos have a point?
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
