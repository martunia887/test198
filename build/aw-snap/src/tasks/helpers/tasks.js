const {
  getSelectorForTableCell,
  getSelectorForTableControl,
} = require('../../page-objects/table');
const { typeText, pressKey } = require('../../page-objects/keyboard');
const {
  scrollToElement,
  getBoundingRect,
} = require('../../page-objects/editor');
const { addMention } = require('../../page-objects/mentions');
const { addWithQuickInsert } = require('../../page-objects/quickinsert');
const { addEmoji, addRandomEmoji } = require('../../page-objects/emoji');

function getRandomPercentage() {
  return Math.random() * 100;
}

const composableAddMention = mention => async page => {
  await addMention(page, mention);

  return page;
};

const addTable = async page => {
  await addWithQuickInsert(page, 'table');
  return page;
};

const clickOnTableCell = (row, cell, table = 1) => async page => {
  const selector = getSelectorForTableCell({ row, cell, table });
  await page.waitForSelector(selector);

  await scrollToElement(page, selector);

  await page.waitFor(2000); // Wait for scroll to happen

  const bounds = await getBoundingRect(page, selector);
  await page.mouse.click(bounds.left, bounds.top + bounds.height - 5);
  await page.click(selector);

  return page;
};

const moveMouseToTableControl = (type, index, table = 1) => {
  let selector;
  if (type === 'corner') {
    selector = '.pm-table-corner-button';
  } else {
    selector = getSelectorForTableControl(type, index, table);
  }
  return async page => {
    await page.waitForSelector(selector);
    const bounds = await getBoundingRect(page, selector);

    await page.mouse.move(bounds.left, bounds.top + bounds.height - 5, {
      steps: 40,
    });
  };
};

const composableTypeText = text => async page => {
  await typeText(page, text);
  return page;
};

const typeTextWithEmojis = text => async page => {
  const splittedText = text.split(' ');

  for (let word of splittedText) {
    await typeText(page, `${word} `);
    if (getRandomPercentage() < 20) {
      // Add emoji 20% of the time
      await addRandomEmoji(page);
    }
  }

  await pressKey(page, 'Enter'); // New line after task

  return page;
};

const addTaskWithMention = (tasks = []) => async page => {
  const length = tasks.length;
  if (length > 0) {
    await addWithQuickInsert(page, 'task');
  }

  for (let { task, mention } of tasks) {
    await typeText(page, task);
    await pressKey(page, 'Space');
    await addMention(page, mention);

    await pressKey(page, 'Enter'); // Create next task
  }

  await pressKey(page, 'Enter'); // Remove task

  return page;
};

const simulateRFCProsCons = ({
  prosItems = [],
  consItems = [],
}) => async page => {
  for (let prosItem of prosItems) {
    await addEmoji(page, 'plus');
    await typeText(page, prosItem);
    await pressKey(page, 'Enter');
  }

  for (let consItem of consItems) {
    await addEmoji(page, 'minus');
    await typeText(page, consItem);
    await pressKey(page, 'Enter');
  }
};

function asyncPipe(...args) {
  return async (...rootArgs) => {
    let internalArgs = rootArgs;
    for (let fn of args) {
      internalArgs = [await fn(...internalArgs)];
    }
    return internalArgs;
  };
}

async function loginHello(page, username, password) {
  const selectors = {
    signin: '#google-signin-button',
    gEmail: 'input[type=email]',
    centrifyUsername: 'input[name=username]',
    centrifyPassword: 'input[name=answer]',
  };
  await page.waitForSelector(selectors.signin);
  await page.click(selectors.signin);

  await page.waitForSelector(selectors.gEmail);
  await page.type(selectors.gEmail, username);
  await pressKey(page, 'Enter');

  await page.waitForSelector(selectors.centrifyUsername);
  await page.type(selectors.centrifyUsername, username);
  await pressKey(page, 'Enter');

  await page.waitFor(5000);
  await page.waitForSelector(selectors.centrifyPassword);
  await page.type(selectors.centrifyPassword, password);
  await pressKey(page, 'Enter');
}

module.exports = {
  pipe: asyncPipe,
  addMention: composableAddMention,
  typeText: composableTypeText,
  addTaskWithMention,
  addTable,
  clickOnTableCell,
  loginHello,
  simulateRFCProsCons,
  typeTextWithEmojis,
  moveMouseToTableControl,
};
