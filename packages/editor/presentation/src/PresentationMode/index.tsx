import * as React from 'react';
import { Deck, Slide, Magic, Heading } from 'spectacle';
import { ReactSerializer } from '@atlaskit/renderer';
import { defaultSchema as schema } from '@atlaskit/adf-schema';
import { ADFEntity } from '@atlaskit/adf-utils';
import convertADFToSlides from '../utils/convertADFToSlides';

const reactSerializer = ReactSerializer.fromSchema(schema, {});

interface Props {
  adf: ADFEntity;
}

export class PresentationMode extends React.Component<Props> {
  render() {
    const { adf } = this.props;

    const result = convertADFToSlides(adf);
    const slidesComponents = result.map(slide => {
      const docFromSchema = schema.nodeFromJSON(slide.adf);
      const children = reactSerializer.serializeFragment(docFromSchema as any);

      return (
        <Slide>
          <Heading>{slide.title}</Heading>
          {children}
        </Slide>
      );
    });

    return (
      <Deck>
        <Magic>{slidesComponents}</Magic>
      </Deck>
    );
  }
}
