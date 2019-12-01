import { Transaction, EditorState } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { Node as PMNode } from 'prosemirror-model';
import {
  akEditorTableToolbarSize as controlsSize,
  akEditorTableNumberColumnWidth,
} from '@atlaskit/editor-common';
import { TableCssClassName as ClassName, ReorderingType } from '../types';
import { closestElement } from '../../../utils';
import { forEachNode, forEachCell } from './dom';
import { getPluginState } from '../pm-plugins/main';

export const moveRow = (
  node: PMNode,
  tableStart: number,
  multiReorderIndexes: number[],
  sourceIndex: number,
  destinationIndex: number,
) => (tr: Transaction) => {
  const sourceIndexes =
    multiReorderIndexes.length &&
    multiReorderIndexes.indexOf(destinationIndex) === -1
      ? multiReorderIndexes
      : [sourceIndex];
  const sourcePositions: number[] = [];
  let destinationPos: number | undefined;

  node.content.forEach((_, offset, index) => {
    if (sourceIndexes.indexOf(index) > -1) {
      sourcePositions.push(offset + tableStart);
    } else if (index === destinationIndex) {
      destinationPos = offset + tableStart;
    }
  });
  if (!destinationPos) {
    return;
  }
  const destinationRow = tr.doc.nodeAt(destinationPos);
  const sourceRows: PMNode[] = [];

  sourcePositions.forEach(sourcePos => {
    const sourceRow = tr.doc.nodeAt(tr.mapping.map(sourcePos));
    if (sourceRow) {
      tr.delete(
        tr.mapping.map(sourcePos),
        tr.mapping.map(sourcePos + sourceRow.nodeSize),
      );
      sourceRows.push(sourceRow.copy(sourceRow.content));
    }
  });

  if (destinationRow) {
    tr.insert(
      tr.mapping.map(
        destinationPos +
          (sourceIndex < destinationIndex ? destinationRow.nodeSize : 0),
      ),
      sourceRows,
    );
  }

  return tr;
};

export const moveColumn = (
  node: PMNode,
  tableStart: number,
  multiReorderIndexes: number[],
  sourceIndex: number,
  destinationIndex: number,
) => (tr: Transaction) => {
  const map = TableMap.get(node);
  const sourceIndexes =
    multiReorderIndexes.length &&
    multiReorderIndexes.indexOf(destinationIndex) === -1
      ? multiReorderIndexes
      : [sourceIndex];

  for (let rowIndex = map.height - 1; rowIndex >= 0; rowIndex--) {
    const sourceCells: PMNode[] = [];
    const destinationPos =
      map.positionAt(rowIndex, destinationIndex, node) + tableStart;
    const destinationCell = tr.doc.nodeAt(destinationPos);

    const sourceCellsPositions = sourceIndexes.map(
      sourceIndex => map.positionAt(rowIndex, sourceIndex, node) + tableStart,
    );
    sourceCellsPositions.forEach(sourcePos => {
      const sourceCell = tr.doc.nodeAt(tr.mapping.map(sourcePos));
      if (sourceCell) {
        tr.delete(
          tr.mapping.map(sourcePos),
          tr.mapping.map(sourcePos + sourceCell.nodeSize),
        );
        sourceCells.push(sourceCell.copy(sourceCell.content));
      }
    });
    if (destinationCell) {
      tr.insert(
        tr.mapping.map(
          destinationPos +
            (sourceIndex < destinationIndex ? destinationCell.nodeSize : 0),
        ),
        sourceCells,
      );
    }
  }

  return tr;
};

export const addTableStylesBeforeReordering = (
  tableRef?: HTMLTableElement | null,
  tableHeight?: number,
  cellsWidths?: number[],
  rowHeights?: number[],
) => {
  if (!tableRef || !tableRef.lastChild || !rowHeights || !cellsWidths) {
    return;
  }
  tableRef.style.height = `${Number(tableHeight) + 1}px`;
  forEachCell(tableRef, (cell, rowIndex, _, cellIndex) => {
    cell.style.width = `${cellsWidths[cellIndex]}px`;
    cell.style.height = `${rowHeights[rowIndex] - 1}px`;
  });
};

