/* tslint:disable:no-console */
import * as React from 'react';
import { Component } from 'react';
import {
  defaultMediaPickerAuthProvider,
  defaultMediaPickerCollectionName,
} from '@atlaskit/media-test-helpers';
import { MediaPicker, BinaryUploader, BinaryConfig } from '../src';

class BinaryWrapper extends Component<{}> {
  binary?: BinaryUploader;
  dropzoneContainer?: HTMLDivElement;

  async componentDidMount() {
    await this.createBinary();
  }

  async createBinary() {
    const mediaClientConfig = {
      authProvider: defaultMediaPickerAuthProvider,
    };
    const config: BinaryConfig = {
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
    };
    const binary = await MediaPicker('binary', mediaClientConfig, config);

    this.binary = binary;

    binary.upload(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
      'screen-capture.gif',
    );
    binary.on('upload-end', mpFile => console.log(mpFile));
    binary.on('upload-error', mpError => console.log(mpError));
  }

  render() {
    return <div>See the console</div>;
  }
}

export default () => <BinaryWrapper />;
