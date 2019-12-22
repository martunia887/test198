import { EditorProps } from '../../../types';
import {
  clickEditableContent,
  animationFrame,
} from '../../__helpers/page-objects/_editor';
import {
  pressKey,
  pressKeyCombo,
} from '../../__helpers/page-objects/_keyboard';
import {
  insertMedia,
  waitForMediaToBeLoaded,
  clickMediaInPosition,
  scrollToMedia,
} from '../../__helpers/page-objects/_media';
import { Page } from '../../__helpers/page-objects/_types';
import { snapshot, Appearance, initEditorWithAdf } from '../_utils';

describe('Snapshot Test: Media with alt text', () => {
  let page: Page;
  const initEditorWithMedia = async (
    appearance: Appearance,
    viewport: { width: number; height: number },
    editorProps?: Partial<EditorProps>,
  ) => {
    await initEditorWithAdf(page, {
      appearance,
      viewport,
      editorProps,
    });

    // click into the editor
    await clickEditableContent(page);

    // insert single media item
    await insertMedia(page);
    await waitForMediaToBeLoaded(page);
  };

  beforeEach(() => {
    // @ts-ignore
    page = global.page;
  });

  describe('in the toolbar', () => {
    describe('when the feature flag is disabled', () => {
      it('should not display the alt text option', async () => {
        await initEditorWithMedia(Appearance.fullPage, {
          width: 800,
          height: 700,
        });
        await pressKey(page, 'ArrowUp');
        await snapshot(page);
      });
    });

    describe('when the feature flag is enable', () => {
      beforeEach(async () => {
        await initEditorWithMedia(
          Appearance.fullPage,
          { width: 800, height: 700 },
          {
            media: {
              UNSAFE_allowAltTextOnImages: true,
            },
          },
        );
        await scrollToMedia(page);
        await clickMediaInPosition(page, 0);
        await page.waitForSelector(
          '[aria-label="Media floating controls"] [aria-label="Floating Toolbar"]',
          { visible: true },
        );
      });

      it('should display the alt text option', async () => {
        await snapshot(page);
      });

      describe('when the shortcut is pressed', () => {
        it('should display the alt text description', async () => {
          await pressKeyCombo(page, ['Control', 'Alt', 'y']);
          await page.waitForSelector('[data-testid="alt-text-input"]', {
            visible: true,
          });
          await snapshot(page);
        });
      });

      describe('when the alt text button is clicked', () => {
        it('should display the alt text description', async () => {
          const altTextButton = await page.waitForSelector(
            '[data-testid="alt-text-edit-button"]',
            { visible: true },
          );
          await altTextButton.click();
          await snapshot(page);
        });
      });

      describe('when the user adds an alt text value', () => {
        beforeEach(async () => {
          const altTextButton = await page.waitForSelector(
            '[data-testid="alt-text-edit-button"]',
            { visible: true },
          );
          await altTextButton.click();

          const altTextInput = await page.waitForSelector(
            '[data-testid="alt-text-input"]',
            { visible: true },
          );
          await altTextInput.press('y');
        });

        it('should display the clear alt text button', async () => {
          await snapshot(page);
        });

        it('should clear alt text when the user click the alt text button', async () => {
          await page.waitForSelector('button[aria-label="Clear alt text"]');
          await page.click('button[aria-label="Clear alt text"]');
          await animationFrame(page);
          await snapshot(page);
        });
      });
    });
  });
});
