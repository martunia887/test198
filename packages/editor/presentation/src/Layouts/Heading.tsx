import * as React from 'react';
import { Slide, Appear, Layout, Fill, Heading } from 'spectacle';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import { HeadingSlide } from '../utils/transformers/heading';
// import { Heading } from '../ui';

interface Props {
  slide: SlideADF;
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
