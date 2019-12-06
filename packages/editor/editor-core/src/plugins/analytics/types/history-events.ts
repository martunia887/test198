import { ACTION, ACTION_SUBJECT_ID, ACTION_SUBJECT } from './enums';
import { TABLE_ACTION, TABLE_FIX_ACTION } from './table-events';
import { TrackAEP } from './events';

type HistoryAEP<Action> = TrackAEP<
  Action,
  ACTION_SUBJECT,
  ACTION | TABLE_ACTION | TABLE_FIX_ACTION,
  {
    [key: string]: any;
    actionSubjectId: ACTION_SUBJECT_ID | undefined | null;
  },
  undefined
>;

type UndoAEP = HistoryAEP<ACTION.UNDID>;

type RedoAEP = HistoryAEP<ACTION.REDID>;

export type HistoryEventPayload = UndoAEP | RedoAEP;
