import { EditorView } from 'prosemirror-view';
import {
  EditorState,
  Transaction,
  TextSelection,
  Selection,
} from 'prosemirror-state';
import { Node as PmNode } from 'prosemirror-model';
import { TableMap, cellAround, CellSelection } from 'prosemirror-tables';
import {
  findTable,
  getCellsInRow,
  getCellsInColumn,
  getSelectionRect,
  removeTable,
} from 'prosemirror-utils';
import { browser } from '@atlaskit/editor-common';

import { analyticsService } from '../../analytics';
import {
  addAnalytics,
  TABLE_ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
} from '../analytics';
import { Command } from '../../types';
import {
  isElementInTableCell,
  setNodeSelection,
  isLastItemMediaGroup,
  closestElement,
} from '../../utils/';
import { isInsertColumnButton, isInsertRowButton, getIndex } from './utils';
import {
  setEditorFocus,
  showInsertColumnButton,
  showInsertRowButton,
  hideInsertColumnOrRowButton,
} from './actions';
import { getPluginState } from './pm-plugins/main';
import { getSelectedCellInfo } from './utils';
import { deleteColumns, deleteRows } from './transforms';
import { TableCssClassName as ClassName } from './types';

export const handleBlur = (view: EditorView, event: Event): boolean => {
  const { state, dispatch } = view;
  // fix for issue ED-4665
  if (browser.ie_version !== 11) {
    setEditorFocus(false)(state, dispatch);
  }
  event.preventDefault();
  return false;
};

export const handleFocus = (view: EditorView, event: Event): boolean => {
  const { state, dispatch } = view;
  setEditorFocus(true)(state, dispatch);
  event.preventDefault();
  return false;
};

export const handleClick = (view: EditorView, event: Event): boolean => {
  const element = event.target as HTMLElement;
  const table = findTable(view.state.selection)!;

  /**
   * Check if the table cell with an image is clicked
   * and its not the image itself
   */
  const matches = element.matches ? 'matches' : 'msMatchesSelector';
  if (
    !table ||
    !isElementInTableCell(element) ||
    element[matches as 'matches']('table .image, table p, table .image div')
  ) {
    return false;
  }
  const map = TableMap.get(table.node);

  /** Getting the offset of current item clicked */
  const colElement = (closestElement(element, 'td') ||
    closestElement(element, 'th')) as HTMLTableDataCellElement;
  const colIndex = colElement && colElement.cellIndex;
  const rowElement = closestElement(element, 'tr') as HTMLTableRowElement;
  const rowIndex = rowElement && rowElement.rowIndex;
  const cellIndex = map.width * rowIndex + colIndex;
  const posInTable = map.map[cellIndex + 1];

  const {
    dispatch,
    state: {
      tr,
      schema: {
        nodes: { paragraph },
      },
    },
  } = view;
  const editorElement = table.node.nodeAt(map.map[cellIndex]) as PmNode;

  /** Only if the last item is media group, insert a paragraph */
  if (isLastItemMediaGroup(editorElement)) {
    tr.insert(posInTable + table.pos, paragraph.create());
    dispatch(tr);
    setNodeSelection(view, posInTable + table.pos);
  }
  return true;
};

export const handleMouseOver = (
  view: EditorView,
  mouseEvent: Event,
): boolean => {
  const { state, dispatch } = view;
  const target = mouseEvent.target as HTMLElement;

  if (isInsertColumnButton(target)) {
    return showInsertColumnButton(getIndex(target))(state, dispatch);
  }
  if (isInsertRowButton(target)) {
    return showInsertRowButton(getIndex(target))(state, dispatch);
  }
  if (hideInsertColumnOrRowButton(state, dispatch)) {
    return true;
  }
  return false;
};

export const handleMouseLeave = (view: EditorView): boolean => {
  const { state, dispatch } = view;
  if (hideInsertColumnOrRowButton(state, dispatch)) {
    return true;
  }
  return false;
};

