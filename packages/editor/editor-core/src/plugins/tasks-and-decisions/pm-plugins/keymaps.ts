import { keymap } from 'prosemirror-keymap';
import { Node, Schema, Fragment, ResolvedPos, Slice } from 'prosemirror-model';
import {
  EditorState,
  Transaction,
  Plugin,
  TextSelection,
} from 'prosemirror-state';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { insertTaskDecisionWithAnalytics } from '../commands';
import { TaskDecisionListType } from '../types';
import {
  findWrapping,
  ReplaceAroundStep,
  liftTarget,
} from 'prosemirror-transform';
import { autoJoin, chainCommands } from 'prosemirror-commands';
import {
  findCutBefore,
  filter,
  isEmptySelectionAtEnd,
  isEmptySelectionAtStart,
} from '../../../utils/commands';
import { Command, CommandDispatch } from '../../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  INDENT_DIR,
  INDENT_TYPE,
  INPUT_METHOD,
  analyticsDispatch,
} from '../../analytics';

import {
  isInsideTaskOrDecisionItem,
  isActionOrDecisionList,
  isActionOrDecisionItem,
  isInsideTask,
  getBlockRange,
  getCurrentIndentLevel,
  walkOut,
} from './helpers';

const indentationAnalyticsDispatch = (
  curIndentLevel: number,
  direction: INDENT_DIR,
  dispatch: CommandDispatch | undefined,
) =>
  analyticsDispatch(
    {
      action: ACTION.FORMATTED,
      actionSubject: ACTION_SUBJECT.TEXT,
      actionSubjectId: ACTION_SUBJECT_ID.FORMAT_INDENT,
      eventType: EVENT_TYPE.TRACK,
      attributes: {
        inputMethod: INPUT_METHOD.KEYBOARD,
        previousIndentationLevel: curIndentLevel,
        newIndentLevel:
          direction === INDENT_DIR.OUTDENT
            ? curIndentLevel - 1
            : curIndentLevel + 1,
        direction,
        indentType: INDENT_TYPE.TASK_LIST,
      },
    },
    dispatch,
  );

const liftSelection: Command = (state, dispatch) => {
  const { $from, $to } = state.selection;
  const blockRange = getBlockRange($from, $to);
  if (!blockRange) {
    return true;
  }

  // ensure we can actually lift
  const target = liftTarget(blockRange);
  if (!target) {
    return true;
  }

  if (dispatch) {
    dispatch(state.tr.lift(blockRange, target).scrollIntoView());
  }

  return true;
};

const wrapSelectionInTaskList: Command = (state, dispatch) => {
  const { $from, $to } = state.selection;
  const blockRange = getBlockRange($from, $to);
  if (!blockRange) {
    return true;
  }

  const wrapping = findWrapping(blockRange, state.schema.nodes.taskList);
  if (!wrapping) {
    return true;
  }

  if (dispatch) {
    dispatch(state.tr.wrap(blockRange, wrapping).scrollIntoView());
  }

  return true;
};

// FIXME: ensure this works right
const canSplitListItem = (tr: Transaction) => {
  const { $from } = tr.selection;
  const afterTaskItem = tr.doc.resolve($from.end()).nodeAfter;

  return (
    !afterTaskItem || (afterTaskItem && isActionOrDecisionItem(afterTaskItem))
  );
};

const unindent = filter(isInsideTask, (state, dispatch) => {
  const curIndentLevel = getCurrentIndentLevel(state.selection);
  if (!curIndentLevel || curIndentLevel === 1) {
    return false;
  }

  return autoJoin(liftSelection, ['taskList'])(
    state,
    indentationAnalyticsDispatch(curIndentLevel, INDENT_DIR.OUTDENT, dispatch),
  );
});

const indent = filter(isInsideTask, (state, dispatch) => {
  // limit ui indentation to 6 levels
  const curIndentLevel = getCurrentIndentLevel(state.selection);
  if (!curIndentLevel || curIndentLevel >= 6) {
    return true;
  }

  return autoJoin(wrapSelectionInTaskList, ['taskList'])(
    state,
    indentationAnalyticsDispatch(curIndentLevel, INDENT_DIR.INDENT, dispatch),
  );
});

const backspaceFrom = ($from: ResolvedPos): Command => (state, dispatch) => {
  // previous was empty, just delete backwards
  const taskBefore = $from.doc.resolve($from.before());
  if (
    taskBefore.nodeBefore &&
    isActionOrDecisionItem(taskBefore.nodeBefore) &&
    taskBefore.nodeBefore.nodeSize === 2
  ) {
    return false;
  }

  // if nested, just unindent
  const { taskList, paragraph } = state.schema.nodes;
  if ($from.node($from.depth - 2).type === taskList) {
    return unindent(state, dispatch);
  }

  // bottom level, should "unwrap" taskItem contents into paragraph
  // we achieve this by slicing the content out, and replacing
  if (canSplitListItem(state.tr)) {
    if (dispatch) {
      const taskContent = state.doc.slice($from.start(), $from.end()).content;

      // might be end of document after
      const slice = taskContent.size
        ? paragraph.createChecked(undefined, taskContent)
        : paragraph.createChecked();

      dispatch(splitListItemWith(state.tr, slice, $from, true));
    }

    return true;
  }

  return false;
};

