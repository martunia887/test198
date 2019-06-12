const { typeText, pressKey } = require('./keyboard');

const selectors = {
  typeAhead: '.fabric-editor-typeahead',
};

async function addWithQuickInsert(page, insert) {
  await typeText(page, `/${insert}`);

  await page.waitForSelector(selectors.typeAhead);

  await pressKey(page, 'Enter');
}

module.exports = {
  addWithQuickInsert,
};
