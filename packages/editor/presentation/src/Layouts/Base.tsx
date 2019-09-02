import * as React from 'react';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import { Slide } from '@marduke182/spectacle';
import { ReactSerializer } from '@atlaskit/renderer';
import { Heading } from '../ui';

interface Props {
  slide: SlideADF;
  serializer: ReactSerializer;
}

const BasicSlide: React.FC<Props> = props => {
  const { slide } = props;

  return (
    <Slide {...props}>
      {slide.title && <Heading content={slide.title.content} level={6} />}
      {props.children}
    </Slide>
  );
};

const BaseLayout: React.FC<Props> = BasicSlide;

export default BaseLayout;
