import {
  isNodeSelection,
  replaceParentNodeOfType,
  setTextSelection,
  canInsert,
} from 'prosemirror-utils';
import { NodeSelection, Transaction } from 'prosemirror-state';
import { Node, Fragment } from 'prosemirror-model';

export type InsertableContent = Node | Fragment;

const isEmptyParagraph = (node: InsertableContent) => {
  return !node || (node.type.name === 'paragraph' && node.nodeSize === 2);
};

const cloneTr = (tr: Transaction) => {
  return Object.assign(Object.create(tr), tr).setTime(Date.now());
};

const isSelectableNode = (node: InsertableContent) =>
  node.type && node.type.spec.selectable;

const setSelection = (
  node: InsertableContent,
  pos: number,
  tr: Transaction,
) => {
  if (isSelectableNode(node)) {
    return tr.setSelection(new NodeSelection(tr.doc.resolve(pos)));
  }
  return setTextSelection(pos)(tr);
};

export const replaceSelectedNode = (content: InsertableContent) => (
  tr: Transaction,
) => {
  if (isNodeSelection(tr.selection)) {
    const { $from, $to } = tr.selection;
    if (
      (content instanceof Fragment &&
        $from.parent.canReplace($from.index(), $from.indexAfter(), content)) ||
      $from.parent.canReplaceWith(
        $from.index(),
        $from.indexAfter(),
        content.type,
      )
    ) {
      return cloneTr(
        tr
          .replaceWith($from.pos, $to.pos, content)
          // restore node selection
          .setSelection(new NodeSelection(tr.doc.resolve($from.pos))),
      );
    }
  }
  return tr;
};

export const safeInsert = (
  content: InsertableContent,
  position: number,
  tryToReplace: boolean,
) => (tr: Transaction) => {
  const hasPosition = typeof position === 'number';
  const { $from } = tr.selection;
  const $insertPos = hasPosition
    ? tr.doc.resolve(position)
    : isNodeSelection(tr.selection)
    ? tr.doc.resolve($from.pos + 1)
    : $from;
  const { parent } = $insertPos;

  // try to replace selected node

  // What is the parent node that the new one can exist in?

  // currentNode = parent
  // if selection:
  //   wrapped = wrap(selection)
  //   if wrapped && allowableInCommonAncestor(wrapped):
  //     return replaceWithWrapped(toInsert)

  // while currentNode != doc

  //   if newNodeAllowableInCurrentNode:
  //     insert()
  //   else if !selection && canSplit:
  //     splitAndInsert()
  //   else:
  //     currentNode = currentNode.parent
  // insert()

  if (isNodeSelection(tr.selection) && tryToReplace) {
    const oldTr = tr;
    //
    tr = replaceSelectedNode(content)(tr);
    if (oldTr !== tr) {
      return tr;
    }
  }

  // if (isNodeSelection(tr.selection) && tryToReplace) {
  //   const oldTr = tr;
  //   //
  //   tr = replaceSelectedNode(content)(tr);
  //   if (oldTr !== tr) {
  //     return tr;
  //   }
  // }

  // try to replace an empty paragraph
  if (isEmptyParagraph(parent)) {
    const oldTr = tr;
    tr = replaceParentNodeOfType(parent.type, content)(tr);
    if (oldTr !== tr) {
      const pos = isSelectableNode(content)
        ? // for selectable node, selection position would be the position of the replaced parent
          $insertPos.before($insertPos.depth)
        : $insertPos.pos;
      return setSelection(content, pos, tr);
    }
  }

  // given node is allowed at the current cursor position
  if (canInsert($insertPos, content)) {
    tr.insert($insertPos.pos, content);
    const pos = hasPosition
      ? $insertPos.pos
      : isSelectableNode(content)
      ? // for atom nodes selection position after insertion is the previous pos
        tr.selection.$anchor.pos - 1
      : tr.selection.$anchor.pos;
    return cloneTr(setSelection(content, pos, tr));
  }

  // looking for a place in the doc where the node is allowed
  for (let i = $insertPos.depth; i > 0; i--) {
    const pos = $insertPos.after(i);
    const $pos = tr.doc.resolve(pos);
    if (canInsert($pos, content)) {
      tr.insert(pos, content);
      return cloneTr(setSelection(content, pos, tr));
    }
  }
  return tr;
};
