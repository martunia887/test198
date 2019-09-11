import { keymap } from 'prosemirror-keymap';
import {
  Node,
  Schema,
  NodeType,
  Fragment,
  Slice,
  ResolvedPos,
} from 'prosemirror-model';
import {
  EditorState,
  Transaction,
  Plugin,
  TextSelection,
} from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import {
  splitListAtSelection,
  insertTaskDecisionWithAnalytics,
} from '../commands';
import { INPUT_METHOD } from '../../analytics';
import { TaskDecisionListType } from '../types';
import { Command } from '../../../types';
import {
  canSplit,
  findWrapping,
  Transform,
  ReplaceAroundStep,
} from 'prosemirror-transform';
import { liftListItem } from 'prosemirror-schema-list';
import { autoJoin } from 'prosemirror-commands';
import { findCutBefore } from '../../../utils/commands';

const isInsideTaskOrDecisionItem = (state: EditorState) => {
  const { decisionItem, taskItem } = state.schema.nodes;
  return hasParentNodeOfType([decisionItem, taskItem])(state.selection);
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
    if (!isInsideTaskOrDecisionItem(state)) {
      return false;
    }

    const { $from, $to } = state.selection;
    if (dispatch) {
      const blockRange = getBlockRange($from, $to);
      if (!blockRange) {
        return true;
      }

      dispatch(
        state.tr.lift(blockRange, blockRange.depth - 1).scrollIntoView(),
      );
    }

    return true;
  },
  ['taskList'],
);

const indent = autoJoin(
  (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    if (!isInsideTaskOrDecisionItem(state)) {
      return false;
    }

    const { $from, $to } = state.selection;
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

const backspace = autoJoin(
  (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { $from } = state.selection;

    // try to join paragraph and taskList when backspacing
    const $cut = findCutBefore($from);
    if ($cut) {
      if (
        $cut.nodeBefore &&
        $cut.nodeBefore.type.name === 'taskList' &&
        $cut.nodeAfter &&
        $cut.nodeAfter.type.name === 'paragraph'
      ) {
        // taskList contains taskItem, so this is the end of the inside
        let $lastNode = $cut.doc.resolve($cut.pos - 1);

        while ($lastNode.parent.type.name !== 'taskItem') {
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

    if ($from.start() !== $from.pos) {
      return false;
    }

    // previous was empty, just delete backwards
    const taskBefore = $from.doc.resolve($from.before());
    if (
      taskBefore.nodeBefore &&
      taskBefore.nodeBefore.type.name === 'taskItem' &&
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

        dispatch(splitListItemWith(state.tr, slice));
      }

      return true;
    }

    return false;
  },
  ['taskList'],
);

const canSplitListItem = (tr: Transaction) => {
  const { $from } = tr.selection;
  const afterTaskItem = tr.doc.resolve($from.end()).nodeAfter;

  return (
    !afterTaskItem || (afterTaskItem && afterTaskItem.type.name === 'taskItem')
  );
};

const splitListItemWith = (
  tr: Transaction,
  content: Fragment | Node | Node[],
) => {
  const { $from } = tr.selection;

  const origDoc = tr.doc;

  // split just before the current item
  // we can only split if there was a list item before us
  const listContainer = $from.node($from.depth - 2).type.name;
  const posInList = $from.index($from.depth - 1);
  const shouldSplit = !(listContainer !== 'taskList' && posInList === 0);

  if (shouldSplit) {
    // TODO: new id for split taskList
    tr = tr.split($from.pos - 1);
  }

  // and delete the action at the current pos
  // we can do this because we know either first new child will be taskItem or nothing at all
  tr = tr.deleteRange(
    tr.mapping.map($from.start()),
    tr.mapping.map($from.end() + 1),
  );

  // taskList and taskItem positions collapse (nodes get deleted), so $from.pos is now the
  // start of the split taskList or remaining nodes in doc
  tr = tr.insert($from.pos - (shouldSplit ? 0 : 2), content);

  // put cursor inside paragraph
  tr = tr.setSelection(
    new TextSelection(tr.doc.resolve($from.pos + 1 - (shouldSplit ? 0 : 2))),
  );

  // lift list up if the node after the initial one was a taskList
  // which means it would have empty placeholder content if we just immediately delete it
  //
  // if it's a taskItem then it can stand alone, so it's fine

  const $oldAfter = origDoc.resolve($from.after());

  // if different levels then we shouldn't lift
  if ($oldAfter.depth === $from.depth - 1) {
    if ($oldAfter.nodeAfter && $oldAfter.nodeAfter.type.name === 'taskList') {
      // getBlockRange expects to be inside the taskItem
      const pos = tr.mapping.map($oldAfter.pos + 2);
      const $after = tr.doc.resolve(pos);

      const blockRange = getBlockRange($after, $after);
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
      dispatch(splitListItemWith(tr, schema.nodes.paragraph.createChecked()));
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
