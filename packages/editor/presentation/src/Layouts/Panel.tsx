import * as React from 'react';
import { ReactSerializer } from '@atlaskit/renderer';
import { Slide } from '@marduke182/spectacle';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import { panelIcons } from '@atlaskit/editor-common';
import { PanelAttributes } from '@atlaskit/adf-schema';
import { colors } from '@atlaskit/theme';

interface Props {
  slide: SlideADF;
  serializer: ReactSerializer;
}

const lightPanelColor = {
  info: colors.B500,
  note: colors.P500,
  tip: colors.G500,
  success: colors.G500,
  warning: colors.N800,
  error: colors.R500,
};

const lightIconColor = {
  info: colors.B100,
  note: colors.P100,
  tip: colors.G400,
  success: colors.G100,
  warning: colors.Y300,
  error: colors.R100,
};

class PanelLayout extends React.Component<Props> {
  render() {
    const { slide, children } = this.props;
    const panelType = (slide.layout!.attrs! as PanelAttributes).panelType;
    const Icon = panelIcons[panelType] as any;
    const iconColor = lightIconColor[panelType];
    return (
      <Slide
        bgColor={lightPanelColor[panelType]}
        textColor="#FFFFFF"
        {...this.props}
      >
        <Icon primaryColor={iconColor} size="xxlarge" />
        {children}
      </Slide>
    );
  }
}

export default PanelLayout;
