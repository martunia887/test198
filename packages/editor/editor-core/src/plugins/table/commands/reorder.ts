import { Node as PmNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { CellSelection, TableMap } from 'prosemirror-tables';
import {
  getSelectionRect,
  getSelectionRangeInRow,
  getSelectionRangeInColumn,
} from 'prosemirror-utils';
import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { Transaction, Selection } from 'prosemirror-state';
import { Command } from '../../../types';
import { createCommand, getPluginState } from '../pm-plugins/main';
import { ReorderingType } from '../types';
import {
  cleanupAfterReordering,
  moveRow,
  moveColumn,
  getRowHeights,
  getCellsWidthsFromDOM,
  addTableStylesBeforeReordering,
  getSelectedColumnIndexes,
  getSelectedRowIndexes,
  restoreControlsDimensions,
  enableGlobalDraggingStyles,
} from '../utils';
import { selectColumns, selectRows } from '../transforms/selection';

const arrayOverlap = (arr1: number[], arr2: number[]): boolean =>
  !!arr1.filter(value => arr2.indexOf(value) !== -1).length;

export const onBeforeReorderingStart = (
  table: PmNode,
  type: ReorderingType,
  index: number,
  tableRef: HTMLTableElement,
  state: EditorState,
) => {
  const { selection } = state;
  const tbody = tableRef.querySelector('tbody');
  const cellsWidths = getCellsWidthsFromDOM(tableRef);
  const columnWidths = cellsWidths.slice(0, TableMap.get(table).width);
  const rowHeights = getRowHeights(tableRef);
  const tableWidth = tbody ? tbody.offsetWidth : undefined;
  const tableHeight = tbody ? tbody.offsetHeight : undefined;
  const selectionRect = getSelectionRect(selection);
  const { indexes: mergedIndexes } =
    type === 'rows'
      ? getSelectionRangeInRow(index)(state.tr)
      : getSelectionRangeInColumn(index)(state.tr);

  let selectedIndexes: number[] = [];
  if (selectionRect && selection instanceof CellSelection) {
    if (type === 'rows' && selection.isRowSelection()) {
      const selected = getSelectedRowIndexes(selectionRect);
      selectedIndexes = arrayOverlap(mergedIndexes, selected)
        ? [...new Set([...mergedIndexes, ...selected])]
        : selected;
    } else if (type === 'columns' && selection.isColSelection()) {
      const selected = getSelectedColumnIndexes(selectionRect);
      selectedIndexes = arrayOverlap(mergedIndexes, selected)
        ? [...new Set([...mergedIndexes, ...selected])]
        : selected;
    }
  }

  const multiReorderIndexes =
    selectedIndexes.indexOf(index) > -1 ? selectedIndexes : mergedIndexes;

  addTableStylesBeforeReordering(
    tableRef,
    tableHeight,
    cellsWidths,
    rowHeights,
  );

  // We extend controls dimentions in "onBeforeCapture" to span the whole table to tell
  // RDB the correct draggable size, which is a column or row. This function restores original controls styles
  restoreControlsDimensions(type, tableRef);

  enableGlobalDraggingStyles();

  // reset CellSelection
  const { tr } = state;
  if (selectionRect) {
    const sel = Selection.findFrom(state.selection.$from, 1, true);
    if (sel) {
      tr.setSelection(sel);
    }
  }
  console.log({ mergedIndexes });
  return createCommand(
    {
      type: 'ON_BEFORE_REORDERING_START',
      data: {
        reordering: type,
        columnWidths,
        rowHeights,
        tableWidth,
        tableHeight,
        reorderIndex: index,
        multiReorderIndexes,
        mergedIndexes,
        tableNodeBeforeReorder: table,
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
  tableRef?: HTMLTableElement | null,
  result?: DropResult,
  multiReorderIndexes: number[] = [],
): Command => (state, dispatch) => {
  const { tr } = state;

  if (result && table === getPluginState(state).tableNodeBeforeReorder) {
    const { source, destination } = result;
    if (source.droppableId === 'rows') {
      if (destination && destination.droppableId === 'rows') {
        moveRow(
          table,
          tableStart,
          multiReorderIndexes,
          source.index,
          destination.index,
        )(tr);
        selectRows(mapIndexes(source, destination, multiReorderIndexes))(tr);
      } else {
        selectRows(
          multiReorderIndexes.length ? multiReorderIndexes : [source.index],
        )(tr);
      }
    } else if (source.droppableId === 'columns') {
      if (destination && destination.droppableId === 'columns') {
        moveColumn(
          table,
          tableStart,
          multiReorderIndexes,
          source.index,
          destination.index,
        )(tr);
        selectColumns(mapIndexes(source, destination, multiReorderIndexes))(tr);
      } else {
        selectColumns(
          multiReorderIndexes.length ? multiReorderIndexes : [source.index],
        )(tr);
      }
    }
  }

  endReordering(tr)(state, dispatch);
  cleanupAfterReordering(tableRef);

  return true;
};
