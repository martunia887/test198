import { keymap } from 'prosemirror-keymap';
import { Node, Schema, Fragment, ResolvedPos, Slice } from 'prosemirror-model';
import {
  EditorState,
  Transaction,
  Plugin,
  TextSelection,
} from 'prosemirror-state';
import {
  hasParentNodeOfType,
  findParentNodeOfTypeClosestToPos,
} from 'prosemirror-utils';
import { insertTaskDecisionWithAnalytics } from '../commands';
import { INPUT_METHOD } from '../../analytics';
import { TaskDecisionListType } from '../types';
import {
  findWrapping,
  ReplaceAroundStep,
  liftTarget,
} from 'prosemirror-transform';
import { autoJoin } from 'prosemirror-commands';
import { findCutBefore } from '../../../utils/commands';
import { findFarthestParentNode } from '../../../utils';
import { Command } from 'src/types';

const isInsideTaskOrDecisionItem = (state: EditorState) => {
  const { decisionItem, taskItem } = state.schema.nodes;
  return hasParentNodeOfType([decisionItem, taskItem])(state.selection);
};

const isInsideTask = (state: EditorState) => {
  const { taskItem } = state.schema.nodes;
  return hasParentNodeOfType([taskItem])(state.selection);
};

// get block range over current selection, including following taskList
const getBlockRange = ($from: ResolvedPos, $to: ResolvedPos) => {
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

const unindent = autoJoin(
  (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    // can only unindent taskItems
    if (!isInsideTask(state)) {
      return false;
    }

    const { $from, $to } = state.selection;
    if (dispatch) {
      const blockRange = getBlockRange($from, $to);
      if (!blockRange) {
        return true;
      }

      // ensure we can actually lift
      const target = liftTarget(blockRange);
      if (typeof target !== 'number') {
        return true;
      }

      dispatch(state.tr.lift(blockRange, target).scrollIntoView());
    }

    return true;
  },
  ['taskList'],
);

const indent = autoJoin(
  (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    // can only indent taskItems
    if (!isInsideTask(state)) {
      return false;
    }

    const { taskList } = state.schema.nodes;
    const { $from, $to } = state.selection;

    const furthestParent = findFarthestParentNode(
      node => node.type === taskList,
    )(state.selection);
    if (!furthestParent) {
      // should not be possible; we're already in a taskItem
      return false;
    }

    // limit ui indentation to 6 levels
    const curIndentLevel = $from.depth - furthestParent.depth;
    if (curIndentLevel >= 6) {
      return true;
    }

    if (dispatch) {
      const blockRange = getBlockRange($from, $to);
      if (!blockRange) {
        return true;
      }

      const wrapping = findWrapping(blockRange, state.schema.nodes.taskList);
      if (!wrapping) {
        return true;
      }

      dispatch(state.tr.wrap(blockRange, wrapping).scrollIntoView());
    }

    return true;
  },
  ['taskList'],
);

const backspaceFrom = ($from: ResolvedPos): Command => (state, dispatch) => {
  // previous was empty, just delete backwards
  const taskBefore = $from.doc.resolve($from.before());
  if (
    taskBefore.nodeBefore &&
    ['decisionItem', 'taskItem'].indexOf(taskBefore.nodeBefore.type.name) >
      -1 &&
    taskBefore.nodeBefore.nodeSize === 2
  ) {
    return false;
  }

  // if nested, just unindent
  if ($from.node($from.depth - 2).type.name === 'taskList') {
    return unindent(state, dispatch);
  }

  // bottom level, should "unwrap" taskItem contents into paragraph
  // we achieve this by slicing the content out, and replacing
  if (canSplitListItem(state.tr)) {
    if (dispatch) {
      const taskContent = state.doc.slice($from.start(), $from.end()).content;

      // might be end of document after
      const slice = taskContent.size
        ? state.schema.nodes.paragraph.createChecked(undefined, taskContent)
        : state.schema.nodes.paragraph.createChecked();

      dispatch(splitListItemWith(state.tr, slice, $from, true));
    }

    return true;
  }

  return false;
};

const backspace = autoJoin(
  (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { $from } = state.selection;

    // ensure cursor at start of item
    if ($from.start() !== $from.pos || !state.selection.empty) {
      return false;
    }

    // try to join paragraph and taskList when backspacing
    const $cut = findCutBefore($from);
    if ($cut) {
      if (
        $cut.nodeBefore &&
        ['taskList', 'decisionList'].indexOf($cut.nodeBefore.type.name) > -1 &&
        $cut.nodeAfter &&
        $cut.nodeAfter.type.name === 'paragraph'
      ) {
        // taskList contains taskItem, so this is the end of the inside
        let $lastNode = $cut.doc.resolve($cut.pos - 1);

        while (
          ['taskItem', 'decisionItem'].indexOf($lastNode.parent.type.name) ===
          -1
        ) {
          $lastNode = state.doc.resolve($lastNode.pos - 1);
        }

        const slice = state.tr.doc.slice($lastNode.pos, $cut.pos);

        // join them
        const tr = state.tr.step(
          new ReplaceAroundStep(
            $lastNode.pos,
            $cut.pos + $cut.nodeAfter.nodeSize,
            $cut.pos + 1,
            $cut.pos + $cut.nodeAfter.nodeSize - 1,
            slice,
            0,
            true,
          ),
        );

        if (dispatch) {
          dispatch(tr);
        }
        return true;
      }
    }

    if (!isInsideTaskOrDecisionItem(state)) {
      return false;
    }

    return backspaceFrom($from)(state, dispatch);
  },
  ['taskList', 'decisionList'],
);

// keep looking forward until the depth either remains the same or
// increases
const walkOut = ($startPos: ResolvedPos): ResolvedPos => {
  let $pos = $startPos;

  while ($pos.pos < $pos.doc.nodeSize - 2 && $pos.parentOffset > 0) {
    $pos = $pos.doc.resolve($pos.pos + 1);
  }

  return $pos;
};

const deleteHandler: Command = (state, dispatch) => {
  if (!isInsideTaskOrDecisionItem(state)) {
    return false;
  }

  // const { $from } = state.selection;

  // ensure cursor is empty
  if (
    state.selection.$from.end() !== state.selection.$from.pos ||
    !state.selection.empty
  ) {
    return false;
  }

  // look for the node after this current one
  const $next = walkOut(state.selection.$from);

  // if there's no taskItem or taskList following, then we just do the normal behaviour
  const parentList = findParentNodeOfTypeClosestToPos($next, [
    state.schema.nodes.taskList,
    state.schema.nodes.taskItem,
    state.schema.nodes.decisionList,
    state.schema.nodes.decisionItem,
  ]);
  if (!parentList) {
    if ($next.node().type === state.schema.nodes.paragraph) {
      // try to join paragraph and taskList when backspacing
      const $cut = findCutBefore($next.doc.resolve($next.pos));
      if ($cut) {
        if (
          $cut.nodeBefore &&
          ['taskList', 'decisionList'].indexOf($cut.nodeBefore.type.name) >
            -1 &&
          $cut.nodeAfter &&
          $cut.nodeAfter.type.name === 'paragraph'
        ) {
          // taskList contains taskItem, so this is the end of the inside
          let $lastNode = $cut.doc.resolve($cut.pos - 1);

          while (
            ['taskItem', 'decisionItem'].indexOf($lastNode.parent.type.name) ===
            -1
          ) {
            $lastNode = state.doc.resolve($lastNode.pos - 1);
          }

          const slice = state.tr.doc.slice($lastNode.pos, $cut.pos);

          // join them
          const tr = state.tr.step(
            new ReplaceAroundStep(
              $lastNode.pos,
              $cut.pos + $cut.nodeAfter.nodeSize,
              $cut.pos + 1,
              $cut.pos + $cut.nodeAfter.nodeSize - 1,
              slice,
              0,
              true,
            ),
          );

          if (dispatch) {
            dispatch(tr);
          }
          return true;
        }
      }
    }

    return true;
  }

  // previous was empty, just delete backwards
  // FIXME: do we need this in delete handler?
  const taskBefore = $next.doc.resolve($next.before());
  if (
    taskBefore.nodeBefore &&
    ['decisionItem', 'taskItem'].indexOf(taskBefore.nodeBefore.type.name) >
      -1 &&
    taskBefore.nodeBefore.nodeSize === 2
  ) {
    return false;
  }

  // if nested, just unindent
  if ($next.node($next.depth - 2).type.name === 'taskList') {
    if (dispatch) {
      const blockRange = getBlockRange($next, $next);
      if (!blockRange) {
        return true;
      }

      // ensure we can actually lift
      const target = liftTarget(blockRange);
      if (typeof target !== 'number') {
        return true;
      }

      dispatch(state.tr.lift(blockRange, target).scrollIntoView());
    }

    return true;
  }

  // bottom level, should "unwrap" taskItem contents into paragraph
  // we achieve this by slicing the content out, and replacing
  if (canSplitListItem(state.tr)) {
    if (dispatch) {
      const taskContent = state.doc.slice($next.start(), $next.end()).content;

      // might be end of document after
      const slice = taskContent.size
        ? state.schema.nodes.paragraph.createChecked(undefined, taskContent)
        : [];

      dispatch(splitListItemWith(state.tr, slice, $next, false));
    }

    return true;
  }

  return false;

  // return backspaceFrom($next)(state, dispatch);
};

const deleteForwards = autoJoin(deleteHandler, ['taskList', 'decisionList']);

const canSplitListItem = (tr: Transaction) => {
  const { $from } = tr.selection;
  const afterTaskItem = tr.doc.resolve($from.end()).nodeAfter;

  return (
    !afterTaskItem ||
    (afterTaskItem &&
      (afterTaskItem.type.name === 'taskItem' ||
        afterTaskItem.type.name === 'decisionItem'))
  );
};

const splitListItemWith = (
  tr: Transaction,
  content: Fragment | Node | Node[],
  $from: ResolvedPos,
  setSelection: boolean,
) => {
  const origDoc = tr.doc;

  // split just before the current item
  // we can only split if there was a list item before us
  const listContainer = $from.node($from.depth - 2).type.name;
  const posInList = $from.index($from.depth - 1);
  const shouldSplit = !(
    ['lastList', 'decisionList'].indexOf(listContainer) === -1 &&
    posInList === 0
  );

  if (shouldSplit) {
    // TODO: new id for split taskList
    tr = tr.split($from.pos - 1);
  }

  // and delete the action at the current pos
  // we can do this because we know either first new child will be taskItem or nothing at all
  const frag = Fragment.from(content);
  tr = tr.replace(
    tr.mapping.map($from.start() - 2),
    tr.mapping.map($from.end() + 2),
    frag.size ? new Slice(frag, 0, 0) : Slice.empty,
  );

  // put cursor inside paragraph
  if (setSelection) {
    tr = tr.setSelection(
      new TextSelection(tr.doc.resolve($from.pos + 1 - (shouldSplit ? 0 : 2))),
    );
  }

  // lift list up if the node after the initial one was a taskList
  // which means it would have empty placeholder content if we just immediately delete it
  //
  // if it's a taskItem then it can stand alone, so it's fine

  const $oldAfter = origDoc.resolve($from.after());

  // if different levels then we shouldn't lift
  if ($oldAfter.depth === $from.depth - 1) {
    if (
      $oldAfter.nodeAfter &&
      ['taskList', 'decisionList'].indexOf($oldAfter.nodeAfter.type.name) > -1
    ) {
      // getBlockRange expects to be inside the taskItem
      const pos = tr.mapping.map($oldAfter.pos + 2);
      const $after = tr.doc.resolve(pos);

      const blockRange = getBlockRange(
        $after,
        tr.doc.resolve($after.after($after.depth - 1) - 1),
      );
      if (blockRange) {
        tr = tr.lift(blockRange, blockRange.depth - 1).scrollIntoView();
      }

      tr = tr.deleteRange(pos - 3, pos - 2);
    }
  }

  return tr;
};

const splitListItem = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
) => {
  let { tr } = state;
  const { schema } = state;

  if (canSplitListItem(tr)) {
    if (dispatch) {
      dispatch(
        splitListItemWith(
          tr,
          schema.nodes.paragraph.createChecked(),
          state.selection.$from,
          true,
        ),
      );
    }
    return true;
  }

  return false;
};

