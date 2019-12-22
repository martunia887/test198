import { extractPropsFromDocument } from '../../extractPropsFromDocument';
import { createTestsForDocument } from './_createTestsForDocument';
import { document } from './_fixtures';

describe('extractPropsFromDocument()', () => {
  createTestsForDocument('document', document, extractPropsFromDocument);
});
