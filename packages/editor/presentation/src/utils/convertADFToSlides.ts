import { ADFEntity, doc } from '@atlaskit/adf-utils';
import flatten from './flatten';
import { TextSerializer } from '@atlaskit/renderer';
import {
  LayoutSectionDefinition,
  BlockContent,
  defaultSchema,
} from '@atlaskit/adf-schema';

interface Slides {
  title: string;
  adf: ADFEntity;
}

export const validTypes = [
  'paragraph',
  'heading',
  'orderedList',
  'bulletList',
  'layoutSection',
  'mediaSingle',
];

function convertADFToSlides(adf: ADFEntity, schema = defaultSchema): Slides[] {
  const textSerializer = TextSerializer.fromSchema(schema);

  const flattenNodes = flatten(adf, validTypes) as Array<
    BlockContent | LayoutSectionDefinition
  >;
  let currentTitle = '';

  const slides: Slides[] = flattenNodes.reduce(
    (acc, entity) => {
      if (entity.type === 'heading') {
        const headingDoc = schema.nodeFromJSON(doc(entity));
        currentTitle = textSerializer.serializeFragment(headingDoc.content);
        return acc;
      }

      return [
        ...acc,
        {
          title: currentTitle,
          adf: doc(entity as BlockContent | LayoutSectionDefinition),
        },
      ];
    },
    [] as Slides[],
  );

  return slides;
}

export default convertADFToSlides;