export const onBeforeCapture = (
  type: ReorderingType,
  tableRef?: HTMLTableElement | null,
) => {
  if (!tableRef) {
    return;
  }
  const tbody = tableRef.querySelector('tbody');
  if (!tbody) {
    return;
  }
  const parent = closestElement(tableRef, `.${ClassName.TABLE_CONTAINER}`);
  if (!parent) {
    return;
  }
  const tableWidth = tbody.offsetWidth;
  const tableHeight = tbody.offsetHeight;

  if (type === 'rows') {
    const rowControls = parent.querySelectorAll(
      `.${ClassName.ROW_CONTROLS_INNER}`,
    );
    forEachNode(rowControls, control => {
      control.style.width = `${tableWidth}px`;
      control.style.height = `${tableHeight}px`;

      const buttons = control.querySelectorAll(
        `.${ClassName.ROW_CONTROLS_BUTTON}`,
      );
      forEachNode(buttons, button => {
        button.style.width = `${tableWidth}px`;
      });
    });
  } else {
    const columnControls = parent.querySelectorAll(
      `.${ClassName.COLUMN_CONTROLS_INNER}`,
    );

    forEachNode(columnControls, control => {
      control.style.width = `${tableWidth}px`;
      control.style.height = `${tableHeight}px`;

      const buttons = control.querySelectorAll(
        `.${ClassName.COLUMN_CONTROLS_BUTTON}`,
      );
      forEachNode(buttons, button => {
        button.style.height = `${tableHeight}px`;
      });
    });
  }
};

export const restoreControlsDimensions = (
  type: ReorderingType,
  tableRef?: HTMLTableElement | null,
) => {
  if (!tableRef) {
    return;
  }
  const parent = closestElement(tableRef, `.${ClassName.TABLE_CONTAINER}`);
  if (!parent) {
    return;
  }
  if (type === 'rows') {
    const buttons = parent.querySelectorAll(
      `.${ClassName.ROW_CONTROLS_BUTTON}`,
    );
    forEachNode(buttons, button => {
      const height = button.style.height;
      button.removeAttribute('style');
      button.style.height = height;
    });
  } else {
    const buttons = document.querySelectorAll(
      `.${ClassName.COLUMN_CONTROLS_BUTTON}`,
    );
    forEachNode(buttons, button => {
      const width = button.style.width;
      button.removeAttribute('style');
      button.style.width = width;
    });
  }
};

export const cleanupAfterReordering = (tableRef?: HTMLTableElement | null) => {
  if (!tableRef) {
    return;
  }
  const parent = closestElement(tableRef, `.${ClassName.TABLE_CONTAINER}`);
  if (!parent) {
    return;
  }
  disableGlobalDraggingStyles();
  tableRef.removeAttribute('style');

  const rows = tableRef.querySelectorAll('tr');
  forEachNode(rows, row => {
    row.removeAttribute('style');
    row.removeAttribute(ClassName.RBD_DRAGGABLE);
    row.classList.remove(ClassName.MULTI_REORDERING);

    const cells = row.querySelectorAll('th, td');
    forEachNode(cells, cell => {
      const { backgroundColor } = cell.style;
      cell.removeAttribute('style');
      cell.style.backgroundColor = backgroundColor;
      cell.removeAttribute(ClassName.RBD_DRAGGABLE);
      cell.classList.remove(ClassName.MULTI_REORDERING);
    });
  });

  const rowControls = parent.querySelector(`.${ClassName.ROW_CONTROLS_INNER}`);
  if (rowControls) {
    rowControls.removeAttribute('style');
  }
  const columnControls = parent.querySelector(
    `.${ClassName.COLUMN_CONTROLS_INNER}`,
  );
  if (columnControls) {
    columnControls.removeAttribute('style');
  }
};

