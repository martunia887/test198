import { extractPropsFromSpreadsheet } from '../../extractPropsFromSpreadsheet';
import { createTestsForSpreadsheet } from './_createTestsForSpreadsheet';
import { spreadsheet } from './_fixtures';

describe('extractPropsFromSpreadsheet()', () => {
  createTestsForSpreadsheet(
    'spreadsheet',
    spreadsheet,
    extractPropsFromSpreadsheet,
  );
});
