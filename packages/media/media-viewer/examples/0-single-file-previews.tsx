import * as React from 'react';
import {
  createStorybookContext,
  externalImageIdentifier,
} from '@atlaskit/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import { Identifier } from '@atlaskit/media-core';
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
  videoSquareFileIdItem,
} from '../example-helpers';
import { MediaViewer } from '../src';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { I18NWrapper } from '@atlaskit/media-test-helpers';
const context = createStorybookContext();

const handleEvent = (/*analyticsEvent: UIAnalyticsEventInterface*/) => {
  // instrument here...
};

export type State = {
  selectedIdentifier?: Identifier;
};

export default class Example extends React.Component<{}, State> {
  state: State = { selectedIdentifier: undefined };

  setItem = (selectedIdentifier: Identifier) => () => {
    this.setState({ selectedIdentifier });
  };

  createItem = (identifier: Identifier, title: string) => {
    const onClick = this.setItem(identifier);

    return (
      <div>
        <h4>{title}</h4>
        <Card identifier={identifier} context={context} onClick={onClick} />
      </div>
    );
  };

  render() {
    const { selectedIdentifier } = this.state;

    return (
      <I18NWrapper>
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
            </ButtonList>
          </Group>
          {selectedIdentifier && (
            <AnalyticsListener channel="media" onEvent={handleEvent}>
              <MediaViewer
                context={context}
                selectedItem={selectedIdentifier}
                dataSource={{ list: [selectedIdentifier] }}
                collectionName={defaultCollectionName}
                onClose={() => this.setState({ selectedIdentifier: undefined })}
              />
            </AnalyticsListener>
          )}
        </Container>
      </I18NWrapper>
    );
  }
}
