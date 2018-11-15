import { EditorState, Selection } from 'prosemirror-state';
import {
  findTable,
  findChildrenByType,
  getCellsInColumn,
  addColumnAt,
} from 'prosemirror-utils';
import { Node as PMNode } from 'prosemirror-model';
import { TableMap } from 'prosemirror-tables';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const onDragEnd = (startIndex, endIndex) => (state, dispatch) => {
  const table = findTable(state.selection);
  if (!table) {
    return false;
  }
  const rows: PMNode[] = [];
  for (let i = 0; i < table.node.childCount; i++) {
    const row = table.node.child(i);
    const cells: PMNode[] = [];
    for (let j = 0; j < row.childCount; j++) {
      cells.push(row.child(j));
    }
    const newRow = state.schema.nodes.tableRow.createChecked(
      row.attrs,
      reorder(cells, startIndex, endIndex),
    );
    rows.push(newRow);
  }
  const newTable = state.schema.nodes.table.createChecked(
    table.node.attrs,
    rows,
  );

  const tr = state.tr.replaceWith(
    table.pos,
    table.pos + table.node.nodeSize,
    newTable,
  );
  const $pos = tr.doc.resolve(tr.mapping.map(table.pos));
  const textSelection = Selection.findFrom($pos, 1, true);
  if (textSelection) {
    tr.setSelection(textSelection);
  }
  dispatch(tr);
  return true;
};

export const getSelectOptions = (columnIndex: number, state: EditorState) => {
  const options: { label: string; value: string }[] = [];

  const cells = getCellsInColumn(columnIndex)(state.selection);
  if (cells && cells[1]) {
    const selectOptions = findChildrenByType(
      cells[1].node,
      state.schema.nodes.selectOption,
    );
    if (selectOptions.length) {
      selectOptions.forEach((option, optionIndex) => {
        options.push({
          label: option.node.textContent,
          value: `${optionIndex}`,
        });
      });
    }
  }

  return options;
};

export const appendColumn = (state, dispatch) => {
  const table = findTable(state.selection);
  if (!table) {
    return false;
  }
  const map = TableMap.get(table.node);
  dispatch(addColumnAt(map.width)(state.tr));
  return true;
};

export const updateCurrentUser = (columnIndex: number) => (state, dispatch) => {
  const cells = getCellsInColumn(columnIndex)(state.selection);
  if (!cells) {
    return false;
  }
  const { tr } = state;

  cells.forEach(cell => {
    const newCell = cell.node.type.create(
      { ...cell.node.attrs, currentUser: !cell.node.attrs.currentUser },
      cell.node.content,
    );

    tr.replaceWith(
      tr.mapping.map(cell.pos),
      tr.mapping.map(cell.pos + cell.node.nodeSize),
      newCell,
    );
  });

  dispatch(tr);
  return true;
};
