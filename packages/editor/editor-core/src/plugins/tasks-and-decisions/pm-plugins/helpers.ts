import { Node, ResolvedPos, NodeType } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { findFarthestParentNode } from '../../../utils';
import { liftTarget } from 'prosemirror-transform';

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
    $from,
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

export const treeDepth = ($pos: ResolvedPos, types: NodeType[]) => {
  const root = findFarthestParentNode(node => types.indexOf(node.type) > -1)(
    $pos,
  );
  if (!root) {
    return -1;
  }

  console.log('root', root);

  // need to look at the parent node from the current ResolvedPos
  // because if we have a nested taskList they appear as siblings
  //
  // this is unlike regular bullet lists where the orderedList
  // appears as descendent of listItem

  let maxChildDepth = 0;
  $pos.doc.nodesBetween(
    root.pos,
    root.pos + root.node.nodeSize,
    (descendent, relPos, parent) => {
      maxChildDepth = Math.max($pos.doc.resolve(relPos).depth, maxChildDepth);

      // keep descending down the tree if we can
      if (types.indexOf(descendent.type) > -1) {
        return true;
      }
    },
  );

  return maxChildDepth;
};

export const isEmptyTaskDecision = (state: EditorState) => {
  const { selection, schema } = state;
  const { $from } = selection;
  const node = $from.node($from.depth);
  return (
    node &&
    (node.type === schema.nodes.taskItem ||
      node.type === schema.nodes.decisionItem) &&
    node.textContent.length === 0
  );
};

export const liftBlock = (
  tr: Transaction,
  $from: ResolvedPos,
  $to: ResolvedPos,
): Transaction | null => {
  const blockRange = getBlockRange($from, $to);
  if (!blockRange) {
    return null;
  }

  // ensure we can actually lift
  const target = liftTarget(blockRange);
  if (typeof target !== 'number') {
    return null;
  }

  return tr.lift(blockRange, target).scrollIntoView();
};
