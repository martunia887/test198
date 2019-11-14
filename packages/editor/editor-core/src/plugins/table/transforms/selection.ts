import { Transaction } from 'prosemirror-state';
import { CellSelection, TableMap } from 'prosemirror-tables';
import { findTable } from 'prosemirror-utils';

export const selectColumns = (columnIndexes: number[]) => (tr: Transaction) => {
  const table = findTable(tr.selection);
  if (!table) {
    return tr;
  }
  const map = TableMap.get(table.node);

  const cells: number[] = columnIndexes.reduce((acc: number[], index) => {
    const positions = map.cellsInRect({
      left: index,
      right: index + 1,
      top: 0,
      bottom: map.height,
    });
    return acc.concat(positions);
  }, []);
  if (!cells || !cells.length) {
    return tr;
  }

  const $anchor = tr.doc.resolve(cells[0] + table.start);
  const $head = tr.doc.resolve(cells[cells.length - 1] + table.start);
  return tr.setSelection(new CellSelection($anchor, $head) as any);
};

export const selectRows = (rowIndexes: number[]) => (tr: Transaction) => {
  const table = findTable(tr.selection);
  if (!table) {
    return tr;
  }
  const map = TableMap.get(table.node);

  const cells: number[] = rowIndexes.reduce((acc: number[], index) => {
    const positions = map.cellsInRect({
      left: 0,
      right: map.width,
      top: index,
      bottom: index + 1,
    });
    return acc.concat(positions);
  }, []);
  if (!cells || !cells.length) {
    return tr;
  }
  const $anchor = tr.doc.resolve(cells[0] + table.start);
  const $head = tr.doc.resolve(cells[cells.length - 1] + table.start);
  return tr.setSelection(new CellSelection($anchor, $head) as any);
};
