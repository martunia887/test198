import * as React from 'react';

const getSelectOptions = node => node.content[0].content;
const getText = node => node.content[0].text;
const getCellType = node => node.attrs.cellType;

const getSummary = cells => {
  const cellType = getCellType(cells[0]);
  if (
    cellType === 'single-select' ||
    cellType === 'radio-select' ||
    cellType === 'multi-select'
  ) {
    const options = getSelectOptions(cells[0])
      .map(getText)
      .reduce((acc, k) => {
        acc[k] = 0;
        return acc;
      }, {});

    const increment = k => {
      if (typeof options[k] !== 'undefined') {
        options[k]++;
      }
    };

    cells.forEach(cell => {
      if (cell.content[0].attrs) {
        const value = cell.content[0].attrs.value;
        if (cellType === 'multi-select') {
          const values = value.split(',').map(s => s.trim());
          values.forEach(increment);
        } else {
          increment(value);
        }
      }
    });

    return Object.keys(options)
      .map(x => `${x} : ${options[x]}`)
      .map((s, idx) => (
        <span key={idx}>
          {s}
          <br />
        </span>
      ));
  } else if (cellType === 'checkbox') {
    let count = 0;

    cells.forEach(cell => {
      if (cell.content[0].content) {
        if (getText(cell.content[0])) {
          count++;
        }
      }
    });
    return `✅ ${count}`;
  }
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
          cellType === 'multi-select' ||
          cellType === 'checkbox'
        ) {
          cols[cellIdx].push(cell);
        }
      });
    }
  });

  return (
    <tfoot>
      <tr>
        {cols.map((cells, idx) => (
          <td key={idx}>{cells.length ? getSummary(cells) : ''}</td>
        ))}
      </tr>
    </tfoot>
  );
};
