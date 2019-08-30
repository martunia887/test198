import { EntityTransformer } from './types';
import { doc, ADFEntity } from '@atlaskit/adf-utils';
import { Slide, SlideTitle } from '../convertADFToSlides';
import { HeadingLevel, TextSerializer } from '@atlaskit/renderer';

export interface HeadingSlideAttrs {
  level: HeadingLevel;
  content: string;
}

export interface HeadingSlide extends Slide {
  layout: {
    type: 'heading';
    attrs: HeadingSlideAttrs;
  };
  adf: ADFEntity;
}

export function getTitleFromSlides(slides: Slide[]): SlideTitle | undefined {
  const headingSlide = slides.find(
    slide => slide.layout && slide.layout.type === 'heading',
  ) as HeadingSlide;
  if (!headingSlide) {
    return;
  }

  return {
    ...headingSlide.layout.attrs,
  };
}

const listTransformer: EntityTransformer = (
  headingEntity,
  schema,
): HeadingSlide[] => {
  const textSerializer = TextSerializer.fromSchema(schema);
  const headingDoc = schema.nodeFromJSON(doc(headingEntity as any));

  return [
    {
      layout: {
        type: 'heading',
        attrs: {
          level: (headingEntity.attrs as { level: HeadingLevel }).level,
          content: textSerializer.serializeFragment(headingDoc.content),
        },
      },
      adf: doc(),
    },
  ];
};

export default listTransformer;
