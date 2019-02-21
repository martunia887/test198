import * as React from 'react';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import {
  createStorybookMediaClientConfig,
  defaultCollectionName,
} from '@atlaskit/media-test-helpers';
import { Identifier } from '@atlaskit/media-client';
import { MediaClientConfigContext } from '@atlaskit/media-core';
import { imageItem } from '../example-helpers';
import { MediaViewer } from '..';

const mediaClientConfig = createStorybookMediaClientConfig();

export type State = {
  selectedItem?: Identifier;
};

export default class Example extends React.Component<{}, State> {
  state: State = { selectedItem: undefined };
  setItem = (selectedItem: Identifier) => () => {
    this.setState({ selectedItem });
  };

  render() {
    return (
      <MediaClientConfigContext.Provider value={mediaClientConfig}>
        <div>
          <ModalDialog>
            <h1>This is a modal dialog</h1>
            <p>MediaViewer should open on top of the modal dialog</p>
            <Button onClick={this.setItem(imageItem)}>Open MediaViewer</Button>
          </ModalDialog>

          {this.state.selectedItem && (
            <MediaViewer
              selectedItem={this.state.selectedItem}
              dataSource={{ list: [this.state.selectedItem] }}
              collectionName={defaultCollectionName}
              onClose={() => this.setState({ selectedItem: undefined })}
            />
          )}
        </div>
      </MediaClientConfigContext.Provider>
    );
  }
}
