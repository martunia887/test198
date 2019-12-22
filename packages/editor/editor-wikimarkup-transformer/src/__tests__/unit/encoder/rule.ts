import { defaultSchema } from '@atlaskit/adf-schema';
import { doc, hr, p } from '@atlaskit/editor-test-helpers';
import WikiMarkupTransformer from '../../../index';

describe('ADF => WikiMarkup - Panel', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert rule node', () => {
    const node = doc(
      p('This is a ruler'),
      hr(),
      p('I am in between a ruler'),
      hr(),
      p('I am under a ruler'),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });
});
