import { ResolvedPos } from 'prosemirror-model';
import {
  findWrapping,
  ReplaceAroundStep,
  liftTarget,
} from 'prosemirror-transform';
import { findCutBefore } from '../../../utils/commands';
import { Command } from '../../../types';

import {
  isActionOrDecisionList,
  isActionOrDecisionItem,
  getBlockRange,
} from './helpers';
import { Transaction } from 'prosemirror-state';

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

export const liftSelection: Command = (state, dispatch) => {
  const { $from, $to } = state.selection;
  const tr = liftBlock(state.tr, $from, $to);

  if (dispatch && tr) {
    dispatch(tr);
  }

  return !!tr;
};

export const wrapSelectionInTaskList: Command = (state, dispatch) => {
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

export const joinAtCut = ($pos: ResolvedPos): Command => (state, dispatch) => {
  const $cut = findCutBefore($pos);
  if (!$cut) {
    return false;
  }
  const { paragraph } = $cut.doc.type.schema.nodes;

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

  return false;
};
