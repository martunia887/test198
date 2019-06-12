const selectors = {
  editor: '.ProseMirror',
  lastEditorElement: '.ProseMirror > *:last-child',
  lastEditorParagraph: '.ProseMirror > p:last-child',
  selectedNode: '.ProseMirror-selectednode',
  scrollContainer: '.fabric-editor-popup-scroll-parent',
  dropList: 'div[data-role="droplistContent"]',
  emojiPicker: 'div[data-emoji-picker-container="true"]',
  mentionQuery: 'span[data-type-ahead-query]',
  gapCursor: '.ProseMirror-gapcursor',
  layoutDataSection: '[data-layout-section="true"]',
  panelContent: '.ak-editor-panel__content',
  codeContent: '.code-content',
};

async function clickEditableContent(page) {
  await page.waitForSelector(selectors.editor);
  await page.click(selectors.editor);
}

const replaceInputStr = str => {
  return `concat('${str.replace(/'/g, `', "'", '`)}', '')`;
};

const getElementPathWithText = (text, htmlTag = 'span') =>
  `//${htmlTag}[contains(text(), ${replaceInputStr(text)})]`;

const waitForElementWithText = async (page, text, htmlTag = 'span') => {
  const elementPath = getElementPathWithText(text, htmlTag);
  await page.waitForXPath(elementPath, 5000);
};

const clickElementWithText = async ({ page, tag, text }) => {
  const elementPath = getElementPathWithText(text, tag);
  await page.waitForXPath(elementPath, 5000);
  const target = await page.$x(elementPath);
  expect(target.length).toBeGreaterThan(0);
  await target[0].click();
};

const getBoundingRect = async (page, selector) => {
  return await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);
};

// Execute the click using page.evaluate
// There appears to be a bug in Puppeteer which causes the
// "Node is either not visible or not an HTMLElement" error.
// https://product-fabric.atlassian.net/browse/ED-5688
const evaluateClick = (page, selector) => {
  return page.evaluate(selector => {
    document.querySelector(selector).click();
  }, selector);
};

async function animationFrame(page) {
  // Give browser time to render, waitForFunction by default fires on RAF.
  await page.waitForFunction('1 === 1');
}

async function typeInEditor(page, text) {
  await page.click(selectors.editor);
  await page.type(selectors.editor, text);
}

async function setCaretInNewParagraphAtTheEnd(page) {
  // To find the end of the document in a content agnostic way we click beneath
  // the last content node to insert a new paragaph prior to typing.
  // Complex node structures which support nesting (e.g. tables) make standard
  // clicking, focusing, and key pressing not suitable in an agnostic way.
  await scrollToElement(page, selectors.lastEditorElement);
  const bounds = await getBoundingRect(page, selectors.lastEditorElement);

  await page.mouse.click(bounds.left, bounds.top + bounds.height - 5);
}

async function typeInEditorAtEndOfDocument(page, text, options) {
  await setCaretInNewParagraphAtTheEnd(page);
  await scrollToElement(page, selectors.lastEditorParagraph);

  await page.type(selectors.lastEditorParagraph, text, options);
}

async function getEditorWidth(page) {
  return page.$eval(selectors.editor, el => el.clientWidth);
}

async function scrollToElement(page, elementSelector, padding = 0) {
  return page.evaluate(
    (editorScrollSelector, elementSelector) => {
      const editorScroll = document.querySelector(editorScrollSelector);
      const element = document.querySelector(elementSelector);
      if (!editorScroll || !element) {
        return;
      }

      element.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'auto',
      });
    },
    selectors.scrollContainer,
    elementSelector,
    padding,
  );
}

async function scrollToTop(page) {
  return page.evaluate(editorScrollSelector => {
    const editorScroll = document.querySelector(editorScrollSelector);
    if (!editorScroll) {
      return;
    }

    editorScroll.scrollTo(0, 0);
  }, selectors.scrollContainer);
}

const HUMAN_TYPING_SPEED_MS = 20;

module.exports = {
  HUMAN_TYPING_SPEED_MS,
  selectors,
  getBoundingRect,
  waitForElementWithText,
  clickElementWithText,
  waitForElementWithText,
  clickEditableContent,

  evaluateClick,
  animationFrame,
  typeInEditor,
  setCaretInNewParagraphAtTheEnd,
  typeInEditorAtEndOfDocument,
  getEditorWidth,
  scrollToElement,
  scrollToTop,
};
