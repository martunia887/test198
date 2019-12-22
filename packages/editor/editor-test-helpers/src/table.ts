import { Node as PMNode } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { getCellsInColumn, getCellsInRow } from 'prosemirror-utils';

type Cell = { pos: number; start: number; node: PMNode };

export const selectCell = (column: number, row: number) => (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
) => {
  const { tr } = state;
  const { pos } = getCellsInColumn(column)(tr.selection)![row];

  const $anchor = tr.doc.resolve(pos);
  const $head = tr.doc.resolve(pos);
  dispatch(tr.setSelection(new CellSelection($anchor, $head) as any));
  return true;
};

export const selectColumns = (columnIndexes: number[]) => (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
) => {
  const { tr } = state;
  const cells: Cell[] = columnIndexes.reduce((acc: Cell[], index) => {
    const cells = getCellsInColumn(index)(tr.selection);
    return cells ? acc.concat(cells) : acc;
  }, []);

  const $anchor = tr.doc.resolve(cells[0].pos);
  const $head = tr.doc.resolve(cells[cells.length - 1].pos);
  dispatch(tr.setSelection(new CellSelection($anchor, $head) as any));
  return true;
};

export const selectRows = (rowIndexes: number[]) => (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
) => {
  const { tr } = state;
  const cells: Cell[] = rowIndexes.reduce((acc: Cell[], index) => {
    const cells = getCellsInRow(index)(tr.selection);
    return cells ? acc.concat(cells) : acc;
  }, []);

  const $anchor = tr.doc.resolve(cells[0].pos);
  const $head = tr.doc.resolve(cells[cells.length - 1].pos);
  dispatch(tr.setSelection(new CellSelection($anchor, $head) as any));
  return true;
};
