import * as React from 'react';

import { Card } from '../src';
import * as uuid from 'uuid/v4';
import { MediaClient } from '@atlaskit/media-client';
import {
  mediaPickerAuthProvider,
  defaultCollectionName,
} from '@atlaskit/media-test-helpers';
import { MediaClientConfigContext } from '@atlaskit/media-core';
import { FileIdentifier } from '@atlaskit/media-client';

const mediaClientConfig = {
  authProvider: mediaPickerAuthProvider('asap'),
};
const mediaClient = new MediaClient(mediaClientConfig);
const collection = defaultCollectionName;

interface State {
  identifier?: FileIdentifier;
}

class Example extends React.Component<{}, State> {
  state: State = {};

  onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files) {
      return;
    }
    if (files.length === 0) {
      return;
    }
    const file = files.item(0);
    if (!file) {
      return;
    }
    const fileId = uuid();
    const touchedFiles = mediaClient.file.touchFiles([
      {
        fileId,
        collection,
      },
    ]);
    mediaClient.file.upload(
      {
        content: file,
        name: file.name,
        collection,
      },
      undefined,
      {
        id: fileId,
        deferredUploadId: touchedFiles.then(
          touchedFiles => touchedFiles.created[0].uploadId,
        ),
      },
    );

    this.setState({
      identifier: {
        mediaItemType: 'file',
        id: fileId,
        collectionName: collection,
      },
    });
  };

  private renderCards(identifier: FileIdentifier) {
    return (
      <table>
        <thead>
          <tr>
            <th>Resize Mode</th>
            <th>Landscapy parent</th>
            <th>Portraity parent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Fit</th>
            <td>
              <Card
                resizeMode="fit"
                identifier={identifier}
                dimensions={{
                  width: 200,
                  height: 100,
                }}
              />
            </td>
            <td>
              <Card
                resizeMode="fit"
                identifier={identifier}
                dimensions={{
                  width: 100,
                  height: 200,
                }}
              />
            </td>
          </tr>
          <tr>
            <th>Cover</th>
            <td>
              <Card
                resizeMode="crop"
                identifier={identifier}
                dimensions={{
                  width: 200,
                  height: 100,
                }}
              />
            </td>
            <td>
              <Card
                resizeMode="crop"
                identifier={identifier}
                dimensions={{
                  width: 100,
                  height: 200,
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { identifier } = this.state;

    return (
      <MediaClientConfigContext.Provider value={mediaClientConfig}>
        <h2>Choose a file</h2>
        In this example you can test how media-card handles images with
        orientation info saved in EXIF.
        <br />
        <input type="file" onChange={this.onChange} />
        {identifier ? this.renderCards(identifier) : null}
      </MediaClientConfigContext.Provider>
    );
  }
}

export default () => <Example />;
