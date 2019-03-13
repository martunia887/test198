import * as React from 'react';
import { createStorybookMediaClientConfig } from '@atlaskit/media-test-helpers';
import { MediaClientConfigContext } from '@atlaskit/media-core';
import { imageItem, defaultCollectionName } from '../example-helpers';
import { MediaViewer } from '../src';

const mediaClientConfig = createStorybookMediaClientConfig();
const selectedItem = imageItem;

export default class Example extends React.Component<{}, {}> {
  render() {
    return (
      <MediaClientConfigContext.Provider value={mediaClientConfig}>
        <MediaViewer
          selectedItem={selectedItem}
          dataSource={{
            list: [selectedItem],
            collectionName: defaultCollectionName,
          }}
          collectionName={defaultCollectionName}
          onClose={() => this.setState({ selectedItem: undefined })}
        />
      </MediaClientConfigContext.Provider>
    );
  }
}
