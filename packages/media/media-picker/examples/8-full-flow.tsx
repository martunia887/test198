import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  defaultCollectionName,
  createStorybookMediaClientConfig,
  createUploadMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import { MediaViewerDataSource } from '@atlaskit/media-viewer';
import {
  FileIdentifier, ExternalImageIdentifier,
} from '@atlaskit/media-client';
import Button from '@atlaskit/button';
import Select, { ValueType } from '@atlaskit/select';
import { SelectWrapper, OptionsWrapper } from '../example-helpers/styled';
import { MediaPicker } from '../src';
import {
  unsplashPlugin,
  UnsplashFileMetadata,
} from '../example-helpers/unsplashPlugin';
import { PluginItemPayload } from '../src/domain/plugin';
import { emojiPlugin } from '../example-helpers/emojiPlugin';
import { AIPlugin } from '../example-helpers/AIPlugin';
import {
  UploadProcessingEventPayload,
  UploadEndEventPayload,
  UploadPreviewUpdateEventPayload,
  Popup,
  MediaFile
} from '../src/types';
import { addGlobalEventEmitterListeners } from '@atlaskit/media-test-helpers';

addGlobalEventEmitterListeners();

const userMediaClientConfig = createUploadMediaClientConfig();
const tenantMediaClientConfig = createStorybookMediaClientConfig();

interface DataSourceOption {
  label: string;
  value: DataSourceType;
}

const dataSourceOptions: DataSourceOption[] = [
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

  static contextTypes = {
    // Required context in order to integrate analytics in media picker
    getAtlaskitAnalyticsEventHandlers: PropTypes.func,
  };

  async componentDidMount() {
    const popup = await MediaPicker(userMediaClientConfig, {
      uploadParams: {
        collection: defaultCollectionName,
      },
      plugins: [unsplashPlugin, emojiPlugin, AIPlugin],
    });

    popup.on('plugin-items-inserted', (items: PluginItemPayload[]) => {
      const { events } = this.state;
      const newEvents: TenantFileRecord[] = items.map(item => {
        const { pluginName } = item;
        if (pluginName === 'unsplash') {
          const metadata: UnsplashFileMetadata = item.pluginFile.metadata;

          return {
            src: metadata.src,
          };
        } else if (pluginName === 'emoji') {
          const metadata = item.pluginFile.metadata;

          return {
            src: metadata.src,
          };
        }

        return {};
      });

      this.setState({
        events: [...events, ...newEvents],
      });
      // Media picker requires `proxyReactContext` to enable analytics
      // otherwise, analytics Gasv3 integrations won't work
      // proxyReactContext: this.context,
    });

    popup.on('uploads-start', (payload: { files: MediaFile[] }) => {
      const { events } = this.state;
      payload.files.forEach(file => {
        console.log('PUBLIC: uploads-start', file.id);
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
    popup.on('upload-processing', this.onUploadProcessing);
    popup.on('upload-end', this.onUploadEnd);
    this.setState({ popup });

    popup.show();
  }

  onUploadProcessing = (event: UploadProcessingEventPayload) => {
    console.log('onUploadProcessing', event.file.id);
  };

  onUploadEnd = (event: UploadEndEventPayload) => {
    console.log('onUploadEnd', event.file.id);
  };

  private onUploadPreviewUpdate = async (
    event: UploadPreviewUpdateEventPayload,
  ) => {
    console.log('PUBLIC: upload-preview-update', event.file.id);
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
            mediaClientConfig={tenantMediaClientConfig}
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

  private onDataSourceChange = (option: ValueType<DataSourceOption>) => {
    if (!option) return;

    this.setState({
      dataSourceType: (option as DataSourceOption).value,
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
