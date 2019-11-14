import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { CellSelection } from 'prosemirror-tables';
import { getSelectionRect } from 'prosemirror-utils';
import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { Transaction, Selection } from 'prosemirror-state';
import { Command } from '../../../types';
import { createCommand } from '../pm-plugins/main';
import { ReorderingType } from '../types';
import {
  cleanupAfterReordering,
  moveRow,
  moveColumn,
  getRowHeights,
  getColumnsWidths,
  addStylesToCellsBeforeReordering,
  getSelectedColumnIndexes,
  getSelectedRowIndexes,
  bringBackControlsDimensions,
} from '../utils';
import { selectColumns, selectRows } from '../transforms/selection';

export const onBeforeReorderingStart = (
  type: ReorderingType,
  index: number,
  tableRef: HTMLTableElement,
  view: EditorView,
) => {
  const tbody = tableRef.querySelector('tbody');
  const { selection } = view.state;
  const columnWidths = getColumnsWidths(view);
  const rowHeights = getRowHeights(tableRef);
  const tableWidth = tbody ? tbody.offsetWidth : undefined;
  const tableHeight = tbody ? tbody.offsetHeight : undefined;
  const selectionRect = getSelectionRect(selection);

  let selectedIndexes: number[] = [];
  if (selectionRect && selection instanceof CellSelection) {
    if (type === 'rows' && selection.isRowSelection()) {
      selectedIndexes = getSelectedRowIndexes(selectionRect);
    } else if (type === 'columns' && selection.isColSelection()) {
      selectedIndexes = getSelectedColumnIndexes(selectionRect);
    }
  }

  const multiReorderIndexes =
    selectedIndexes.indexOf(index) > -1 ? selectedIndexes : [];

  // locking dimensions of all cells
  addStylesToCellsBeforeReordering(tableRef, columnWidths, rowHeights);

  addStylesToCellsBeforeReordering(tableRef, columnWidths, rowHeights);

  bringBackControlsDimensions(type, tableRef);

  // reset CellSelection
  const { tr } = view.state;
  if (selectionRect) {
    const sel = Selection.findFrom(view.state.selection.$from, 1, true);
    if (sel) {
      tr.setSelection(sel);
    }
  }

  return createCommand(
    {
      type: 'ON_BEFORE_REORDERING_START',
      data: {
        type,
        columnWidths,
        rowHeights,
        tableWidth,
        tableHeight,
        reorderIndex: index,
        multiReorderIndexes,
      },
    },
    () => tr.setMeta('addToHistory', false),
  );
};

const endReordering = (tr: Transaction) =>
  createCommand(
    {
      type: 'ON_REORDERING_END',
    },
    () => tr,
  );

// returns new indexes of the dropped columns/rows
const mapIndexes = (
  source: DraggableLocation,
  destination: DraggableLocation,
  multiReorderIndexes: number[],
) => {
  const shift = !multiReorderIndexes.length
    ? // dragging a single item
      destination.index - source.index
    : // forward multi drag
    destination.index > source.index
    ? destination.index - Math.max(...multiReorderIndexes)
    : // backwards multi drag
      destination.index - Math.min(...multiReorderIndexes);
  return !multiReorderIndexes.length
    ? // dragging a single item
      [destination.index]
    : // reordering within the selected items
    multiReorderIndexes.indexOf(destination.index) > -1
    ? multiReorderIndexes
    : // multi drag
      multiReorderIndexes.map(index => index + shift);
};

export const onReorderingEnd = (
  table: PmNode,
  tableStart: number,
  result?: DropResult,
  multiReorderIndexes: number[] = [],
): Command => (state, dispatch) => {
  const { tr } = state;

  if (result) {
    const { source, destination } = result;
    if (
      source.droppableId === 'rows' &&
      destination &&
      destination.droppableId === 'rows'
    ) {
      moveRow(
        table,
        tableStart,
        multiReorderIndexes,
        source.index,
        destination.index,
      )(tr);
      selectRows(mapIndexes(source, destination, multiReorderIndexes))(tr);
    } else if (
      source.droppableId === 'columns' &&
      destination &&
      destination.droppableId === 'columns'
    ) {
      moveColumn(
        table,
        tableStart,
        multiReorderIndexes,
        source.index,
        destination.index,
      )(tr);
      selectColumns(mapIndexes(source, destination, multiReorderIndexes))(tr);
    }
  }

  endReordering(tr)(state, dispatch);
  cleanupAfterReordering();

  return true;
};