const backspace = filter(
  isEmptySelectionAtStart,
  autoJoin(
    (state, dispatch) => {
      const { $from } = state.selection;
      const { paragraph } = state.schema.nodes;

      // try to join paragraph and taskList when backspacing
      const $cut = findCutBefore($from);
      if ($cut) {
        if (
          $cut.nodeBefore &&
          isActionOrDecisionList($cut.nodeBefore) &&
          $cut.nodeAfter &&
          $cut.nodeAfter.type === paragraph
        ) {
          // taskList contains taskItem, so this is the end of the inside
          let $lastNode = $cut.doc.resolve($cut.pos - 1);

          while (!isActionOrDecisionItem($lastNode.parent)) {
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
  ),
);

const deleteHandler = filter(
  [isInsideTaskOrDecisionItem, isEmptySelectionAtEnd],
  (state, dispatch) => {
    // look for the node after this current one
    const $next = walkOut(state.selection.$from);

    // if there's no taskItem or taskList following, then we just do the normal behaviour
    const {
      taskList,
      taskItem,
      decisionList,
      decisionItem,
      paragraph,
    } = state.schema.nodes;
    const parentList = findParentNodeOfTypeClosestToPos($next, [
      taskList,
      taskItem,
      decisionList,
      decisionItem,
    ]);
    if (!parentList) {
      if ($next.node().type === paragraph) {
        // try to join paragraph and taskList when backspacing
        const $cut = findCutBefore($next.doc.resolve($next.pos));
        if ($cut) {
          if (
            $cut.nodeBefore &&
            isActionOrDecisionItem($cut.nodeBefore) &&
            $cut.nodeAfter &&
            $cut.nodeAfter.type === paragraph
          ) {
            // taskList contains taskItem, so this is the end of the inside
            let $lastNode = $cut.doc.resolve($cut.pos - 1);

            while (!isActionOrDecisionItem($lastNode.parent)) {
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
    const taskBefore = $next.doc.resolve($next.before());
    if (
      taskBefore.nodeBefore &&
      isActionOrDecisionItem(taskBefore.nodeBefore) &&
      taskBefore.nodeBefore.nodeSize === 2
    ) {
      return false;
    }

    // if nested, just unindent
    if ($next.node($next.depth - 2).type === taskList) {
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
          ? paragraph.createChecked(undefined, taskContent)
          : [];

        dispatch(splitListItemWith(state.tr, slice, $next, false));
      }

      return true;
    }

    return false;
  },
);

const deleteForwards = autoJoin(deleteHandler, ['taskList', 'decisionList']);

const splitListItemWith = (
  tr: Transaction,
  content: Fragment | Node | Node[],
  $from: ResolvedPos,
  setSelection: boolean,
) => {
  const origDoc = tr.doc;

  // split just before the current item
  // we can only split if there was a list item before us
  const container = $from.node($from.depth - 2);
  const posInList = $from.index($from.depth - 1);
  const shouldSplit = !(!isActionOrDecisionList(container) && posInList === 0);

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
    if ($oldAfter.nodeAfter && isActionOrDecisionList($oldAfter.nodeAfter)) {
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
  let {
    tr,
    selection: { $from },
  } = state;
  const {
    schema: {
      nodes: { paragraph },
    },
  } = state;

  if (canSplitListItem(tr)) {
    if (dispatch) {
      dispatch(splitListItemWith(tr, paragraph.createChecked(), $from, true));
    }
    return true;
  }

  return false;
};

const isEmptyAction = (state: EditorState) => {
  const { selection } = state;
  const { $from } = selection;
  const node = $from.node($from.depth);
  return node && node.textContent.length === 0;
};

// // NB: previous version checked that it was nested, but might not
// // need to do that here
// const unindentIfEmptyAction: Command = (state, dispatch) => {
//   // unindent if it's an empty nested taskItem (inside taskList)
//   if (isEmpty && $from.node($from.depth - 2).type === schema.nodes.taskList) {
//     return unindent(state, dispatch);
//   }

//   return false;
// };

const enter: Command = filter(
  isInsideTaskOrDecisionItem,
  chainCommands(
    filter(isEmptyAction, chainCommands(unindent, splitListItem)),
    (state, dispatch) => {
      const { selection, schema } = state;
      const { taskItem } = schema.nodes;
      const { $from } = selection;
      const node = $from.node($from.depth);
      const nodeType = node && node.type;
      const listType: TaskDecisionListType =
        nodeType === taskItem ? 'taskList' : 'decisionList';

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

      if (insertTr && dispatch) {
        insertTr.scrollIntoView();
        dispatch(insertTr);
      }

      return true;
    },
  ),
);

export function keymapPlugin(schema: Schema): Plugin | undefined {
  const keymaps = {
    'Shift-Tab': chainCommands(unindent, () => true),
    Tab: indent,
    Backspace: backspace,
    Delete: deleteForwards,
    Enter: enter,
  };
  return keymap(keymaps);
}

export default keymapPlugin;
