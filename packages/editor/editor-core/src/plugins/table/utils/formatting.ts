import { Transaction } from 'prosemirror-state';
import { getCellsInRow, getCellsInColumn } from 'prosemirror-utils';

export const applyFormatting = (tr: Transaction) => {
  const { selection } = tr;
  const { schema } = tr.doc.type;

  tr.doc.descendants((node, pos) => {
    if (node.type === schema.nodes.table) {
      const columns = getCellsInRow(0)(selection);
      if (columns) {
        columns.forEach((headerCell, columnIndex) => {
          const { formatting } = headerCell.node.attrs;
          if (formatting) {
            // checking each cell in a column that has formatting rules
            const cells = getCellsInColumn(columnIndex)(selection);
            if (cells) {
              const rowIndexes: number[] = [];
              cells.forEach((cell, rowIndex) => {
                // assume that cell value is textContent for now
                const cellValue = cell.node.textContent;

                formatting.rules.forEach(rule => {
                  if (rule.condition === 'is_empty' && !cellValue) {
                    rowIndexes.push(rowIndex);
                  } else if (rule.condition === 'is_not_empty' && !!cellValue) {
                    rowIndexes.push(rowIndex);
                  } else if (
                    rule.condition === 'is' &&
                    cellValue === rule.value
                  ) {
                    rowIndexes.push(rowIndex);
                  } else if (
                    rule.condition === 'is_not' &&
                    cellValue !== rule.value
                  ) {
                    rowIndexes.push(rowIndex);
                  } else if (
                    rule.condition === 'contains' &&
                    cellValue.indexOf(rule.value) > -1
                  ) {
                    rowIndexes.push(rowIndex);
                  } else if (
                    rule.condition === 'does_not_contain' &&
                    cellValue.indexOf(rule.value) === -1
                  ) {
                    rowIndexes.push(rowIndex);
                  }
                });

                rowIndexes.forEach(index => {
                  const rowCells = getCellsInRow(index)(selection);
                  if (rowCells) {
                    rowCells.forEach(cell => {
                      formatting.marks.forEach(markName => {
                        const mark = schema.marks[markName].create();
                        tr.addMark(
                          cell.pos,
                          cell.pos + cell.node.nodeSize,
                          mark,
                        );
                      });
                      if (formatting.background) {
                        tr.setNodeMarkup(cell.pos, cell.node.type, {
                          ...cell.node,
                          background: formatting.background,
                        });
                      }
                    });
                  }
                });
              });
            }
          }
        });
      }
    }
  });

  return tr;
};
