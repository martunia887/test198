import * as React from 'react';
import { Deck, Slide, Heading } from 'spectacle';
import { ReactSerializer, StyleWrapper } from '@atlaskit/renderer';
import { defaultSchema as schema } from '@atlaskit/adf-schema';
import { ADFEntity } from '@atlaskit/adf-utils';
import { BaseTheme } from '@atlaskit/editor-common';
import convertADFToSlides from '../utils/convertADFToSlides';
import { atlassianTheme } from '../themes';

const reactSerializer = ReactSerializer.fromSchema(schema, {});
const ESC_KEY_CODE = 27;

interface Props {
  adf: ADFEntity;
  onExit?: () => boolean;
}

interface State {
  onStateChange: (prev: any, next: any) => void;
}

const getSliders = (adf: ADFEntity) => {
  const result = convertADFToSlides(adf);

  return result.map((slide, index) => {
    const docFromSchema = schema.nodeFromJSON(slide.adf);
    const children = reactSerializer.serializeFragment(docFromSchema as any);

    return (
      <Slide key={index}>
        <Heading>{slide.title}</Heading>
        {children}
      </Slide>
    );
  });
};

export class PresentationMode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      onStateChange: this.onStateChange,
    };
  }

  render() {
    const { adf } = this.props;

    return (
      <BaseTheme>
        <StyleWrapper>
          <Deck theme={atlassianTheme} onStateChange={this.onStateChange}>
            {getSliders(adf)}
          </Deck>
        </StyleWrapper>
      </BaseTheme>
    );
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onESCKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onESCKeyPress, false);
  }

  private onESCKeyPress = (event: KeyboardEvent): boolean => {
    if (event.keyCode === ESC_KEY_CODE) {
      const { onExit } = this.props;

      return !!onExit && onExit();
    }

    return true;
  };

  private onStateChange = () => {};
}
