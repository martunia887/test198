import * as React from 'react';
import {
  externalImageIdentifier,
  createStorybookMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import { Identifier } from '@atlaskit/media-client';
import { ButtonList, Container, Group } from '../example-helpers/styled';
import {
  archiveItem,
  audioItem,
  audioItemNoCover,
  docItem,
  imageItem,
  emptyImage,
  largeImageItem,
  smallImageItem,
  unsupportedItem,
  videoHorizontalFileItem,
  videoItem,
  videoLargeFileItem,
  videoProcessingFailedItem,
  wideImageItem,
  verticalImageItem,
  videoSquareFileIdItem,
} from '../example-helpers';
import { I18NWrapper } from '@atlaskit/media-test-helpers';
import { addGlobalEventEmitterListeners } from '@atlaskit/media-test-helpers';
addGlobalEventEmitterListeners();

const mediaClientConfig = createStorybookMediaClientConfig();

export default class Example extends React.Component<{}> {
  createItem = (identifier: Identifier, title: string) => {
    return (
      <div>
        <h4>{title}</h4>
        <Card
          identifier={identifier}
          mediaClientConfig={mediaClientConfig}
          shouldOpenMediaViewer={true}
        />
      </div>
    );
  };

  render() {
    return (
      <I18NWrapper>
        <Container>
          <Group>
            <h2>Image</h2>
            <ButtonList>
              <li>{this.createItem(imageItem, 'Picture')}</li>
              <li>{this.createItem(smallImageItem, 'Icon')}</li>
              <li>{this.createItem(wideImageItem, 'Wide')}</li>
              <li>{this.createItem(verticalImageItem, 'Vertical')}</li>
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
              <li>{this.createItem(videoSquareFileIdItem, 'Square + SD')}</li>
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
            <h2>External images</h2>
            <ButtonList>
              <li>
                {this.createItem(externalImageIdentifier, 'Atlassian logo')}
              </li>
            </ButtonList>
          </Group>
          <Group>
            <h2>Errors</h2>
            <ButtonList>
              <li>{this.createItem(unsupportedItem, 'Unsupported item')}</li>
              <li>{this.createItem(archiveItem, 'Archive has no preview')}</li>
              <li>
                {this.createItem(
                  videoProcessingFailedItem,
                  'Failed processing',
                )}
              </li>
              <li>{this.createItem(emptyImage, 'Empty File (version: 0)')}</li>
            </ButtonList>
          </Group>
        </Container>
      </I18NWrapper>
    );
  }
}
