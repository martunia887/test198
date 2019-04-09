import { Node as PMNode } from 'prosemirror-model';
import { getCellsInRow, getCellsInColumn } from 'prosemirror-utils';
import { Transaction } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';

export const getCellValue = (cell: PMNode) => {
  const node = cell.firstChild!.firstChild;
  if (node) {
    switch (node.type.name) {
      case 'slider':
        return node.attrs.value;
      case 'status':
        return node.attrs.text;
      default:
        return cell.textContent;
    }
  }

  return cell.textContent;
};

export const applyFormatting = (tr: Transaction) => {
  const { selection } = tr;
  const { schema } = tr.doc.type;

  tr.doc.descendants((node, pos) => {
    if (node.type === schema.nodes.table) {
      const columns = getCellsInRow(0)(selection);
      if (!columns) {
        return;
      }
      columns.forEach((headerCell, columnIndex) => {
        const { formatting } = headerCell.node.attrs;
        if (!formatting) {
          return;
        }
        // checking each cell in a column that has formatting rules
        const cells = getCellsInColumn(columnIndex)(selection);
        if (cells) {
          const cellsToApplyFormatting: { [key: string]: boolean } = {};
          const cellsToClearFormatting: { [key: string]: boolean } = {};
          cells.forEach((cell, index) => {
            if (index === 0) {
              return;
            }
            const cellValue = getCellValue(cell.node);

            // looping through applied rules to check if the value of each cell in that column
            // matches to applied rule
            formatting.rules.forEach((rule: any) => {
              if (rule.condition === 'is_empty' && !cellValue) {
                cellsToApplyFormatting[cell.pos] = true;
              } else if (rule.condition === 'is_not_empty' && !!cellValue) {
                cellsToApplyFormatting[cell.pos] = true;
              } else if (rule.condition === 'is' && cellValue === rule.value) {
                cellsToApplyFormatting[cell.pos] = true;
              } else if (
                rule.condition === 'is_not' &&
                cellValue !== rule.value
              ) {
                cellsToApplyFormatting[cell.pos] = true;
              } else if (
                rule.condition === 'contains' &&
                cellValue.indexOf(rule.value) > -1
              ) {
                cellsToApplyFormatting[cell.pos] = true;
              } else if (
                rule.condition === 'does_not_contain' &&
                cellValue.indexOf(rule.value) === -1
              ) {
                cellsToApplyFormatting[cell.pos] = true;
              }
            });

            // if a cell was previosly formatted, but it doesn't match to any of the rules anymore
            // e.g. value has been updated, - we remove the formatting
            if (
              !cellsToApplyFormatting[cell.pos] &&
              cell.node.attrs.isFormatted
            ) {
              cellsToClearFormatting[cell.pos] = true;
            }
          });

          Object.keys(cellsToApplyFormatting).forEach(cellPos => {
            const pos = tr.mapping.map(Number(cellPos));
            const cell = tr.doc.nodeAt(pos);
            if (!cell) {
              return;
            }

            // updating background
            let newAttrs = { ...cell.attrs };
            let attrsUpdated = false;
            if (formatting.background !== cell.attrs.background) {
              newAttrs = {
                ...newAttrs,
                background: formatting.background,
                isFormatted: true,
              };
              attrsUpdated = true;
            }

            if (formatting.marks.length && !cell.attrs.isFormatted) {
              newAttrs = {
                ...newAttrs,
                isFormatted: true,
              };
              attrsUpdated = true;
            }

            if (attrsUpdated) {
              tr.setNodeMarkup(pos, cell.type, newAttrs, cell.marks);
            }

            formatting.marks.forEach((markName: string) => {
              const mark = schema.marks[markName].create();
              if (!tr.doc.rangeHasMark(pos, pos + cell.nodeSize, mark)) {
                tr.addMark(pos, pos + cell.nodeSize, mark);
              }
            });
          });

          // clearing formatting for cells that don't match any rule
          Object.keys(cellsToClearFormatting).forEach(cellPos => {
            const pos = tr.mapping.map(Number(cellPos));
            const cell = tr.doc.nodeAt(pos);
            if (cell) {
              tr.setNodeMarkup(pos, cell.type, {
                ...cell.attrs,
                isFormatted: false,
                background: undefined,
              }).removeMark(pos, pos + cell.nodeSize);
            }
          });
        }
      });
    }
  });

  return tr;
};

const getReferenceValue = (reference: string, tr: Transaction) => {
  let value = null;
  tr.doc.descendants((node: PMNode) => {
    if (node.type.name === 'slider') {
      console.log({ attrs: node.attrs, reference });
    }
    if (node.attrs && node.attrs.title === reference) {
      value = node.attrs.value;
    }
  });
  return value;
};

export const applyFilter = (tr: Transaction) => {
  const { schema } = tr.doc.type;

  tr.doc.descendants((table, tablePos) => {
    if (table.type === schema.nodes.table) {
      const map = TableMap.get(table);
      const rowIndexesToFilter: { [key: string]: boolean } = {};
      const columns: PMNode[] = (table.child(0).content as any).content;
      if (!columns) {
        return;
      }
      columns.forEach((headerCell, columnIndex) => {
        const { filter } = headerCell.attrs;
        if (!filter) {
          return;
        }
        // checking each cell in a column that has filter rules
        const cells = map.cellsInRect({
          top: 1,
          bottom: map.height,
          left: columnIndex,
          right: columnIndex + 1,
        });
        if (cells) {
          cells.forEach((cellPos, index) => {
            const cell = tr.doc.nodeAt(cellPos + tablePos + 1);
            if (!cell) {
              return;
            }
            const cellValue = getCellValue(cell);
            const rowIndex = index + 1;

            // looping through applied rules to check if the value of each cell in that column
            // matches to applied rule
            console.log({ rules: filter.rules });
            filter.rules.forEach((rule: any) => {
              const compareValue = rule.useAsReference
                ? getReferenceValue(rule.value, tr)
                : rule.value;
              console.log({ compareValue, cellValue });
              if (rule.condition === 'is_empty' && !cellValue) {
                rowIndexesToFilter[rowIndex] = true;
              } else if (rule.condition === 'is_not_empty' && !!cellValue) {
                rowIndexesToFilter[rowIndex] = true;
              } else if (
                rule.condition === 'is' &&
                cellValue === compareValue
              ) {
                rowIndexesToFilter[rowIndex] = true;
              } else if (
                rule.condition === 'is_not' &&
                cellValue !== compareValue
              ) {
                rowIndexesToFilter[rowIndex] = true;
              } else if (
                rule.condition === 'contains' &&
                cellValue.indexOf(compareValue) > -1
              ) {
                rowIndexesToFilter[rowIndex] = true;
              } else if (
                rule.condition === 'does_not_contain' &&
                cellValue.indexOf(compareValue) === -1
              ) {
                rowIndexesToFilter[rowIndex] = true;
              }
            });
          });
        }
      });

      const indexesToFilter = Object.keys(rowIndexesToFilter).map(Number);
      let rowPos = tablePos + 1;
      for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
        const row = table.child(rowIndex);
        if (indexesToFilter.indexOf(rowIndex) > -1) {
          if (!row.attrs.isFiltered) {
            tr.setNodeMarkup(
              rowPos,
              row.type,
              {
                ...row.attrs,
                isFiltered: true,
              },
              row.marks,
            );
          }
        } else if (row.attrs.isFiltered) {
          tr.setNodeMarkup(
            rowPos,
            row.type,
            {
              ...row.attrs,
              isFiltered: false,
            },
            row.marks,
          );
        }
        rowPos += row.nodeSize;
      }
    }
  });

  return tr;
};
