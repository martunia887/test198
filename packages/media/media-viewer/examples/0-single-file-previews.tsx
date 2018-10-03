import * as React from 'react';
import { createStorybookContext } from '@atlaskit/media-test-helpers';
import { FileIdentifier, Card } from '@atlaskit/media-card';
import { ButtonList, Container, Group } from '../example-helpers/styled';
import {
  archiveItem,
  audioItem,
  audioItemNoCover,
  docItem,
  imageItem,
  largeImageItem,
  smallImageItem,
  unsupportedItem,
  videoHorizontalFileItem,
  videoItem,
  videoLargeFileItem,
  videoProcessingFailedItem,
  wideImageItem,
  defaultCollectionName,
} from '../example-helpers';
import { MediaViewer, MediaViewerItem } from '../src';
import Button from '@atlaskit/button';

const context = createStorybookContext();

export type State = {
  selectedItem?: MediaViewerItem;
  list: MediaViewerItem[];
};

export default class Example extends React.Component<{}, State> {
  state: State = { selectedItem: undefined, list: [] };

  setItem = (selectedItem: MediaViewerItem) => () => {
    this.setState({ selectedItem, list: [selectedItem] });
  };

  createItem = (item: MediaViewerItem, title: string) => {
    const identifier: FileIdentifier = {
      id: item.id,
      mediaItemType: 'file',
      collectionName: defaultCollectionName,
    };
    const onClick = this.setItem(item);

    return (
      <div>
        <h4>{title}</h4>
        <Card identifier={identifier} context={context} onClick={onClick} />
      </div>
    );
  };

  navigateList = () => {
    const list: MediaViewerItem[] = [
      imageItem,
      smallImageItem,
      wideImageItem,
      largeImageItem,
      docItem,
      videoHorizontalFileItem,
      videoLargeFileItem,
      videoItem,
      audioItem,
      audioItemNoCover,
    ];
    this.setState({ selectedItem: list[0], list });
  };

  render() {
    return (
      <Container>
        <Group>
          <h2>Image</h2>
          <ButtonList>
            <li>{this.createItem(imageItem, 'Picture')}</li>
            <li>{this.createItem(smallImageItem, 'Icon')}</li>
            <li>{this.createItem(wideImageItem, 'Wide')}</li>
            <li>{this.createItem(largeImageItem, 'Large')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Document</h2>
          <ButtonList>
            <li>{this.createItem(docItem, 'Normal')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Video</h2>
          <ButtonList>
            <li>{this.createItem(videoHorizontalFileItem, 'Horizontal')}</li>
            <li>{this.createItem(videoLargeFileItem, 'Large')}</li>
            <li>{this.createItem(videoItem, 'Normal')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Audio</h2>
          <ButtonList>
            <li>{this.createItem(audioItem, 'Normal')}</li>
            <li>{this.createItem(audioItemNoCover, 'Song without cover')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Errors</h2>
          <ButtonList>
            <li>{this.createItem(unsupportedItem, 'Unsupported item')}</li>
            <li>{this.createItem(archiveItem, 'Archive has no preview')}</li>
            <li>
              {this.createItem(videoProcessingFailedItem, 'Failed processing')}
            </li>
          </ButtonList>
        </Group>

        <div>
          <Button onClick={this.navigateList}>Navigate all items</Button>
        </div>

        {this.state.selectedItem && (
          <MediaViewer
            featureFlags={{ customVideoPlayer: true }}
            context={context}
            selectedItem={this.state.selectedItem}
            dataSource={{ list: this.state.list }}
            collectionName={defaultCollectionName}
            onClose={() => this.setState({ selectedItem: undefined })}
          />
        )}
      </Container>
    );
  }
}
