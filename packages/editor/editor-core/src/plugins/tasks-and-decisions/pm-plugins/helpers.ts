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

/**
 * Creates a NodeRange around the given taskItem and the following
 * ("nested") taskList, if one exists.
 */
export const getBlockRange = ($from: ResolvedPos, $to: ResolvedPos) => {
  const { taskList } = $from.doc.type.schema.nodes;

  let end = $to.end();
  const $after = $to.doc.resolve(end + 1);
  const after = $after.nodeAfter;

  // ensure the node after is actually just a sibling
  // $to will be inside the text, so subtract one to get the taskItem it contains in
  if (after && after.type === taskList && $after.depth === $to.depth - 1) {
    // it was! include it in our blockRange
    end += after.nodeSize;
  }

  return $from.blockRange($to.doc.resolve(end));
};

/**
 * Finds the distance between the current $from and the root of the taskList.
 */
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

/**
 * Walk outwards from a position until we encounter the (inside) start of
 * the next node, or reach the end of the document.
 *
 * @param $startPos Position to start walking from.
 */
export const walkOut = ($startPos: ResolvedPos): ResolvedPos => {
  let $pos = $startPos;

  // invariant 1: don't walk past the end of the document
  // invariant 2: we haven't walked to the start of *any* node
  //              parentOffset includes textOffset.
  while ($pos.pos < $pos.doc.nodeSize - 2 && $pos.parentOffset > 0) {
    $pos = $pos.doc.resolve($pos.pos + 1);
  }

  return $pos;
};

/**
 * Finds the height of a tree-like structure, given any position inside it.
 *
 * Traverses from the top of the tree to all leaf nodes, and returns the length
 * of the longest path.
 *
 * This means you can use it with things like taskList, which
 * do not nest themselves inside taskItems but rather as adjacent children.
 *
 * @param $pos Any position inside the tree.
 * @param types The node types to consider traversable
 */
export const treeDepth = ($pos: ResolvedPos, types: NodeType[]) => {
  const root = findFarthestParentNode(node => types.indexOf(node.type) > -1)(
    $pos,
  );
  if (!root) {
    return -1;
  }

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

/**
 * Returns `true` if the taskItem or decisionItem has no text.
 */
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

/**
 * Lifts a taskItem and any directly following taskList
 * (taskItem and its "nested children") out one level.
 *
 * @param tr Transaction to base steps on
 * @param $from Start of range you want to lift
 * @param $to End of range you want to lift (can be same as `$from`)
 */
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
