import * as React from 'react';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import PanelLayout from './Panel';

interface Props {
  slide: SlideADF;
}

const layouts: { [key: string]: React.ComponentType<Props> } = {
  panel: PanelLayout,
};

class Layout extends React.Component<Props> {
  render() {
    const Component = layouts[this.props.slide.layout!.type];

    return (
      <Component slide={this.props.slide}>{this.props.children} </Component>
    );
  }
}

export default Layout;
