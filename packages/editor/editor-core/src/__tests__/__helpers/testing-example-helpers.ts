import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { getExampleUrl } from '@atlaskit/visual-regression/helper';
import { EditorProps } from '../../types';
import {
  clipboardInput,
  copyAsPlaintextButton,
  copyAsHTMLButton,
} from '../integration/_helpers';

type MountOptions = {
  i18n?: { locale: string };
};

export async function loadLocale(page: Page, locales: Array<string>) {
  await page.executeAsync((locales, done) => {
    (window as any).__loadReactIntlLocale(locales, done);
  }, locales);
}

export async function mountEditor(
  page: Page,
  props: EditorProps,
  options?: MountOptions,
) {
  await page.waitForSelector('#editor-container');
  await page.execute(
    (props?: EditorProps, options?: MountOptions) => {
      (window as any).__mountEditor(props, options || {});
    },
    props,
    options || {},
  );
  await page.waitForSelector('.ProseMirror', { timeout: 500 });
  await page.click('.ProseMirror');
}

export async function goToEditorTestingExample(
  client: ConstructorParameters<typeof Page>[0],
) {
  const page = new Page(client);
  const currentUrl = await page.url();
  const url = getExampleUrl(
    'editor',
    'editor-core',
    'testing',
    // @ts-ignore
    global.__BASEURL__,
  );

  if (currentUrl !== url) {
    await page.goto(url);
  }

  await page.maximizeWindow();

  return page;
}

export async function copyAsPlainText(page: Page, data: string) {
  await page.isVisible(clipboardInput);
  await page.clear(clipboardInput);
  await page.type(clipboardInput, data);
  await page.click(copyAsPlaintextButton);
}

export async function copyAsHTML(page: Page, data: string) {
  await page.isVisible(clipboardInput);
  await page.clear(clipboardInput);
  await page.type(clipboardInput, data);
  await page.click(copyAsHTMLButton);
}
