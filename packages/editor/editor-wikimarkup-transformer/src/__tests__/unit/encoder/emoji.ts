import { defaultSchema } from '@atlaskit/adf-schema';
import { doc, emoji, p } from '@atlaskit/editor-test-helpers';
import WikiMarkupTransformer from '../../../index';

describe('ADF => WikiMarkup - Emoji', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert emoji node', () => {
    const node = doc(
      p('Hello ', emoji({ id: '1f603', shortName: ':smiley:', text: '😃' })()),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });
});
