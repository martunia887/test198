import * as React from 'react';

const getSelectOptions = node => node.content[0].content;
const getText = node => node.content[0].text;
const getCellType = node => node.attrs.cellType;

const getSummary = cell => {
  const options = getSelectOptions(cell[0])
    .map(getText)
    .map(k => ({ [k]: 0 }));
  return '';
};

export default ({ content }) => {
  const cols = [] as Array<any>;

  // Transpose
  content.forEach((row, rowIdx) => {
    // Skip first row
    if (rowIdx) {
      row.content.forEach((cell, cellIdx) => {
        cols[cellIdx] = cols[cellIdx] || [];
        const cellType = getCellType(cell);
        if (
          cellType === 'single-select' ||
          cellType === 'radio-select' ||
          cellType === 'multi-select'
        ) {
          cols[cellIdx].push(cell);
        }
      });
    }
  });

  return (
    <tfoot>
      <tr>
        {cols.map((cell, idx) => (
          <td key={idx}>{cell.length ? getSummary(cell) : ''}</td>
        ))}
      </tr>
    </tfoot>
  );
};
