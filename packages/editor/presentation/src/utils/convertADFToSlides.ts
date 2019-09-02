import { ADFEntity, doc } from '@atlaskit/adf-utils';
import flatten from './flatten';
import { TextSerializer, HeadingLevel } from '@atlaskit/renderer';
import { EntityTransformer } from './transformers/types';
import paragraphTransformer from './transformers/paragraph';
import { defaultSchema } from '@atlaskit/adf-schema';
import listTransformer from './transformers/list';
import panelTransformer from './transformers/panel';
import headingTransformer, { getTitleFromSlides } from './transformers/heading';

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
  adf?: ADFEntity;
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
  heading: headingTransformer,
};

function convertADFToSlides(adf: ADFEntity, schema = defaultSchema): Slide[] {
  const flattenNodes = flatten(adf, validTypes) as ADFEntity[];
  let currentTitle: SlideTitle | undefined;

  const slides: Slide[] = flattenNodes.reduce(
    (acc, entity) => {
      const transformer = transformers[entity.type];
      const slidesOverride: Partial<Slide>[] = transformer
        ? transformer(entity, schema)
        : [{ adf: doc(entity as any) }];

      const mayTitle = getTitleFromSlides(slidesOverride);
      if (mayTitle) {
        currentTitle = mayTitle;
      }

      return [
        ...acc,
        ...slidesOverride.map(slideOverride => ({
          title: currentTitle,
          ...slideOverride,
        })),
      ];
    },
    [] as Slide[],
  );

  return slides;
}

export default convertADFToSlides;
