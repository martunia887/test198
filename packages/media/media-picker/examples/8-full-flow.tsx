import * as React from 'react';
import {
  defaultCollectionName,
  createUploadContext,
} from '@atlaskit/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import { MediaViewerDataSource } from '@atlaskit/media-viewer';
import { FileIdentifier, ExternalImageIdentifier } from '@atlaskit/media-core';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import { SelectWrapper, OptionsWrapper } from '../example-helpers/styled';
import {
  MediaPicker,
  UploadPreviewUpdateEventPayload,
  MediaFile,
  Popup,
} from '../src';
import {
  unsplashPlugin,
  UnsplashFileMetadata,
} from '../example-helpers/unsplashPlugin';
import { PluginItemPayload } from 'src/domain/plugin';

const context = createUploadContext();

const dataSourceOptions = [
  { label: 'List', value: 'list' },
  { label: 'Collection', value: 'collection' },
];

export type TenantFileRecord = {
  id?: string;
  src?: string;
  occurrenceKey?: string;
};
export type DataSourceType = 'collection' | 'list';
export interface State {
  events: TenantFileRecord[];
  dataSourceType: DataSourceType;
  popup?: Popup;
}

export default class Example extends React.Component<{}, State> {
  state: State = { events: [], dataSourceType: 'list' };

  async componentDidMount() {
    const popup = await MediaPicker('popup', context, {
      uploadParams: {
        collection: defaultCollectionName,
      },
      plugins: [unsplashPlugin],
    });

    popup.on('plugin-items-inserted', (items: PluginItemPayload[]) => {
      const { events } = this.state;
      const newEvents: TenantFileRecord[] = items.map(item => {
        if (item.pluginName === 'unsplash') {
          const metadata: UnsplashFileMetadata = item.pluginFile.metadata;

          return {
            src: metadata.src,
          };
        }

        return {};
      });

      this.setState({
        events: [...events, ...newEvents],
      });
    });

    popup.on('uploads-start', (payload: { files: MediaFile[] }) => {
      const { events } = this.state;
      payload.files.forEach(file => {
        file.upfrontId.then(id => {
          console.log('PUBLIC: uploads-start', file.id, id);
        });
      });

      this.setState({
        events: [
          ...events,
          ...payload.files.map(file => ({
            id: file.id,
            occurrenceKey: file.occurrenceKey,
          })),
        ],
      });
    });

    popup.on('upload-preview-update', this.onUploadPreviewUpdate);
    this.setState({ popup });

    popup.show();
  }

  private onUploadPreviewUpdate = async (
    event: UploadPreviewUpdateEventPayload,
  ) => {
    console.log(
      'PUBLIC: upload-preview-update',
      event.file.id,
      await event.file.upfrontId,
    );
  };

  private getMediaViewerDataSource = (): MediaViewerDataSource => {
    const { dataSourceType, events } = this.state;
    const list: FileIdentifier[] = events.map(event => {
      const identifier: FileIdentifier = {
        id: event.id!,
        occurrenceKey: event.occurrenceKey || '',
        mediaItemType: 'file',
      };

      return identifier;
    });

    return dataSourceType === 'collection'
      ? { collectionName: defaultCollectionName }
      : { list };
  };

  private renderCards = () => {
    const { events } = this.state;

    return events.map((fileRecord, key) => {
      let identifier: FileIdentifier | ExternalImageIdentifier | undefined;

      if (fileRecord.id) {
        identifier = {
          id: fileRecord.id,
          mediaItemType: 'file',
          collectionName: defaultCollectionName,
          occurrenceKey: fileRecord.occurrenceKey,
        };
      } else if (fileRecord.src) {
        identifier = {
          mediaItemType: 'external-image',
          dataURI: fileRecord.src,
        };
      }

      if (!identifier) {
        return null;
      }

      return (
        <div key={key} style={{ display: 'inline-block', margin: '10px' }}>
          <Card
            context={context}
            identifier={identifier}
            dimensions={{
              width: 200,
              height: 200,
            }}
            shouldOpenMediaViewer={true}
            mediaViewerDataSource={this.getMediaViewerDataSource()}
          />
        </div>
      );
    });
  };

  private onDataSourceChange = (event: { value: DataSourceType }) => {
    this.setState({
      dataSourceType: event.value,
    });
  };

  render() {
    const { popup } = this.state;

    return (
      <React.Fragment>
        <OptionsWrapper>
          <Button
            appearance="primary"
            id="show"
            onClick={() => (popup ? popup.show() : null)}
          >
            Show
          </Button>
          <SelectWrapper>
            <Select
              options={dataSourceOptions}
              defaultValue={dataSourceOptions[0]}
              onChange={this.onDataSourceChange}
            />
          </SelectWrapper>
        </OptionsWrapper>
        <div>{this.renderCards()}</div>
      </React.Fragment>
    );
  }
}
