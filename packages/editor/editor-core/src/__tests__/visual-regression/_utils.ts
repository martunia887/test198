import {
  getExampleUrl,
  disableAllSideEffects,
  navigateToUrl,
  compareScreenshot,
} from '@atlaskit/visual-regression/helper';
import { EditorProps } from '../../types';
import { Page } from '../__helpers/page-objects/_types';
import { animationFrame } from '../__helpers/page-objects/_editor';
import { GUTTER_SELECTOR } from '../../plugins/base/pm-plugins/scroll-gutter';
import { Page as PuppeteerPage } from 'puppeteer';

export {
  setupMediaMocksProviders,
  editable,
  changeSelectedNodeLayout,
  rerenderEditor,
  setFeature,
  toggleFeature,
} from '../integration/_helpers';

export const editorSelector = '.akEditor';
export const editorFullPageContentSelector =
  '.fabric-editor-popup-scroll-parent';
export const editorCommentContentSelector = '.ak-editor-content-area';
export const pmSelector = '.ProseMirror';

export const DEFAULT_WIDTH = 800;
export const DEFAULT_HEIGHT = 600;

export const dynamicTextViewportSizes = [
  { width: 1440, height: 4000 },
  { width: 1280, height: 4000 },
  { width: 768, height: 4000 },
  { width: 1024, height: 4000 },
];

export enum Device {
  Default = 'Default',
  LaptopHiDPI = 'LaptopHiDPI',
  LaptopMDPI = 'LaptopMDPI',
  iPadPro = 'iPadPro',
  iPad = 'iPad',
  iPhonePlus = 'iPhonePlus',
}

export const deviceViewPorts = {
  [Device.Default]: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
  [Device.LaptopHiDPI]: { width: 1440, height: 900 },
  [Device.LaptopMDPI]: { width: 1280, height: 800 },
  [Device.iPadPro]: { width: 1024, height: 1366 },
  [Device.iPad]: { width: 768, height: 1024 },
  [Device.iPhonePlus]: { width: 414, height: 736 },
};

type PuppeterPageWithCollab = PuppeteerPage & { collabPage: PuppeteerPage };

/**
 * Sometimes it's useful to visualise whitespace, invisible elements, or bounding boxes
 * to track layout changes and capture regressions in CI.
 *
 * Green is used to ensure it doesn't clash with the red and yellow used by jest-image-snapshot.
 */
const WHITESPACE_DEBUGGING_FILL_COLOR = '#0c0';

async function visualiseInvisibleElements(page: any) {
  await page.addStyleTag({
    content: `
      /*
        Visualise the invisible scroll gutter (padding at bottom of full page editor).
        This allows us to see whether the element exists within a snapshot, and compare the scroll offset.
      */
      ${GUTTER_SELECTOR} { background: ${WHITESPACE_DEBUGGING_FILL_COLOR}; }
    `,
  });
}

function getEditorProps(appearance: Appearance) {
  const enableAllEditorProps = {
    allowPanel: true,
    allowLists: true,
    allowTextColor: true,
    allowTextAlignment: true,
    quickInsert: true,
    allowCodeBlocks: { enableKeybindingsForIDE: true },
    allowTables: {
      advanced: true,
    },
    allowBreakout: true,
    allowJiraIssue: true,
    allowUnsupportedContent: true,
    allowExtension: {
      allowBreakout: true,
    },
    allowRule: true,
    allowDate: true,
    allowLayouts: {
      allowBreakout: true,
    },
    allowIndentation: true,
    allowTemplatePlaceholders: { allowInserting: true },
    allowStatus: true,
    media: true, // add true here since the testing example would handle providers
    placeholder:
      'Use markdown shortcuts to format your page as you type, like * for lists, # for headers, and *** for a horizontal rule.',
    shouldFocus: false,
    UNSAFE_cards: true,
    allowHelpDialog: true,
  };

  if (
    appearance === Appearance.fullPage ||
    appearance === Appearance.fullWidth
  ) {
    return {
      ...enableAllEditorProps,
      primaryToolbarComponents: true,
      contentComponents: true,
      media: {
        allowMediaSingle: true,
        allowResizing: true,
        allowMediaGroup: true,
      },
    };
  }

  if (appearance === Appearance.comment) {
    return {
      ...enableAllEditorProps,
      media: {
        allowMediaSingle: false,
        allowMediaGroup: true,
      },
    };
  }

  return enableAllEditorProps;
}

export type MountOptions = {
  mode?: 'light' | 'dark';
  withSidebar?: boolean;
  withCollab?:
    | {
        docId?: string;
      }
    | boolean;
};

export async function mountEditor(
  page: any,
  props: any,
  mountOptions?: MountOptions,
) {
  await page.evaluate(
    (props: EditorProps, mountOptions?: MountOptions) => {
      (window as any).__mountEditor(props, mountOptions);
    },
    props,
    mountOptions,
  );
  await page.waitForSelector(pmSelector, 500);
}

export enum Appearance {
  fullWidth = 'full-width',
  fullPage = 'full-page',
  comment = 'comment',
  mobile = 'mobile',
}

