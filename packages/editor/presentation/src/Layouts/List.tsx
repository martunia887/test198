import * as React from 'react';
import { Slide } from 'spectacle';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import { ADFEntity } from '../../../adf-utils/src';

interface Props {
  slide: SlideADF;
}

class PanelLayout extends React.Component<Props> {
  render() {
    const { slide, children } = this.props;
    const listAdf = slide.layout!.attrs! as { listAdf: ADFEntity };

    return <Slide />;
  }
}

export default PanelLayout;
