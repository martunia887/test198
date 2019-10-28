import { NodeSelection, EditorState } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
import { safeInsert, findTable } from 'prosemirror-utils';
import { createCommand } from './pm-plugins/main';
import { Command } from '../../types';
import { findExpand } from './utils';

export const setExpand = (
  expandNode?: PMNode | null,
  expandPosition?: number,
  expandRef?: HTMLDivElement | null,
): Command =>
  createCommand(
    {
      type: 'SET_EXPAND',
      data: {
        expandNode,
        expandPosition,
        expandRef,
      },
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const setParentLayout = (parentLayout?: string): Command =>
  createCommand(
    {
      type: 'SET_PARENT_LAYOUT',
      data: {
        parentLayout,
      },
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const setShouldFocusTitle = (shouldFocusTitle: boolean): Command =>
  createCommand(
    {
      type: 'SET_SHOULD_FOCUS_TITLE',
      data: {
        shouldFocusTitle,
      },
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const deleteExpand = (): Command => (state, dispatch) => {
  const expandNode = findExpand(state);
  if (expandNode && dispatch) {
    dispatch(
      state.tr.delete(
        expandNode.pos,
        expandNode.pos + expandNode.node.nodeSize,
      ),
    );
  }
  return true;
};

export const selectExpand = (pos: number): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setSelection(new NodeSelection(state.doc.resolve(pos))));
  }
  return true;
};

export const updateExpandTitle = (
  title: string,
  node: PMNode,
  pos: number,
): Command => (state, dispatch) => {
  if (node && dispatch) {
    const { tr } = state;
    tr.setNodeMarkup(
      pos,
      undefined,
      {
        ...node.attrs,
        title,
      },
      node.marks,
    );
    dispatch(tr);
  }
  return true;
};

export const createExpandNode = (state: EditorState): PMNode => {
  const { expand, nestedExpand } = state.schema.nodes;
  const expandType = findTable(state.selection) ? nestedExpand : expand;
  return expandType.createAndFill({});
};

export const insertExpand: Command = (state, dispatch) => {
  const node = createExpandNode(state);

  if (dispatch) {
    dispatch(safeInsert(node)(state.tr).scrollIntoView());
  }

  return true;
};
