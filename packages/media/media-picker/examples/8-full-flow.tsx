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
  FileIdentifier,
  globalMediaEventEmitter,
} from '@atlaskit/media-client';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import {
  SelectWrapper,
  OptionsWrapper,
  FullFlowCardsWrapper,
} from '../example-helpers/styled';
import {
  MediaPicker,
  UploadPreviewUpdateEventPayload,
  MediaFile,
  Popup,
} from '../src';

const userMediaClientConfig = createUploadMediaClientConfig();
const tenantMediaClientConfig = createStorybookMediaClientConfig();

const dataSourceOptions = [
  { label: 'List', value: 'list' },
  { label: 'Collection', value: 'collection' },
];

export type TenantFileRecord = {
  id: string;
  occurrenceKey?: string;
};
export type DataSourceType = 'collection' | 'list';
export interface State {
  events: Array<TenantFileRecord>;
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
      container: document.body,
      // Media picker requires `proxyReactContext` to enable analytics
      // otherwise, analytics Gasv3 integrations won't work
      proxyReactContext: this.context,
    });

    globalMediaEventEmitter.on('file-added', file => {
      console.log('globalMediaEventEmitter on file-added', file);
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
    this.setState({ popup });

    popup.show();
  }

  private onUploadPreviewUpdate = async (
    event: UploadPreviewUpdateEventPayload,
  ) => {
    console.log('PUBLIC: upload-preview-update', event.file.id);
  };

  private getMediaViewerDataSource = (): MediaViewerDataSource => {
    const { dataSourceType, events } = this.state;
    const list: FileIdentifier[] = events.map(event => {
      const identifier: FileIdentifier = {
        id: event.id,
        occurrenceKey: event.occurrenceKey || '',
        mediaItemType: 'file',
      };

      return identifier;
    });

    return dataSourceType === 'collection'
      ? { collectionName: defaultCollectionName }
      : { list };
  };

  private renderCards = (shouldOpenMediaViewer?: boolean) => {
    const { events } = this.state;

    return events.map((fileRecord, key) => {
      const identifier: FileIdentifier = {
        id: fileRecord.id,
        mediaItemType: 'file',
        collectionName: defaultCollectionName,
        occurrenceKey: fileRecord.occurrenceKey,
      };

      return (
        <div key={key} style={{ display: 'inline-block', margin: '10px' }}>
          <Card
            mediaClientConfig={tenantMediaClientConfig}
            identifier={identifier}
            dimensions={
              shouldOpenMediaViewer
                ? {
                    width: 200,
                    height: 200,
                  }
                : {
                    width: 350,
                    height: 200,
                  }
            }
            shouldOpenMediaViewer={shouldOpenMediaViewer}
            useInlinePlayer={!shouldOpenMediaViewer}
            disableOverlay={!shouldOpenMediaViewer}
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
        <FullFlowCardsWrapper>
          <div>
            <h1>Cards + MediaViewer</h1>
            {this.renderCards(true)}
          </div>
          <div>
            <h1>Standalone Cards</h1>
            {this.renderCards()}
          </div>
        </FullFlowCardsWrapper>
      </React.Fragment>
    );
  }
}
