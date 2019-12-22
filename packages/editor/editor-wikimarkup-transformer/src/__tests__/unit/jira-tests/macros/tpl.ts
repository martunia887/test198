import { defaultSchema } from '@atlaskit/adf-schema';
import { doc } from '@atlaskit/editor-test-helpers';
import { checkParseEncodeRoundTrips } from '../../_test-helpers';

// Nodes

describe.skip('WikiMarkup Transformer', () => {
  describe('', () => {
    const WIKI_NOTATION = ``;

    checkParseEncodeRoundTrips(
      WIKI_NOTATION,
      defaultSchema,
      WIKI_NOTATION,
      doc(),
    );
  });
});
