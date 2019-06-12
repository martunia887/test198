const { typeText, pressKey } = require('./keyboard');

const selectors = {
  typeAhead: '.fabric-editor-typeahead',
};

const validEmojis = ['smile', 'joy_cat', 'disappointe', 'cry', 'rolling_eyes'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function addEmoji(page, emoji) {
  await typeText(page, `:${emoji}`);

  await page.waitFor(500);

  await pressKey(page, 'Enter');
}

async function addRandomEmoji(page) {
  await addEmoji(page, validEmojis[getRandomInt(validEmojis.length)]);
}

module.exports = {
  addEmoji,
  addRandomEmoji,
};
