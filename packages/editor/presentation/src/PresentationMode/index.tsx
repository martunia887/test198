import * as React from 'react';
import { Deck } from '@marduke182/spectacle';
import { ReactSerializer } from '@atlaskit/renderer';
import { defaultSchema as schema } from '@atlaskit/adf-schema';
import { ADFEntity } from '@atlaskit/adf-utils';
import {
  BaseTheme,
  ProviderFactory,
  WidthProvider,
} from '@atlaskit/editor-common';
import convertADFToSlides from '../utils/convertADFToSlides';
import { toReact } from '../utils/toReact';
import { atlassianTheme } from '../themes';
import Layout from '../Layouts';
import Title from '../Layouts/Title';
import { StyleWrapper } from '../ui';

const ESC_KEY_CODE = 27;

interface Props {
  adf: ADFEntity | object;
  title?: string;
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
      isLazy: false,
      toReact,
    });
    this.state = {
      onStateChange: this.onStateChange,
    };
  }

  render() {
    const { adf, title } = this.props;

    return (
      <WidthProvider>
        <BaseTheme>
          <StyleWrapper>
            <Deck
              transition={['slide']}
              progress="bar"
              showFullscreenControl={false}
              theme={atlassianTheme}
              transitionDuration={500}
              onStateChange={this.onStateChange}
            >
              {title && title.trim() && this.getTitleSlide(title)}
              {this.getSliders(adf as ADFEntity)}
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

  renderADF(adf?: ADFEntity) {
    if (!adf) {
      return null;
    }

    const docFromSchema = schema.nodeFromJSON(adf);
    const children = this.serializer.serializeFragment(docFromSchema as any);
    return <>{children}</>;
  }

  getTitleSlide = (title: string) => {
    return <Title title={title} />;
  };

  getSliders = (adf: ADFEntity) => {
    const result = convertADFToSlides(adf);

    return result.map((slide, index) => (
      <Layout serializer={this.serializer} slide={slide} key={index}>
        {this.renderADF(slide.adf)}
      </Layout>
    ));
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
