import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { BrowserObject } from '@atlaskit/webdriver-runner/wd-wrapper';

import { gotoCardFilesMockedPage } from '../_pages/card-files-mocked-page';

const cardStandardSelector = '[data-testid="media-card-standard"]';
const cardWithContextIdSelector = '[data-testid="media-card-with-context-id"]';
const cardStandardSelectorWithMediaViewer = `[data-testid="media-card-standard-with-media-viewer"]`;
const cardStandardLoading =
  '[data-testid="media-card-loading-card"] * [data-testid="media-card-loading"]';

BrowserTestCase('MediaCard - load image', {}, async (client: BrowserObject) => {
  const page = await gotoCardFilesMockedPage(client);

  const result = await page.isCardLoadedSuccessful(cardStandardSelector);
  expect(result).toBe(true);
});

BrowserTestCase(
  'MediaCard - load image with contextId',
  {},
  async (client: BrowserObject) => {
    const page = await gotoCardFilesMockedPage(client);

    const result = await page.isCardLoadedSuccessful(cardWithContextIdSelector);
    expect(result).toBe(true);
  },
);

BrowserTestCase(
  'MediaCard - load image and launch media viewer',
  {},
  async (client: BrowserObject) => {
    const page = await gotoCardFilesMockedPage(client);

    await page.isCardLoadedSuccessful(cardStandardSelectorWithMediaViewer);
    await page.launchMediaViewer(cardStandardSelectorWithMediaViewer);
    await page.isMediaViewerLaunched();
  },
);

BrowserTestCase(
  'MediaCard - renders loading card',
  {},
  async (client: BrowserObject) => {
    const page = await gotoCardFilesMockedPage(client);

    await page.isCardVisible(cardStandardLoading);
  },
);
