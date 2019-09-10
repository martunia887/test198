import {
  getExampleUrl,
  loadExampleUrl,
} from '@atlaskit/visual-regression/helper';

/**
 * Some content nodes deliberately appear differently in editor versus renderer.
 *
 * These styles attempt to normalize the appearance of the deselected node in
 * order to get the closest representation for comparison.
 */
async function normalizeStyles(page: any) {
  const css = `
    .ProseMirror [data-layout-section] > * {
      /* Disable layout column borders within editor */
      border: none !important;
    }
  `;
  await page.addStyleTag({ content: css });
}

const adfToggleSelector = '#adf-toggle';
const adfInputSelector = '#adf-input';
const importAdfBtnSelector = '#import-adf';
const editorSelectedNode = '.ProseMirror-selectednode';

export const editorContentSelector = '.ProseMirror';
export const rendererContentSelector = '.ak-renderer-document';

/**
 * Load the kitchen sink example which provides both the
 * editor and renderer for comparison.
 */
export const loadKitchenSinkWithAdf = async (page: any, adf: any) => {
  const url = getExampleUrl('editor', 'editor-core', 'kitchen-sink');
  await loadExampleUrl(page, url);

  await normalizeStyles(page);

  // Load the ADF into the editor & renderer.
  await page.waitForSelector(adfToggleSelector);
  await page.click(adfToggleSelector);
  await page.waitForSelector(adfInputSelector);
  await page.evaluate(
    (editorSelector: string, adfInputSelector: string, adf: object) => {
      const doc = document as any;
      const contentEditable = doc.querySelector(editorSelector);
      // Reset the content height prior to assigning new ADF (renderer is removed from DOM at this point)
      contentEditable.style.height = null;
      // Disable native spell checker for visual consistency
      contentEditable.setAttribute('spellcheck', false);
      // Assign ADF
      doc.querySelector(adfInputSelector).value = JSON.stringify(adf);
    },
    editorContentSelector,
    adfInputSelector,
    adf,
  );
  await page.click(importAdfBtnSelector);
  await page.evaluate(
    (
      editorSelector: string,
      rendererSelector: string,
      selectedNodeSelector: string,
    ) => {
      const doc = document as any;
      const editor = doc.querySelector(editorSelector);
      const renderer = doc.querySelector(rendererSelector);
      const editorContentHeight = editor.offsetHeight;
      const rendererContentHeight = renderer.offsetHeight;

      // Remove styles based on user selected node.
      // These don't have a parellel in the renderer.
      const selectedNodes: HTMLElement[] = Array.from(
        doc.querySelectorAll(selectedNodeSelector),
      );
      selectedNodes.forEach((element: HTMLElement) =>
        element.classList.remove(selectedNodeSelector.substr(1)),
      );

      // Resize to match consistent height for snapshot comparison.
      editor.style.height = renderer.style.height =
        Math.max(editorContentHeight, rendererContentHeight) + 'px';
    },
    editorContentSelector,
    rendererContentSelector,
    editorSelectedNode,
  );
  // Remove focus from the editor to ensure interactive UI control differences dissapear.
  await page.click(rendererContentSelector);
};
