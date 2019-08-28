import {
  doc,
  heading,
  text,
  p,
  ol,
  li,
  ul,
  ADFEntity,
  layoutSection,
  layoutColumn,
  mediaSingle,
  media,
} from '@atlaskit/adf-utils';
import flatten from '../../../src/utils/flatten';
import { validTypes } from '../../../src/utils/convertADFToSlides';

import { BlockContent, LayoutSectionDefinition } from '../../../../adf-schema';

describe('flatten', () => {
  test.each([
    [
      'a single document',
      [heading({ level: 1 })(text('Title')), p(text('Content'))],
    ],
    [
      'a document with an ordered list',
      [heading({ level: 1 })(text('Title')), ol()(li([p(text('Content'))]))],
    ],
    [
      'a document with an unordered list',
      [heading({ level: 1 })(text('Title')), ul(li([p(text('Content'))]))],
    ],
    [
      'a document with layouts',
      [
        heading({ level: 1 })(text('Title')),
        layoutSection()([
          layoutColumn({ width: 33 })([p(text('Content'))]),
          layoutColumn({ width: 67 })([p(text('Content'))]),
        ]),
      ],
    ],
    [
      'a document with media single',
      [
        heading({ level: 1 })(text('Title')),
        mediaSingle(undefined)(
          media({
            type: 'external',
            url: 'ads',
          }),
        ),
      ],
    ],
  ])(
    'should flatten %s',
    (_, nodes: Array<BlockContent | LayoutSectionDefinition>) => {
      expect(flatten(doc(...nodes), validTypes)).toEqual(nodes);
    },
  );
});
