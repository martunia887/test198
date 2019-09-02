import * as React from 'react';
import { ReactSerializer } from '@atlaskit/renderer';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import PanelLayout from './Panel';
import HeadingLayout from './Heading';
import BaseLayout from './Base';

interface Props {
  slide: SlideADF;
  serializer: ReactSerializer;
}

const layouts: { [key: string]: React.ComponentType<Props> } = {
  panel: PanelLayout,
  heading: HeadingLayout,
};

class Layout extends React.Component<Props> {
  render() {
    const { children, slide } = this.props;
    if (slide.layout) {
      const Component = layouts[slide.layout!.type];
      return (
        <Component slide={slide} {...this.props}>
          {children}
        </Component>
      );
    }

    return (
      <BaseLayout slide={slide} {...this.props}>
        {children}
      </BaseLayout>
    );
  }
}

export default Layout;
