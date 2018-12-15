import { setParentNodeMarkup, removeParentNodeOfType } from 'prosemirror-utils';
import { Command } from '../../types';
import { CodeBlockState } from './pm-plugins/main';
import { SelectOption } from '../floating-toolbar/ui/Select';

export type DomAtPos = (pos: number) => { node: HTMLElement; offset: number };
export const removeCodeBlock: Command = (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;
  if (dispatch) {
    dispatch(removeParentNodeOfType(nodes.codeBlock)(tr));
  }
  return true;
};

export const changeLanguage = (language: SelectOption): Command => (
  state,
  dispatch,
) => {
  const {
    schema: { nodes },
    tr,
  } = state;
  const attrs: CodeBlockState = { language };
  if (dispatch) {
    dispatch(setParentNodeMarkup(nodes.codeBlock, null, attrs)(tr));
  }
  return true;
};
