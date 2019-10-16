import { EditorState } from 'prosemirror-state';
import {
  findSelectedNodeOfType,
  findParentNodeOfType,
} from 'prosemirror-utils';

export const findExpand = (state: EditorState) => {
  const { expand, nestedExpand } = state.schema.nodes;
  return (
    findParentNodeOfType([expand, nestedExpand])(state.selection) ||
    findSelectedNodeOfType([expand, nestedExpand])(state.selection)
  );
};
