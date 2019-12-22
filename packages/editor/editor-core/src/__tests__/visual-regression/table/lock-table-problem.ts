import { EditorProps } from '../../../types';
import { animationFrame } from '../../__helpers/page-objects/_editor';
import {
  clickFirstCell,
  grabAndMoveColumnResing,
  tableSelectors,
} from '../../__helpers/page-objects/_table';
import {
  initEditorWithAdf,
  Appearance,
  snapshot,
  applyRemoteStep,
} from '../_utils';

import adf from './__fixtures__/default-table.adf.json';

describe('Table lock problems', () => {
  let page: any;
  const editorProps: EditorProps = {
    allowTables: {
      allowControls: true,
      allowColumnResizing: true,
    },
  };

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  describe('when there is a step comming from collab', () => {
    const insertParagraph = [
      '{"stepType":"replace","from":0,"to":0,"slice":{"content":[{"type":"paragraph"}]}}',
      '{"stepType":"replace","from":1,"to":1,"slice":{"content":[{"type":"text","text":"r"}]}}',
      '{"stepType":"replace","from":2,"to":2,"slice":{"content":[{"type":"text","text":"s"}]}}',
    ];

    beforeEach(async () => {
      await initEditorWithAdf(page, {
        appearance: Appearance.fullPage,
        adf,
        viewport: { width: 800, height: 600 },
        editorProps,
      });
    });

    it('should be able to delete the table after resizing', async () => {
      await clickFirstCell(page);
      await animationFrame(page);
      await grabAndMoveColumnResing(page, { colIdx: 1, row: 2, amount: 123 });
      await applyRemoteStep(page, insertParagraph);
      await page.mouse.up();
      await page.click(tableSelectors.removeTable);
      await animationFrame(page);
      await snapshot(page);
    });
  });
});
