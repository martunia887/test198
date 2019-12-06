import { Transaction, EditorState } from 'prosemirror-state';
import { pluginKey } from '../pm-plugins/main';
import {
  addAnalytics,
  ACTION_SUBJECT,
  EVENT_TYPE,
  AnalyticsEventPayload,
  TABLE_FIX_ACTION,
} from '../../analytics';
import { analyticsService } from '../../../analytics';

// Set metadata on a ProseMirror transaction for debugging purposes in Synchrony
type TableProblems =
  | 'NEGATIVE_ROWSPAN'
  | 'REMOVE_EMPTY_ROWS'
  | 'REMOVE_EMPTY_COLUMNS'
  | 'EMPTY_TABLE'
  | 'FIX_ROWSPANS'
  | 'COLWIDTHS_BEFORE_UPDATE'
  | 'COLWIDTHS_AFTER_UPDATE';

export type TableMetaData =
  | { type: 'MERGE_CELLS'; problem?: TableProblems }
  | { type: 'DELETE_ROWS'; problem?: TableProblems }
  | { type: 'DELETE_COLUMNS'; problem?: TableProblems }
  | {
      type: 'UPDATE_COLUMN_WIDTHS';
      data: { colwidths: number[]; colspan: number };
      problem?: TableProblems;
    };

export const setMeta = (meta: TableMetaData, state: EditorState) => (
  tr: Transaction,
): Transaction => {
  if (meta.problem) {
    // Send analytics event whenever we encounter with a problem
    const analyticsPayload = createAnalyticsEvent(meta);
    if (analyticsPayload) tr = addAnalytics(state, tr, analyticsPayload);
  }
  return tr.setMeta(pluginKey, meta);
};

function createAnalyticsEvent(
  meta: TableMetaData,
): AnalyticsEventPayload | undefined {
  if (meta.problem) {
    // Temporarily dispatch legacy GasV2 event in parallel
    analyticsService.trackEvent('atlaskit.fabric.editor.fixtable', {
      properties: meta.toString(),
    });
    const attributes =
      meta.type === 'UPDATE_COLUMN_WIDTHS' ? meta.data : undefined;
    switch (meta.problem) {
      case 'NEGATIVE_ROWSPAN':
        return {
          action: TABLE_FIX_ACTION.NEGATIVE_ROWSPAN_PREVENTED,
          actionSubject: ACTION_SUBJECT.TABLE,
          eventType: EVENT_TYPE.OPERATIONAL,
        };
      case 'REMOVE_EMPTY_ROWS':
        return {
          action: TABLE_FIX_ACTION.REMOVED_EMPTY_ROWS,
          actionSubject: ACTION_SUBJECT.TABLE,
          eventType: EVENT_TYPE.OPERATIONAL,
        };
      case 'REMOVE_EMPTY_COLUMNS':
        return {
          action: TABLE_FIX_ACTION.REMOVED_EMPTY_COLUMNS,
          actionSubject: ACTION_SUBJECT.TABLE,
          eventType: EVENT_TYPE.OPERATIONAL,
        };
      case 'EMPTY_TABLE':
        return {
          action: TABLE_FIX_ACTION.ZERO_ROW_TABLE_PREVENTED,
          actionSubject: ACTION_SUBJECT.TABLE,
          eventType: EVENT_TYPE.OPERATIONAL,
        };
      case 'FIX_ROWSPANS':
        return {
          action: TABLE_FIX_ACTION.SUPERFLUOUS_ROWSPAN_PREVENTED,
          actionSubject: ACTION_SUBJECT.TABLE,
          eventType: EVENT_TYPE.OPERATIONAL,
        };
      case 'COLWIDTHS_BEFORE_UPDATE':
        return {
          action: TABLE_FIX_ACTION.COLWIDTHS_BEFORE_UPDATE,
          actionSubject: ACTION_SUBJECT.TABLE,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes,
        };
      case 'COLWIDTHS_AFTER_UPDATE':
        return {
          action: TABLE_FIX_ACTION.COLWIDTHS_AFTER_UPDATE,
          actionSubject: ACTION_SUBJECT.TABLE,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes,
        };
    }
  }
  return undefined;
}
