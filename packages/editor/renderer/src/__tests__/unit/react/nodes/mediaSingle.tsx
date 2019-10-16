import * as React from 'react';
import { mount } from 'enzyme';
import { imageFileId } from '@atlaskit/media-test-helpers';
import Media from '../../../../react/nodes/media';
import MediaSingle from '../../../../react/nodes/mediaSingle';
import { WidthProvider } from '@atlaskit/editor-common';

describe('MediaSingle', () => {
  it('passes down cardDimensions set to 100%', () => {
    const mediaDimensions = {
      width: 250,
      height: 250,
    };
    // mock page width
    Object.defineProperties(document.body, {
      offsetWidth: {
        get: () => 123,
      },
    });

    const mediaSingle = mount(
      <WidthProvider>
        <MediaSingle layout={'center'} rendererAppearance={'full-page'}>
          <Media
            id={imageFileId.id}
            type={imageFileId.mediaItemType}
            collection={imageFileId.collectionName}
            {...mediaDimensions}
          />
        </MediaSingle>
      </WidthProvider>,
    );

    const { cardDimensions } = mediaSingle.find(Media).props();
    expect(cardDimensions && cardDimensions.width).toEqual(`100%`);
    expect(cardDimensions && cardDimensions.height).toEqual(`100%`);

    mediaSingle.unmount();
  });
});
