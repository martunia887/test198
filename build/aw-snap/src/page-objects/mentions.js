const { typeText, pressKey } = require('./keyboard');

const selectors = {
  typeAhead: '.fabric-editor-typeahead',
};

async function addMention(page, mention) {
  await typeText(page, `@${mention}`);

  await page.waitForSelector(selectors.typeAhead, { visible: true });

  await pressKey(page, 'Enter');
}

module.exports = {
  addMention,
};
