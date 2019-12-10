import { defaultSchema } from '@atlaskit/adf-schema';
import WikiMarkupTransformer from '../../../index';

import { doc, mention, p } from '@atlaskit/editor-test-helpers';
import { Context } from '../../../interfaces';

describe('ADF => WikiMarkup - Mention', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert mention node', () => {
    const node = doc(
      p(
        'Hey ',
        mention({ id: 'supertong' })(),
        ', please take a look at this.',
      ),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });

  test('should convert mention node with context', () => {
    const context: Context = {
      mentionConversion: {
        'abc-123': 'accountid:abc-123',
      },
    };
    const node = doc(
      p('Hey ', mention({ id: 'abc-123' })(), ', please take a look at this.'),
    )(defaultSchema);
    expect(transformer.encode(node, context)).toMatchSnapshot();
  });
});
