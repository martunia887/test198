const { moveMouseToTableControl } = require('./helpers/tasks');

const twoMinutes = 2 * 60 * 1000;

const mouseMoverTask = (table, time = twoMinutes) => {
  const moveToCol = moveMouseToTableControl('column', 1, table);
  const moveToRow = moveMouseToTableControl('row', 1, table);
  const moveToCorner = moveMouseToTableControl('corner', 1, table);

  return async page => {
    const start = Date.now();
    // await clickOnTableCell(2, 2, table)(page)
    const speed = 1;
    while (Date.now() - twoMinutes < start) {
      await moveToCol(page);
      await page.waitFor(speed);
      await moveToCorner(page);
      await page.waitFor(speed);
      await moveToRow(page);
      await page.waitFor(speed);
    }

    return page;
  };
};

module.exports = mouseMoverTask;
