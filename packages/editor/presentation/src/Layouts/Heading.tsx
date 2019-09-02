import * as React from 'react';
import { ReactSerializer } from '@atlaskit/renderer';
import { Slide, Layout, Fill, Heading } from '@marduke182/spectacle';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import { HeadingSlide } from '../utils/transformers/heading';
// import { Heading } from '../ui';

interface Props {
  slide: SlideADF;
  serializer: ReactSerializer;
}

class HeadingLayout extends React.Component<Props> {
  render() {
    const slide = this.props.slide as HeadingSlide;

    return (
      <Slide transition={['slide']}>
        <Layout>
          <Fill>
            <Heading size={slide.layout.attrs.level}>
              {slide.layout.attrs.content}
            </Heading>
          </Fill>
        </Layout>
      </Slide>
    );
  }
}

export default HeadingLayout;
