import { Node, ResolvedPos } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { findFarthestParentNode } from '../../../utils';

export const isInsideTaskOrDecisionItem = (state: EditorState) => {
  const { decisionItem, taskItem } = state.schema.nodes;
  return hasParentNodeOfType([decisionItem, taskItem])(state.selection);
};

export const isActionOrDecisionList = (node: Node) => {
  const { taskList, decisionList } = node.type.schema.nodes;
  return [taskList, decisionList].indexOf(node.type) > -1;
};

export const isActionOrDecisionItem = (node: Node) => {
  const { taskItem, decisionItem } = node.type.schema.nodes;
  return [taskItem, decisionItem].indexOf(node.type) > -1;
};

export const isInsideTask = (state: EditorState) => {
  const { taskItem } = state.schema.nodes;
  return hasParentNodeOfType([taskItem])(state.selection);
};

// get block range over current selection, including following taskList
export const getBlockRange = ($from: ResolvedPos, $to: ResolvedPos) => {
  const { taskList } = $from.doc.type.schema.nodes;

  let end = $to.end();
  const $after = $to.doc.resolve(end + 1);
  const after = $after.nodeAfter;

  // $to will be inside the text, so subtract one to get the taskItem it contains in
  if (after && after.type === taskList && $after.depth === $to.depth - 1) {
    end += after.nodeSize;
  }

  return $from.blockRange($to.doc.resolve(end));
};

export const getCurrentIndentLevel = (selection: Selection) => {
  const { $from } = selection;
  const { taskList } = $from.doc.type.schema.nodes;

  const furthestParent = findFarthestParentNode(node => node.type === taskList)(
    selection,
  );
  if (!furthestParent) {
    return null;
  }

  return $from.depth - furthestParent.depth;
};

// keep looking forward until the depth either remains the same or
// increases
export const walkOut = ($startPos: ResolvedPos): ResolvedPos => {
  let $pos = $startPos;

  while ($pos.pos < $pos.doc.nodeSize - 2 && $pos.parentOffset > 0) {
    $pos = $pos.doc.resolve($pos.pos + 1);
  }

  return $pos;
};

export const isEmptyAction = (state: EditorState) => {
  const { selection } = state;
  const { $from } = selection;
  const node = $from.node($from.depth);
  return node && node.textContent.length === 0;
};
