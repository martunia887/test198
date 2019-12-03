import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import { PopupUploadEventPayloadMap } from '../src/types';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

export type Event = {
  readonly name: string;
  readonly payload: any;
};

export type RecentUploadCard = {
  readonly filename: string;
};

/**
 * Popup Simple Example Page Object
 * @see https://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern
 */
export class PopupSimplePage extends Page {
  async clickUploadButton(): Promise<void> {
    const selector = '[data-testid="media-picker-upload-button"]';
    await this.waitForSelector(selector);
    await this.click(selector);
  }

  async getRecentUploadCards(): Promise<RecentUploadCard[]> {
    const selector =
      '[data-testid="media-picker-uploading-media-card"] [data-testid="media-card-file-name"], ' +
      '[data-testid="media-picker-recent-media-card"] [data-testid="media-card-file-name"]';
    const result = await this.$$(selector);
    return Promise.all(
      result.map(async (element: any) => {
        const filename = await element.getHTML(false);
        return {
          filename: filename,
        };
      }),
    );
  }

  async getRecentUploadCard(
    filename: string,
  ): Promise<RecentUploadCard | undefined> {
    const targetCard = cardWithFilename(filename);
    await this.waitUntil(async () => {
      const cards = await this.getRecentUploadCards();
      return cards.some(targetCard);
    });
    return (await this.getRecentUploadCards()).find(targetCard);
  }

  async clickInsertButton(): Promise<void> {
    await this.click('[data-testid="media-picker-insert-button"]');
  }

  async getEvents(): Promise<Event[]> {
    return JSON.parse(await this.getText('#events'));
  }

  async getEvent(name: keyof PopupUploadEventPayloadMap): Promise<Event> {
    await this.waitUntil(async () =>
      (await this.getEvents()).some(eventWithName(name)),
    );

    const events = await this.getEvents();

    const event = events.find(eventWithName(name));
    if (event) {
      return event;
    } else {
      throw new Error(`Event ${name} not found`);
    }
  }

  async uploadFile(base64File: string) {
    const filename: string = (await this.browser.uploadFile(base64File)) as any; // There is a bug in webdriverio types in version 5.11.0
    const fileInputSelector = '[data-testid="media-picker-file-input"]';
    await this.waitForSelector(fileInputSelector);

    // We want to make input visible in order to be able to "type" into it.
    await this.execute(() => {
      const element = document.querySelector<HTMLInputElement>(
        '[data-testid="media-picker-file-input"]',
      );
      if (element) {
        element.style.display = 'block';
        element.removeAttribute('multiple');
        element.value = '';
      }
    });
    const fileInput = await this.$(fileInputSelector);
    await fileInput.setValue(filename);

    await this.waitForSelector('[data-testid="media-picker-insert-button"]');
  }
}

export async function gotoPopupSimplePage(
  client: ConstructorParameters<typeof Page>[0],
): Promise<PopupSimplePage> {
  const page = new PopupSimplePage(client);
  const url = getExampleUrl('media', 'media-picker', 'popup-simple');
  await page.goto(url);
  return page;
}

function eventWithName(name: string) {
  return (event: Event) => event.name === name;
}

function cardWithFilename(filename: string) {
  return (card: RecentUploadCard) => card.filename === filename;
}