export function keymapPlugin(schema: Schema): Plugin | undefined {
  const keymaps = {
    'Shift-Tab': unindent,
    Tab: indent,
    Backspace: backspace,
    Delete: deleteForwards,

    Enter: (state: EditorState, dispatch: (tr: Transaction) => void) => {
      const { selection } = state;
      const { $from } = selection;
      const node = $from.node($from.depth);
      const nodeType = node && node.type;
      const isEmpty = node && node.textContent.length === 0;
      const listType: TaskDecisionListType =
        nodeType === state.schema.nodes.taskItem ? 'taskList' : 'decisionList';

      if (!isInsideTaskOrDecisionItem(state)) {
        return false;
      }

      // unindent if it's an empty nested taskItem (inside taskList)
      if (isEmpty && $from.node($from.depth - 2).type.name === 'taskList') {
        return unindent(state, dispatch);
      }

      // not nested, exit the list if possible
      if (isEmpty && splitListItem(state, dispatch)) {
        return true;
      }

      const addItem = ({
        tr,
        itemLocalId,
      }: {
        tr: Transaction;
        itemLocalId?: string;
      }) => {
        return tr.split($from.pos, 1, [
          { type: nodeType, attrs: { localId: itemLocalId } },
        ]);
      };

      const insertTr = insertTaskDecisionWithAnalytics(
        state,
        listType,
        INPUT_METHOD.KEYBOARD,
        addItem,
      );

      if (insertTr) {
        insertTr.scrollIntoView();
        dispatch(insertTr);
      }

      return true;
    },
  };
  return keymap(keymaps);
}

export default keymapPlugin;
