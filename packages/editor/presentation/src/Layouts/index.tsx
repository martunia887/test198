import * as React from 'react';
import { ReactSerializer } from '@atlaskit/renderer';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import PanelLayout from './Panel';
import ListLayout from './List';
import HeadingLayout from './Heading';

interface Props {
  slide: SlideADF;
  serializer: ReactSerializer;
}

const layouts: { [key: string]: React.ComponentType<Props> } = {
  panel: PanelLayout,
  list: ListLayout,
  heading: HeadingLayout,
};

class Layout extends React.Component<Props> {
  render() {
    const Component = layouts[this.props.slide.layout!.type];

    return (
      <Component slide={this.props.slide} {...this.props}>
        {this.props.children}{' '}
      </Component>
    );
  }
}

export default Layout;
