import { MINIMUM_THRESHOLD } from '@atlaskit/visual-regression/helper';
import { initFullPageEditorWithAdf, snapshot, Device } from '../_utils';
import {
  getSelectorForTableCell,
  tableSelectors,
} from '../../__helpers/page-objects/_table';
import toolbarAdf from './__fixtures__/toolbar-adf.json';
import { waitForElementWithText } from '../../__helpers/page-objects/_editor';
import {
  clickOnExtension,
  waitForExtensionToolbar,
} from '../../__helpers/page-objects/_extensions';

describe('Floating toolbars:', () => {
  let page: any;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, toolbarAdf, Device.LaptopMDPI);
  });

  afterEach(async () => {
    await snapshot(page, MINIMUM_THRESHOLD);
  });

  it('should render the table toolbar', async () => {
    const endCellSelector = getSelectorForTableCell({ row: 3, cell: 2 });
    await page.click(endCellSelector);

    waitForElementWithText(page, tableSelectors.tableOptionsText);
  });

  it('should render the block extension toolbar inside table', async () => {
    const endCellSelector = getSelectorForTableCell({ row: 2, cell: 3 });
    await page.click(`${endCellSelector} .extensionView-content-wrap`);

    await waitForExtensionToolbar(page);
  });

  it('should render the inline extension toolbar inside table', async () => {
    const endCellSelector = getSelectorForTableCell({ row: 2, cell: 2 });
    await page.click(`${endCellSelector} .inlineExtensionView-content-wrap`);

    await waitForExtensionToolbar(page);
  });

  it('should render the info extension toolbar inside table', async () => {
    const endCellSelector = getSelectorForTableCell({ row: 3, cell: 3 });
    await page.click(`${endCellSelector} .inlineExtensionView-content-wrap`);

    await waitForExtensionToolbar(page);
  });

  it('should render toolbar for macro', async () => {
    await clickOnExtension(
      page,
      'com.atlassian.confluence.macro.core',
      'expand',
    );
    await waitForExtensionToolbar(page);
  });
});
