import { defaultSchema } from '@atlaskit/adf-schema';
import { doc, mention, p } from '@atlaskit/editor-test-helpers';
import WikiMarkupTransformer from '../../../index';

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
      conversion: {
        mentionConversion: {
          supertong: 'prefix:supertong',
        },
      },
    };
    const wikiContext = {
      conversion: {
        mentionConversion: {
          'prefix:supertong': 'supertong',
        },
      },
    };
    const node = doc(
      p(
        'Hey ',
        mention({ id: 'supertong' })(),
        ', please take a look at this.',
      ),
    )(defaultSchema);
    const wiki = transformer.encode(node, adfContext);
    const adf = transformer.parse(wiki, wikiContext).toJSON();
    expect(adf).toEqual(node.toJSON());
  });
});
