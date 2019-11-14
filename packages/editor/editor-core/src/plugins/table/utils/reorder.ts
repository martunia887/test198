import { Transaction } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { Node as PMNode } from 'prosemirror-model';
import {
  akEditorTableToolbarSize as controlsSize,
  akEditorTableNumberColumnWidth,
} from '@atlaskit/editor-common';
import { TableCssClassName as ClassName } from '../types';

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

export const addStylesToCellsBeforeReordering = (
  tableRef?: HTMLTableElement | null,
  columnWidths?: number[],
  rowHeights?: number[],
) => {
  if (!tableRef || !tableRef.lastChild || !rowHeights || !columnWidths) {
    return;
  }

  for (
    let i = 0, rowsCount = tableRef.lastChild.childNodes.length;
    i < rowsCount;
    i++
  ) {
    const row = tableRef.lastChild.childNodes[i];

    for (let j = 0, colsCount = row.childNodes.length; j < colsCount; j++) {
      const cell = row.childNodes[j] as HTMLElement;
      cell.style.width = `${columnWidths[j]}px`;
      cell.style.height = `${rowHeights[i] - 1}px`;
    }
  }
};

export const onBeforeCapture = (tableRef?: HTMLTableElement | null) => {
  if (!tableRef) {
    return;
  }
  const tbody = tableRef.querySelector('tbody');
  if (!tbody) {
    return;
  }
  const tableWidth = tbody.offsetWidth;
  const tableHeight = tbody.offsetHeight;

  const rowControls = document.querySelectorAll(
    `.${ClassName.ROW_CONTROLS_INNER}`,
  );
  const columnControls = document.querySelectorAll(
    `.${ClassName.COLUMN_CONTROLS_INNER}`,
  );
  Array.prototype.slice.call(rowControls).forEach(control => {
    control.style.width = `${tableWidth}px`;
    control.style.height = `${tableHeight}px`;
  });
  Array.prototype.slice.call(columnControls).forEach(control => {
    control.style.width = `${tableWidth}px`;
    control.style.height = `${tableHeight}px`;
  });
};

export const addRowPlaceholder = (
  draggableId: string,
  rowIndex: number,
  tableRef?: HTMLTableElement | null,
  tableWidth?: number,
  rowHeights?: number[],
) => {
  if (!tableRef || !tableRef.lastChild || !tableWidth || !rowHeights) {
    return;
  }
  const node = document.createElement('tr');
  node.setAttribute(ClassName.RBD_PLACEHOLDER, `${draggableId}`);
  node.style.width = `${tableWidth}px`;
  node.style.height = `${rowHeights[rowIndex]}px`;
  tableRef.lastChild.appendChild(node);
};

export const cleanupAfterReordering = () => {
  const rows = document.querySelectorAll(`.${ClassName.TABLE_CONTAINER} tr`);
  Array.prototype.slice.call(rows).forEach(row => {
    row.removeAttribute('style');
    row.removeAttribute(ClassName.RBD_DRAGGABLE);
    row.classList.remove(ClassName.MULTI_REORDERING);

    const cells = row.querySelectorAll('th, td');
    Array.prototype.slice.call(cells).forEach(cell => {
      cell.removeAttribute('style');
      cell.removeAttribute(ClassName.RBD_DRAGGABLE);
      cell.classList.remove(ClassName.MULTI_REORDERING);
    });
  });

  const rowControls = document.querySelectorAll(
    `.${ClassName.ROW_CONTROLS_INNER}`,
  );
  const columnControls = document.querySelectorAll(
    `.${ClassName.COLUMN_CONTROLS_INNER}`,
  );
  Array.prototype.slice.call(rowControls).forEach(control => {
    control.removeAttribute('style');
  });
  Array.prototype.slice.call(columnControls).forEach(control => {
    control.removeAttribute('style');
  });

  // editor blows up if we do it synchronously
  requestAnimationFrame(() => {
    const placeholder = document.querySelector(
      `.ProseMirror [${ClassName.RBD_PLACEHOLDER}]`,
    );
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }
  });
};

export const onReorderingRows = (
  rowIndex: number,
  style: { [key: string]: string },
  draggableId: string,
  isNumberColumnEnabled: boolean,
  tableRef?: HTMLTableElement | null,
  rowHeights?: number[],
  columnWidths?: number[],
  tableWidth?: number,
  reorderIndex?: number,
  multiReorderIndexes?: number[],
) => {
  if (
    !tableRef ||
    !tableRef.lastChild ||
    !tableRef.lastChild.childNodes[rowIndex] ||
    !rowHeights ||
    !columnWidths ||
    !tableWidth ||
    !multiReorderIndexes ||
    typeof reorderIndex === 'undefined'
  ) {
    return;
  }
  const row = tableRef.lastChild.childNodes[rowIndex] as HTMLElement;
  if (row.hasAttribute(ClassName.RBD_PLACEHOLDER)) {
    return;
  }
  row.style.display = 'flex';
  row.style.width = `${tableWidth + 1}px`;
  row.setAttribute(ClassName.RBD_DRAGGABLE, `${draggableId}`);

  for (let i = 0, columnsCount = row.childNodes.length; i < columnsCount; i++) {
    const cell = row.childNodes[i] as HTMLElement;
    cell.style.width = `${columnWidths[i]}px`;
    cell.style.height = `${rowHeights[rowIndex] - 1}px`;
  }

  if (reorderIndex === rowIndex) {
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
          (isNumberColumnEnabled ? akEditorTableNumberColumnWidth - 1 : 0)}px`;
        break;
      default:
        row.style[prop as any] = style[prop];
    }
  });
};

export const onReorderingColumns = (
  columnIndex: number,
  style: { [key: string]: string },
  draggableId: string,
  tableRef?: HTMLTableElement | null,
  rowHeights?: number[],
  columnWidths?: number[],
  tableWidth?: number,
  reorderIndex?: number,
  multiReorderIndexes?: number[],
) => {
  if (
    !tableRef ||
    !tableRef.lastChild ||
    !rowHeights ||
    !columnWidths ||
    !tableWidth ||
    !multiReorderIndexes ||
    typeof reorderIndex === 'undefined'
  ) {
    return;
  }

  for (
    let i = 0, rowsCount = tableRef.lastChild.childNodes.length;
    i < rowsCount;
    i++
  ) {
    const row = tableRef.lastChild.childNodes[i] as HTMLElement;
    if (row.hasAttribute(ClassName.RBD_PLACEHOLDER)) {
      continue;
    }
    row.style.display = 'flex';
    row.style.width = `${tableWidth}px`;

    const offsetTop = rowHeights.slice(0, i).reduce((acc, cur) => acc + cur, 0);
    const cell = row.childNodes[columnIndex] as HTMLElement;
    cell.style.width = `${columnWidths[columnIndex]}px`;
    cell.style.height = `${rowHeights[i] - 1}px`;
    cell.setAttribute(ClassName.RBD_DRAGGABLE, `${draggableId}`);

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
