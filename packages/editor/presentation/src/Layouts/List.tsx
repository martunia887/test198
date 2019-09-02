import * as React from 'react';
import { defaultSchema as schema } from '@atlaskit/adf-schema';
import { Slide, Appear, ListItem, List } from 'spectacle';
import { ReactSerializer } from '@atlaskit/renderer';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import { ADFEntity } from '@atlaskit/adf-utils';

interface Props {
  slide: SlideADF;
  serializer: ReactSerializer;
}

class ListLayout extends React.Component<Props> {
  render() {
    const { slide, serializer } = this.props;
    const { listAdf } = slide.layout!.attrs! as { listAdf: ADFEntity };
    const isOrdered = listAdf.type === 'orderedList';

    return (
      <Slide {...this.props}>
        {/*
          // @ts-ignore */}
        <List ordered={isOrdered}>
          {listAdf &&
            listAdf.content &&
            listAdf.content.map((item, index) => {
              const docFromSchema = schema.nodeFromJSON(item);
              const fragment = serializer.serializeFragment(
                docFromSchema as any,
              );

              return (
                <Appear key={index}>
                  <ListItem>{fragment}</ListItem>
                </Appear>
              );
            })}
        </List>
      </Slide>
    );
  }
}

export default ListLayout;
