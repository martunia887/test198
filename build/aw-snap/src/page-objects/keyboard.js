const { HUMAN_TYPING_SPEED_MS } = require('./editor');

async function typeText(page, text) {
  await page.keyboard.type(text, { delay: HUMAN_TYPING_SPEED_MS });
}

async function pressKey(page, key, options = { delay: 5 }) {
  const keys = Array.isArray(key) ? key : [key];

  for (let key of keys) {
    await page.keyboard.press(key, options);
  }
}

async function pressKeyDown(page, key) {
  await page.keyboard.down(key);
}

async function pressKeyUp(page, key) {
  await page.keyboard.up(key);
}

module.exports = {
  typeText,
  pressKey,
  pressKeyDown,
  pressKeyUp,
};
