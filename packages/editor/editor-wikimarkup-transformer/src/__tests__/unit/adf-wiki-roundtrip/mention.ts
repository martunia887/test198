import { defaultSchema } from '@atlaskit/adf-schema';
import WikiMarkupTransformer from '../../../index';

import { doc, mention, p } from '@atlaskit/editor-test-helpers';

describe('ADF => WikiMarkup - Mention', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert mention node WITHOUT context', () => {
    const node = doc(
      p(
        'Hey ',
        mention({ id: 'supertong' })(),
        ', please take a look at this.',
      ),
    )(defaultSchema);
    const wiki = transformer.encode(node);
    const adf = transformer.parse(wiki).toJSON();
    expect(adf).toEqual(node.toJSON());
  });

  test('should convert mention node WITH context', () => {
    const adfContext = {
      mentionConversion: {
        supertong: 'prefix:supertong',
      },
    };
    const wikiContext = {
      mentionConversion: {
        'prefix:supertong': 'supertong',
      },
    };
    const node = doc(
      p(
        'Hey ',
        mention({ id: 'supertong' })(),
        ', please take a look at this.',
      ),
    )(defaultSchema);
    const wiki = transformer.encode(node, wikiContext);
    const adf = transformer.parse(wiki, adfContext).toJSON();
    expect(adf).toEqual(node.toJSON());
  });
});
