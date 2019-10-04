// #region Imports
import { EditorState, Selection } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import {
  findTable,
  addColumnAt,
  addRowAt,
  safeInsert,
  createTable as createTableNode,
} from 'prosemirror-utils';
import { getPluginState } from '../pm-plugins/main';
import { checkIfHeaderRowEnabled, copyPreviousRow } from '../utils';
import { Command } from '../../../types';
import { addAnalytics, AnalyticsEventPayload } from '../../analytics';
// #endregion

// #region Commands
export const insertColumn = (
  column: number,
  getPayload?: (state: EditorState) => AnalyticsEventPayload,
): Command => (state, dispatch) => {
  const tr = state.tr;
  if (getPayload) {
    addAnalytics(state, tr, getPayload(state));
  }
  addColumnAt(column)(tr);
  const table = findTable(tr.selection);
  if (!table) {
    return false;
  }
  // move the cursor to the newly created column
  const pos = TableMap.get(table.node).positionAt(0, column, table.node);
  if (dispatch) {
    dispatch(
      tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos))),
    );
  }
  return true;
};

export const insertRow = (row: number): Command => (state, dispatch) => {
  // Don't clone the header row
  const headerRowEnabled = checkIfHeaderRowEnabled(state);
  const clonePreviousRow =
    (headerRowEnabled && row > 1) || (!headerRowEnabled && row > 0);

  const tr = clonePreviousRow
    ? copyPreviousRow(state.schema)(row)(state.tr)
    : addRowAt(row)(state.tr);

  const table = findTable(tr.selection);
  if (!table) {
    return false;
  }
  // move the cursor to the newly created row
  const pos = TableMap.get(table.node).positionAt(row, 0, table.node);

  if (dispatch) {
    dispatch(
      tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos))),
    );
  }
  return true;
};

export const createTable: Command = (state, dispatch) => {
  if (!getPluginState(state)) {
    return false;
  }
  const table = createTableNode(state.schema);

  if (dispatch) {
    dispatch(safeInsert(table)(state.tr).scrollIntoView());
  }
  return true;
};
// #endregion
