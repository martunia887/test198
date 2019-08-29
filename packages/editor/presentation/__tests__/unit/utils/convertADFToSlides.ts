import { doc, heading, text, p } from '@atlaskit/adf-utils';
import convertADFToSlides from '../../../src/utils/convertADFToSlides';

describe('convertADFToSlides', () => {
  test('should create slides for complicated docs', () => {
    const complicateDoc = doc(
      heading({ level: 1 })(text('heading 1')),
      p(text('')),
      p(text('Content 1')),
      p(text('Content 1.2')),
      heading({ level: 2 })(text('heading 2')),
      p(text('Content 2')),
      heading({ level: 1 })(text('heading 3')),
      p(text('Content 3')),
    );
    expect(convertADFToSlides(complicateDoc)).toEqual([
      {
        title: 'heading 1',
        adf: doc(p(text('Content 1'))),
      },
      {
        title: 'heading 1',
        adf: doc(p(text('Content 1.2'))),
      },
      {
        title: 'heading 2',
        adf: doc(p(text('Content 2'))),
      },
      {
        title: 'heading 3',
        adf: doc(p(text('Content 3'))),
      },
    ]);
  });
});
