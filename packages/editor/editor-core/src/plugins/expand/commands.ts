import { NodeSelection } from 'prosemirror-state';
import { createCommand } from './pm-plugins/main';
import { Command } from '../../types';
import { findExpand } from './utils';

export const setExpandRef = (ref?: HTMLDivElement | null): Command =>
  createCommand(
    {
      type: 'SET_EXPAND_REF',
      data: {
        ref,
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

export const selectExpand = (): Command => (state, dispatch) => {
  const expandNode = findExpand(state);
  if (expandNode && dispatch) {
    dispatch(
      state.tr.setSelection(
        new NodeSelection(state.doc.resolve(expandNode.pos)),
      ),
    );
  }
  return true;
};

export const collapseExpand = (): Command => (state, dispatch) => {
  const expandNode = findExpand(state);
  if (expandNode && dispatch) {
    dispatch(
      state.tr.setNodeMarkup(
        expandNode.pos,
        expandNode.node.type,
        {
          ...expandNode.node.attrs,
          collapsed: !expandNode.node.attrs.collapsed,
        },
        expandNode.node.marks,
      ),
    );
  }
  return true;
};

export const updateExpandTitle = (title: string): Command => (
  state,
  dispatch,
) => {
  const expandNode = findExpand(state);
  if (expandNode && dispatch) {
    dispatch(
      state.tr.setNodeMarkup(
        expandNode.pos,
        expandNode.node.type,
        {
          ...expandNode.node.attrs,
          title,
        },
        expandNode.node.marks,
      ),
    );
  }
  return true;
};
