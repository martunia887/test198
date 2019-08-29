import * as React from 'react';
import { Deck, Slide } from 'spectacle';
import { StyleWrapper, Heading } from '../ui';
import { ReactSerializer } from '@atlaskit/renderer';
import { defaultSchema as schema } from '@atlaskit/adf-schema';
import { ADFEntity } from '@atlaskit/adf-utils';
import {
  BaseTheme,
  ProviderFactory,
  WidthProvider,
} from '@atlaskit/editor-common';
import convertADFToSlides from '../utils/convertADFToSlides';
import { atlassianTheme } from '../themes';
import Layout from '../Layouts';

const ESC_KEY_CODE = 27;

interface Props {
  adf: ADFEntity;
  providerFactory?: ProviderFactory;
  onExit?: () => boolean;
}

interface State {
  onStateChange: (prev: any, next: any) => void;
}

export class PresentationMode extends React.Component<Props, State> {
  private serializer: ReactSerializer;

  constructor(props: Props) {
    super(props);

    this.serializer = ReactSerializer.fromSchema(schema, {
      providers: props.providerFactory,
    });
    this.state = {
      onStateChange: this.onStateChange,
    };
  }

  render() {
    const { adf } = this.props;

    return (
      <WidthProvider>
        <BaseTheme>
          <StyleWrapper>
            <Deck
              progress="bar"
              showFullscreenControl={false}
              theme={atlassianTheme}
              onStateChange={this.onStateChange}
            >
              {this.getSliders(adf)}
            </Deck>
          </StyleWrapper>
        </BaseTheme>
      </WidthProvider>
    );
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onESCKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onESCKeyPress, false);
    const { providerFactory } = this.props;

    providerFactory && providerFactory.destroy();
  }

  getSliders = (adf: ADFEntity) => {
    const result = convertADFToSlides(adf);

    return result.map((slide, index) => {
      const docFromSchema = schema.nodeFromJSON(slide.adf);
      const children = this.serializer.serializeFragment(docFromSchema as any);
      if (slide.layout) {
        return <Layout slide={slide}>{children}</Layout>;
      }
      return (
        <Slide key={index}>
          {slide.title && (
            <Heading content={slide.title.content} level={slide.title.level} />
          )}
          {children}
        </Slide>
      );
    });
  };

  private onESCKeyPress = (event: KeyboardEvent): boolean => {
    if (event.keyCode === ESC_KEY_CODE) {
      const { onExit } = this.props;

      return !!onExit && onExit();
    }

    return true;
  };

  private onStateChange = () => {};
}
