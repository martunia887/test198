import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import {
  clickEditableContent,
  selectors,
} from '../../__helpers/page-objects/_editor';
import { insertMention, lozenge } from '../../integration/_helpers';
import * as innovationWeek from './__fixtures__/innovation-week.adf.json';
import * as actualCrimes from './__fixtures__/actual-crimes.adf.json';

describe('Performance: mentions', () => {
  let page: any;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(
      page,
      actualCrimes,
      Device.LaptopHiDPI,
      undefined,
      {
        mentionProvider: undefined,
      },
    );
  });

  describe('Mentions', async () => {
    it('can insert a media single inside a bullet list', async () => {
      await page.tracing.start({
        path:
          '/Users/ahixon/src/atlaskit-mk-2/profile-crimes-something-cellview.json',
        screenshots: true,
      });

      await page.type(selectors.editor, '* ');
      await page.waitForSelector('ul');
      await page.type(selectors.editor, 'this ');
      // await insertMention(page, 'Carolyn');

      await page.keyboard.press('Enter');

      await page.tracing.stop();
    });
  });
});
