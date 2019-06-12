const {
  pipe,
  clickOnTableCell,
  typeTextWithEmojis,
  addTaskWithMention,
} = require('./helpers/tasks');

const loremIpsum = require('lorem-ipsum');

const descriptionTask = (row, colStart, colEnd, table = 1) => async page => {
  const createDescriptionWithTask = col =>
    pipe(
      clickOnTableCell(row, col, table),
      typeTextWithEmojis(
        loremIpsum({
          count: 2,
          units: 'paragraphs',
        }),
      ),
      addTaskWithMention([
        {
          task: loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          mention: 'jesus',
        },
        {
          task: loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          mention: 'jesus',
        },
        {
          task: loremIpsum({
            count: 1,
            units: 'sentences',
          }),
          mention: 'jesus',
        },
      ]),
    );

  for (let i = colStart; i <= colEnd; i++) {
    await createDescriptionWithTask(i)(page);
  }

  return page;
};

module.exports = descriptionTask;
