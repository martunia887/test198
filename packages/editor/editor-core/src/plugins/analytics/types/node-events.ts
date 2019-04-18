import { TrackAEP } from './events';
import {
  ACTION_SUBJECT,
  INPUT_METHOD,
  ACTION,
  ACTION_SUBJECT_ID,
} from './enums';

export enum PANEL_TYPE {
  INFO = 'info',
  SUCCESS = 'success',
  NOTE = 'note',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum LAYOUT_TYPE {
  TWO_COLS_EQUAL = 'twoColumnsEqual',
  THREE_COLS_EQUAL = 'threeColumnsEqual',
  LEFT_SIDEBAR = 'twoColumnsLeftSidebar',
  RIGHT_SIDEBAR = 'twoColumnsRightSidebar',
}

type DeletePanelAEP = TrackAEP<
  ACTION.DELETED,
  ACTION_SUBJECT.PANEL,
  undefined,
  { inputMethod: INPUT_METHOD.TOOLBAR }
>;

type ChangePanelAEP = TrackAEP<
  ACTION.CHANGED_TYPE,
  ACTION_SUBJECT.PANEL,
  undefined,
  { newType: PANEL_TYPE; previousType: PANEL_TYPE }
>;

type VisitedSmartLink = TrackAEP<
  ACTION.VISITED,
  ACTION_SUBJECT.SMART_LINK,
  ACTION_SUBJECT_ID.CARD_BLOCK | ACTION_SUBJECT_ID.CARD_INLINE,
  { inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.CARD }
>;

type DeletedSmartLink = TrackAEP<
  ACTION.DELETED,
  ACTION_SUBJECT.SMART_LINK,
  ACTION_SUBJECT_ID.CARD_BLOCK | ACTION_SUBJECT_ID.CARD_INLINE,
  {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.CARD;
    displayMode: ACTION_SUBJECT_ID.CARD_BLOCK | ACTION_SUBJECT_ID.CARD_INLINE;
  }
>;

type ChangedLayoutAEP = TrackAEP<
  ACTION.CHANGED_LAYOUT,
  ACTION_SUBJECT.LAYOUT,
  undefined,
  {
    previousLayout: LAYOUT_TYPE;
    newLayout: LAYOUT_TYPE;
  }
>;

type DeletedLayoutAEP = TrackAEP<
  ACTION.DELETED,
  ACTION_SUBJECT.LAYOUT,
  undefined,
  { layout: LAYOUT_TYPE }
>;

export type NodeEventPayload =
  | ChangePanelAEP
  | DeletePanelAEP
  | DeletedSmartLink
  | VisitedSmartLink
  | ChangedLayoutAEP
  | DeletedLayoutAEP;
