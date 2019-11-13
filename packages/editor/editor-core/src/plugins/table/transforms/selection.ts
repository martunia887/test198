import { Transaction } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import {
  getCellsInColumn,
  getCellsInRow,
  ContentNodeWithPos,
} from 'prosemirror-utils';

export const selectColumns = (columnIndexes: number[]) => (tr: Transaction) => {
  const cells: ContentNodeWithPos[] = columnIndexes.reduce(
    (acc: ContentNodeWithPos[], index) => {
      const cells = getCellsInColumn(index)(tr.selection);
      return cells ? acc.concat(cells) : acc;
    },
    [],
  );
  if (!cells || !cells.length) {
    return tr;
  }
  const $anchor = tr.doc.resolve(cells[0].pos);
  const $head = tr.doc.resolve(cells[cells.length - 1].pos);
  return tr.setSelection(new CellSelection($anchor, $head) as any);
};

export const selectRows = (rowIndexes: number[]) => (tr: Transaction) => {
  const cells: ContentNodeWithPos[] = rowIndexes.reduce(
    (acc: ContentNodeWithPos[], index) => {
      const cells = getCellsInRow(index)(tr.selection);
      return cells ? acc.concat(cells) : acc;
    },
    [],
  );
  if (!cells || !cells.length) {
    return tr;
  }
  const $anchor = tr.doc.resolve(cells[0].pos);
  const $head = tr.doc.resolve(cells[cells.length - 1].pos);
  return tr.setSelection(new CellSelection($anchor, $head) as any);
};
