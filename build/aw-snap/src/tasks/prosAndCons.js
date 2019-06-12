const {
  pipe,
  clickOnTableCell,
  simulateRFCProsCons,
} = require('./helpers/tasks');

const loremIpsum = require('lorem-ipsum');

const prosAndConsTask = (row, colStart, colEnd, table = 1) => async page => {
  const createColTask = col =>
    pipe(
      clickOnTableCell(row, col, table),
      simulateRFCProsCons({
        prosItems: [
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
        ],
        consItems: [
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          loremIpsum({
            count: 1,
            units: 'sentences',
          }),
        ],
      }),
    );

  for (let i = colStart; i <= colEnd; i++) {
    await createColTask(i)(page);
  }

  return page;
};

module.exports = prosAndConsTask;
