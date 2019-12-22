import { clickEditableContent } from '../../__helpers/page-objects/_editor';
import { pressKey } from '../../__helpers/page-objects/_keyboard';
import {
  insertMedia,
  waitForMediaToBeLoaded,
} from '../../__helpers/page-objects/_media';
import { scrollToTable } from '../../__helpers/page-objects/_table';
import {
  clickToolbarMenu,
  ToolbarMenuItem,
} from '../../__helpers/page-objects/_toolbar';
import { Page } from '../../__helpers/page-objects/_types';
import {
  snapshot,
  initEditorWithAdf,
  Appearance,
  editorCommentContentSelector,
} from '../_utils';

const editors: { appearance: Appearance; snapshotSelector?: string }[] = [
  { appearance: Appearance.fullPage },
  {
    appearance: Appearance.comment,
    snapshotSelector: editorCommentContentSelector,
  },
];
// TODO: https://product-fabric.atlassian.net/browse/ED-7721
describe.skip('Snapshot Test: Media', () => {
  let page: Page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  editors.forEach(editor => {
    describe(`${editor.appearance} editor`, () => {
      beforeEach(async () => {
        await initEditorWithAdf(page, {
          appearance: editor.appearance,
        });

        // click into the editor
        await clickEditableContent(page);
      });

      describe('Tables', () => {
        it('can insert into second row', async () => {
          await clickToolbarMenu(page, ToolbarMenuItem.table);

          // second cell
          await pressKey(page, 'ArrowDown');

          // now we can insert media as necessary
          await insertMedia(page);
          await waitForMediaToBeLoaded(page);
          await scrollToTable(page);

          await snapshot(page, undefined, editor.snapshotSelector);
        });
      });
    });
  });
});