export function handleTripleClick(view: EditorView, pos: number) {
  const { state, dispatch } = view;
  const $cellPos = cellAround(state.doc.resolve(pos));
  if (!$cellPos) {
    return false;
  }

  const cell = state.doc.nodeAt($cellPos.pos);
  if (cell) {
    const selFrom = Selection.findFrom($cellPos, 1, true);
    const selTo = Selection.findFrom(
      state.doc.resolve($cellPos.pos + cell.nodeSize),
      -1,
      true,
    );
    if (selFrom && selTo) {
      dispatch(
        state.tr.setSelection(new TextSelection(selFrom.$from, selTo.$to)),
      );
      return true;
    }
  }

  return false;
}
export const handleMouseDown = (view: EditorView, event: Event): boolean => {
  const { state, dispatch } = view;

  // shift-selecting table rows/columns
  if (handleShiftSelection(event as MouseEvent)(state, dispatch)) {
    return true;
  }

  return false;
};

export const handleCut = (
  oldTr: Transaction,
  oldState: EditorState,
  newState: EditorState,
): Transaction => {
  const oldSelection = oldState.tr.selection;
  let { tr } = newState;
  if (oldSelection instanceof CellSelection) {
    const $anchorCell = oldTr.doc.resolve(
      oldTr.mapping.map(oldSelection.$anchorCell.pos),
    );
    const $headCell = oldTr.doc.resolve(
      oldTr.mapping.map(oldSelection.$headCell.pos),
    );

    // We need to fix the type of CellSelection in `prosemirror-tables'
    const cellSelection = new CellSelection($anchorCell, $headCell) as any;
    tr.setSelection(cellSelection);

    if (tr.selection instanceof CellSelection) {
      const rect = getSelectionRect(cellSelection);
      if (rect) {
        const {
          verticalCells,
          horizontalCells,
          totalCells,
          totalRowCount,
          totalColumnCount,
        } = getSelectedCellInfo(tr.selection);

        // Reassigning to make it more obvious and consistent
        tr = addAnalytics(tr, {
          action: TABLE_ACTION.CUT,
          actionSubject: ACTION_SUBJECT.TABLE,
          actionSubjectId: null,
          attributes: {
            verticalCells,
            horizontalCells,
            totalCells,
            totalRowCount,
            totalColumnCount,
          },
          eventType: EVENT_TYPE.TRACK,
        });

        // Need this check again since we are overriding the tr in previous statement
        if (tr.selection instanceof CellSelection) {
          const isTableSelected =
            tr.selection.isRowSelection() && tr.selection.isColSelection();
          if (isTableSelected) {
            tr = removeTable(tr);
          } else if (tr.selection.isRowSelection()) {
            const {
              pluginConfig: { isHeaderRowRequired },
            } = getPluginState(newState);
            tr = deleteRows(rect, isHeaderRowRequired)(tr);
            analyticsService.trackEvent(
              'atlassian.editor.format.table.delete_row.button',
            );
          } else if (tr.selection.isColSelection()) {
            analyticsService.trackEvent(
              'atlassian.editor.format.table.delete_column.button',
            );
            tr = deleteColumns(rect)(tr);
          }
        }
      }
    }
  }

  return tr;
};

export const handleShiftSelection = (event: MouseEvent): Command => (
  state,
  dispatch,
) => {
  if (!(state.selection instanceof CellSelection) || !event.shiftKey) {
    return false;
  }
  const { selection } = state;
  if (selection.isRowSelection() || selection.isColSelection()) {
    const selector = selection.isRowSelection()
      ? `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}`
      : `.${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}`;
    const button = closestElement(event.target as HTMLElement, selector);
    if (!button) {
      return false;
    }

    const buttons = document.querySelectorAll(selector);
    const index = Array.from(buttons).indexOf(button);
    const rect = getSelectionRect(selection)!;
    const startCells = selection.isRowSelection()
      ? getCellsInRow(index >= rect.bottom ? rect.top : rect.bottom - 1)(
          selection,
        )
      : getCellsInColumn(index >= rect.right ? rect.left : rect.right - 1)(
          selection,
        );
    const endCells = selection.isRowSelection()
      ? getCellsInRow(index)(selection)
      : getCellsInColumn(index)(selection);
    if (startCells && endCells) {
      event.stopPropagation();
      event.preventDefault();

      if (dispatch) {
        dispatch(
          state.tr.setSelection(new CellSelection(
            state.doc.resolve(startCells[startCells.length - 1].pos),
            state.doc.resolve(endCells[0].pos),
          ) as any),
        );
      }
      return true;
    }
  }

  return false;
};
