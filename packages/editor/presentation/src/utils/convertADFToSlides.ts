import { ADFEntity, doc } from '@atlaskit/adf-utils';
import flatten from './flatten';
import { TextSerializer } from '@atlaskit/renderer';
import { EntityTransformer } from './transformers/types';
import paragraphTransformer from './transformers/paragraph';
import { defaultSchema } from '@atlaskit/adf-schema';

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

const transformers: { [key: string]: EntityTransformer } = {
  paragraph: paragraphTransformer,
};

function convertADFToSlides(adf: ADFEntity, schema = defaultSchema): Slides[] {
  const textSerializer = TextSerializer.fromSchema(schema);

  const flattenNodes = flatten(adf, validTypes) as ADFEntity[];
  let currentTitle = '';

  const slides: Slides[] = flattenNodes.reduce(
    (acc, entity) => {
      if (entity.type === 'heading') {
        const headingDoc = schema.nodeFromJSON(doc(entity as any));
        currentTitle = textSerializer.serializeFragment(headingDoc.content);
        return acc;
      }
      const transformer = transformers[entity.type];
      const entities: ADFEntity[] = transformer
        ? transformer(entity)
        : [entity];

      return [
        ...acc,
        ...entities.map(entity => ({
          title: currentTitle,
          adf: doc(entity as any),
        })),
      ];
    },
    [] as Slides[],
  );

  return slides;
}

export default convertADFToSlides;
