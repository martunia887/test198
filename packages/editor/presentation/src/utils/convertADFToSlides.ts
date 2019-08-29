import { ADFEntity, doc } from '@atlaskit/adf-utils';
import flatten from './flatten';
import { TextSerializer, HeadingLevel } from '@atlaskit/renderer';
import { EntityTransformer } from './transformers/types';
import paragraphTransformer from './transformers/paragraph';
import { defaultSchema } from '@atlaskit/adf-schema';
import panelTransformer from './transformers/panel';
import listTransformer from './transformers/list';

export interface SlideTitle {
  level: HeadingLevel;
  content: string;
}

export interface SlideLayout {
  type: string;
  attrs?: object;
}

export interface Slide {
  title?: SlideTitle;
  layout?: SlideLayout;
  adf: ADFEntity;
}

export const validTypes = [
  'paragraph',
  'heading',
  'orderedList',
  'bulletList',
  'layoutSection',
  'mediaSingle',
  'panel',
];

const transformers: { [key: string]: EntityTransformer } = {
  paragraph: paragraphTransformer,
  panel: panelTransformer,
  bulletList: listTransformer,
  orderedList: listTransformer,
};

function convertADFToSlides(adf: ADFEntity, schema = defaultSchema): Slide[] {
  const textSerializer = TextSerializer.fromSchema(schema);

  const flattenNodes = flatten(adf, validTypes) as ADFEntity[];
  let currentTitle: SlideTitle | undefined;

  const slides: Slide[] = flattenNodes.reduce(
    (acc, entity) => {
      if (entity.type === 'heading') {
        const headingDoc = schema.nodeFromJSON(doc(entity as any));
        currentTitle = {
          level: (entity.attrs as { level: HeadingLevel }).level,
          content: textSerializer.serializeFragment(headingDoc.content),
        };
        return acc;
      }
      const transformer = transformers[entity.type];
      const slidesOverride: Partial<Slide>[] = transformer
        ? transformer(entity)
        : [{}];

      return [
        ...acc,
        ...slidesOverride.map(slideOverride => ({
          title: currentTitle,
          adf: doc(entity as any), // By default use the entity
          ...slideOverride,
        })),
      ];
    },
    [] as Slide[],
  );

  return slides;
}

export default convertADFToSlides;
