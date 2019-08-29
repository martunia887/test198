import * as React from 'react';
import { Slide } from 'spectacle';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import {
  lightPanelColor,
  panelIcons,
  lightIconColor,
} from '@atlaskit/editor-common';
import { PanelAttributes } from '@atlaskit/adf-schema';

interface Props {
  slide: SlideADF;
}

class PanelLayout extends React.Component<Props> {
  render() {
    const { slide, children } = this.props;
    const panelType = (slide.layout!.attrs! as PanelAttributes).panelType;
    const Icon = panelIcons[panelType] as any;
    const iconColor = lightIconColor[panelType];
    return (
      <Slide
        style={{
          backgroundColor: lightPanelColor[panelType],
        }}
      >
        <Icon size="xlarge" primaryColor={iconColor} />
        {children}
      </Slide>
    );
  }
}

export default PanelLayout;