type SideEffectsOption = {
  cursor?: boolean;
  animation?: boolean;
  transition?: boolean;
  scroll?: boolean;
};

type InitEditorWithADFOptions = {
  appearance: Appearance;
  adf?: Object;
  device?: Device;
  viewport?: { width: number; height: number };
  editorProps?: EditorProps;
  mode?: 'light' | 'dark';
  allowSideEffects?: SideEffectsOption;
  withSidebar?: boolean;
  withCollab?: boolean;
};

function getCollabOptions(enabled = false): MountOptions['withCollab'] {
  if (!enabled || !SYNCHRONY_URL) {
    return;
  }
  // Create a random number to prevent collision between test using the same document
  // TODO: Improve to prefix the file name or something to identify the test
  const docId = Math.random()
    .toString(36)
    .substring(2);

  return {
    docId,
  };
}

/**
 * Create a setup editor function
 * If withCollab is true, then we are going to create the same document id for each editor setup using this
 * @param options
 */
function createSetupEditor(options: InitEditorWithADFOptions) {
  const {
    viewport,
    withCollab,
    appearance,
    adf,
    editorProps,
    mode,
    withSidebar,
    allowSideEffects,
  } = options;

  const collabOptions = getCollabOptions(withCollab);
  return async (
    page: PuppeteerPage,
    options?: { withDefaultValue: boolean },
  ) => {
    const url = getExampleUrl('editor', 'editor-core', 'vr-testing');
    await navigateToUrl(page, url, false);

    await page.setViewport(viewport!);

    // Mount the editor with the right attributes
    await mountEditor(
      page,
      {
        appearance: appearance,
        defaultValue:
          options && options.withDefaultValue ? JSON.stringify(adf) : '',
        ...getEditorProps(appearance),
        ...editorProps,
      },
      { mode, withSidebar, withCollab: collabOptions },
    );

    // We disable possible side effects, like animation, transitions and caret cursor,
    // because we cannot control and affect snapshots
    // You can override this disabling if you are sure that you need it in your test
    await disableAllSideEffects(page, allowSideEffects);

    // Visualise invisible elements
    await visualiseInvisibleElements(page);
  };
}

export const initEditor = async (
  page: PuppeteerPage,
  options: InitEditorWithADFOptions,
) => {
  const setupEditor = createSetupEditor(options);

  const setupEditorPromises = [setupEditor(page, { withDefaultValue: true })];
  const collabPage = (page as PuppeterPageWithCollab).collabPage;
  if (options.withCollab && SYNCHRONY_URL && collabPage) {
    setupEditorPromises.push(setupEditor(collabPage));
  }
  await Promise.all(setupEditorPromises);
  await page.bringToFront();
};

export const initEditorWithAdf = async (
  page: Page,
  options: InitEditorWithADFOptions,
) => {
  const { viewport: _viewport, device } = options;
  const viewport = _viewport
    ? _viewport
    : deviceViewPorts[device || Device.Default];

  await initEditor(page, { ...options, viewport });
};

export const initFullPageEditorWithAdf = async (
  page: any,
  adf: Object,
  device?: Device,
  viewport?: { width: number; height: number },
  editorProps?: EditorProps,
  mode?: 'light' | 'dark',
  allowSideEffects?: SideEffectsOption,
) => {
  await initEditorWithAdf(page, {
    adf,
    appearance: Appearance.fullPage,
    device,
    viewport,
    editorProps,
    mode,
    allowSideEffects,
  });
};

export const initCommentEditorWithAdf = async (
  page: any,
  adf: Object,
  device?: Device,
) => {
  await initEditorWithAdf(page, {
    adf,
    appearance: Appearance.comment,
    device,
  });
};

/**
 * Updates props of current mounted Editor component
 * Pass in only the new props you wish to apply on top of the current ones
 */
export const updateEditorProps = async (
  page: Page,
  newProps: Partial<EditorProps>,
) => {
  await page.evaluate((props: EditorProps) => {
    (window as any).__updateEditorProps(props);
  }, newProps);
};

export const clearEditor = async (page: any) => {
  await page.evaluate(() => {
    const dom = document.querySelector(pmSelector) as HTMLElement;
    dom.innerHTML = '<p><br /></p>';
  });
};

export const snapshot = async (
  page: Page,
  threshold: {
    tolerance?: number;
    useUnsafeThreshold?: boolean;
  } = {},
  selector: string = editorFullPageContentSelector,
) => {
  const { tolerance, useUnsafeThreshold } = threshold;
  const editor = await page.$(selector);

  // Wait for a frame because we are using RAF to throttle floating toolbar render
  animationFrame(page);

  // Try to take a screenshot of only the editor.
  // Otherwise take the whole page.
  let image;
  if (editor) {
    image = await editor.screenshot();
  } else {
    image = await page.screenshot();
  }

  return compareScreenshot(image, tolerance, { useUnsafeThreshold });
};

export const applyRemoteStep = async (page: Page, stepsAsString: string[]) => {
  return await page.evaluate((_stepsAsString: string[]) => {
    (window as any).__applyRemoteSteps(_stepsAsString);
  }, stepsAsString);
};