export const onReorderingRows = (
  rowIndex: number,
  style: { [key: string]: string },
  contextId: string,
  state: EditorState,
) => {
  const {
    columnWidths,
    rowHeights,
    reorderIndex,
    multiReorderIndexes,
    tableWidth,
    tableRef,
    tableNode,
    reordering,
    mergedIndexes,
  } = getPluginState(state);
  if (
    !tableRef ||
    !tableNode ||
    !tableRef.lastChild ||
    !tableRef.lastChild.childNodes[rowIndex] ||
    !rowHeights ||
    !columnWidths ||
    !tableWidth ||
    !mergedIndexes ||
    !multiReorderIndexes ||
    reordering !== 'rows' ||
    typeof reorderIndex === 'undefined'
  ) {
    return;
  }
  const parent = closestElement(tableRef, `.${ClassName.TABLE_CONTAINER}`);
  if (!parent) {
    return;
  }
  const control = parent.querySelector(`.${ClassName.ROW_CONTROLS_INNER}`);
  if (control) {
    const dropppableContext = control.getAttribute('data-context-id');
    if (dropppableContext !== contextId) {
      return;
    }
  }
  const row = tableRef.lastChild.childNodes[rowIndex] as HTMLElement;
  row.style.display = 'flex';
  row.style.width = `${tableWidth + 1}px`;
  row.setAttribute(ClassName.RBD_DRAGGABLE_CONTEXT_ID, `${contextId}`);

  for (let i = 0, columnsCount = row.childNodes.length; i < columnsCount; i++) {
    const cell = row.childNodes[i] as HTMLElement;
    cell.style.width = `${columnWidths[i]}px`;
    cell.style.height = `${rowHeights[rowIndex] - 1}px`;
  }

  if (reorderIndex === rowIndex || mergedIndexes.indexOf(rowIndex) > -1) {
    row.style.display = 'none';
    return;
  } else if (multiReorderIndexes.indexOf(rowIndex) > -1) {
    row.classList.add(ClassName.MULTI_REORDERING);
  }

  Object.keys(style).forEach(prop => {
    switch (prop) {
      case 'top':
        row.style[prop] = `${Number(style[prop])}px`;
        break;
      case 'left':
        row.style[prop] = `${Number(style[prop]) +
          controlsSize +
          (tableNode.attrs.isNumberColumnEnabled
            ? akEditorTableNumberColumnWidth - 1
            : 0)}px`;
        break;
      default:
        row.style[prop as any] = style[prop];
    }
  });
};

export const onReorderingColumns = (
  columnIndex: number,
  style: { [key: string]: string },
  contextId: string,
  state: EditorState,
) => {
  const {
    columnWidths,
    rowHeights,
    reorderIndex,
    multiReorderIndexes,
    tableWidth,
    tableRef,
    reordering,
    mergedIndexes,
  } = getPluginState(state);

  if (
    !tableRef ||
    !tableRef.lastChild ||
    !rowHeights ||
    !columnWidths ||
    !tableWidth ||
    !multiReorderIndexes ||
    !mergedIndexes ||
    reordering !== 'columns' ||
    typeof reorderIndex === 'undefined'
  ) {
    return;
  }
  const parent = closestElement(tableRef, `.${ClassName.TABLE_CONTAINER}`);
  if (!parent) {
    return;
  }
  const control = parent.querySelector(`.${ClassName.COLUMN_CONTROLS_INNER}`);
  if (control) {
    const dropppableContext = control.getAttribute('data-context-id');
    if (dropppableContext !== contextId) {
      return;
    }
  }

  for (
    let i = 0, rowsCount = tableRef.lastChild.childNodes.length;
    i < rowsCount;
    i++
  ) {
    const row = tableRef.lastChild.childNodes[i] as HTMLElement;
    row.style.display = 'flex';
    row.style.width = `${tableWidth}px`;

    const offsetTop = rowHeights.slice(0, i).reduce((acc, cur) => acc + cur, 0);
    const cell = row.childNodes[columnIndex] as HTMLElement;
    if (!cell) {
      return;
    }
    cell.setAttribute(ClassName.RBD_DRAGGABLE_CONTEXT_ID, `${contextId}`);

    if (reorderIndex === columnIndex) {
      cell.style.display = 'none';
      continue;
    } else if (multiReorderIndexes.indexOf(columnIndex) > -1) {
      cell.classList.add(ClassName.MULTI_REORDERING);
    }

    Object.keys(style).forEach(prop => {
      switch (prop) {
        case 'top':
          cell.style[prop] = `${Number(style[prop]) +
            controlsSize +
            offsetTop -
            i}px`;
          break;
        case 'left':
          cell.style[prop] = `${Number(style[prop])}px`;
          break;
        default:
          cell.style[prop as any] = style[prop];
      }
    });
  }
};

const scrollParentClass: string = `.fabric-editor-popup-scroll-parent`;
const isDraggingStyles = {
  userSelect: 'none',
  scrollBehavior: 'auto',
};

export const enableGlobalDraggingStyles = () => {
  const el: HTMLElement | null = document.querySelector(scrollParentClass);
  if (!el) {
    return;
  }
  Object.assign(el.style, isDraggingStyles);
};

export const disableGlobalDraggingStyles = () => {
  const el: HTMLElement | null = document.querySelector(scrollParentClass);
  if (!el) {
    return;
  }
  el.removeAttribute('style');
};
