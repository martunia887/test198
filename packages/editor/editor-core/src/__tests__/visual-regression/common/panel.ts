import { panelSelectors } from '../../__helpers/page-objects/_panel';
import { Page } from '../../__helpers/page-objects/_types';
import { initFullPageEditorWithAdf, snapshot } from '../_utils';

import * as panel from './__fixtures__/panel-adf.json';

describe('Panel:', () => {
  let page: Page;

  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });

  it('looks correct', async () => {
    await initFullPageEditorWithAdf(page, panel);
    await page.click(panelSelectors.panel);
    await snapshot(page);
  });
});
