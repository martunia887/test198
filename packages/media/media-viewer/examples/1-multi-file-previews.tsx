import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import Button from '@atlaskit/button';
import AkSpinner from '@atlaskit/spinner';
import {
  createStorybookContext,
  externalImageIdentifier,
  externalSmallImageIdentifier,
} from '@atlaskit/media-test-helpers';
import { ButtonList, Container, Group } from '../example-helpers/styled';
import {
  docIdentifier,
  largePdfIdentifier,
  imageIdentifier,
  imageIdentifier2,
  unsupportedIdentifier,
  videoHorizontalFileItem,
  videoIdentifier,
  wideImageIdentifier,
  defaultCollectionName,
  audioItem,
  audioItemNoCover,
} from '../example-helpers';
import { MediaViewer } from '../src';
import { videoFileId } from '@atlaskit/media-test-helpers';
import { MediaViewerDataSource } from '..';
import {
  AnalyticsListener,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next';
import { I18NWrapper } from '@atlaskit/media-test-helpers';
import { Identifier, FileIdentifier } from '@atlaskit/media-core';
import { Card } from '@atlaskit/media-card';

const context = createStorybookContext();

const handleEvent = (analyticsEvent: UIAnalyticsEventInterface) => {
  const { payload } = analyticsEvent;
  console.log('EVENT:', payload);
};

export type State = {
  selected?: {
    dataSource: MediaViewerDataSource;
    identifier: Identifier;
  };
  firstCollectionItem?: Identifier;
};

export default class Example extends React.Component<{}, State> {
  state: State = {};
  private subscription?: Subscription;

  componentDidMount() {
    this.subscription = context.collection
      .getItems(defaultCollectionName, { limit: 1 })
      .subscribe({
        next: items => {
          const firstItem = items[0];
          if (firstItem) {
            this.setState({
              firstCollectionItem: {
                id: firstItem.id,
                mediaItemType: 'file',
                occurrenceKey: firstItem.occurrenceKey,
              },
            });
          } else {
            console.error('No items found in the collection');
          }
        },
      });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private openList = () => {
    this.setState({
      selected: {
        dataSource: {
          list: [
            externalImageIdentifier,
            imageIdentifier,
            videoIdentifier,
            externalSmallImageIdentifier,
            videoHorizontalFileItem,
            wideImageIdentifier,
            audioItem,
            audioItemNoCover,
            docIdentifier,
            largePdfIdentifier,
            imageIdentifier2,
            unsupportedIdentifier,
          ],
        },
        identifier: imageIdentifier,
      },
    });
  };

  private openListWithItemNotOnList = () => {
    this.setState({
      selected: {
        dataSource: {
          list: [
            imageIdentifier,
            videoIdentifier,
            videoHorizontalFileItem,
            wideImageIdentifier,
            audioItem,
            audioItemNoCover,
            largePdfIdentifier,
            imageIdentifier2,
            unsupportedIdentifier,
          ],
        },
        identifier: docIdentifier,
      },
    });
  };

  private openErrorList = () => {
    const invalidItem: Identifier = {
      mediaItemType: 'file',
      id: 'invalid-id',
      occurrenceKey: 'invalid-key',
    };

    this.setState({
      selected: {
        dataSource: {
          list: [
            imageIdentifier,
            invalidItem,
            wideImageIdentifier,
            videoIdentifier,
            videoHorizontalFileItem,
            audioItem,
            audioItemNoCover,
            docIdentifier,
            largePdfIdentifier,
            imageIdentifier2,
            unsupportedIdentifier,
          ],
        },
        identifier: imageIdentifier,
      },
    });
  };

  private openCollection = () => {
    const { firstCollectionItem } = this.state;
    if (!firstCollectionItem) {
      return;
    }
    this.setState({
      selected: {
        dataSource: { collectionName: defaultCollectionName },
        identifier: firstCollectionItem,
      },
    });
  };

  private openNotFound = () => {
    this.setState({
      selected: {
        dataSource: { list: [imageIdentifier, wideImageIdentifier] },
        identifier: {
          mediaItemType: 'file',
          id: videoFileId.id,
          occurrenceKey: 'testOccurrenceKey',
        },
      },
    });
  };

  private openInvalidId = () => {
    const invalidItem: Identifier = {
      mediaItemType: 'file',
      id: 'invalid-id',
      occurrenceKey: 'invalid-key',
    };

    this.setState({
      selected: {
        identifier: invalidItem,
        dataSource: { list: [invalidItem] },
      },
    });
  };

  private openInvalidCollection = () => {
    this.setState({
      selected: {
        identifier: imageIdentifier,
        dataSource: { collectionName: 'invalid-name' },
      },
    });
  };

  private onClose = () => {
    this.setState({ selected: undefined });
  };

  render() {
    return (
      <I18NWrapper>
        <Container>
          <Group>
            <h2>File lists</h2>
            <ButtonList>
              <li>
                <Button onClick={this.openList}>Small list</Button>
              </li>
              <li>
                <Button onClick={this.openListWithItemNotOnList}>
                  Small list with selected item not on the list
                </Button>
              </li>
            </ButtonList>
          </Group>

          <Group>
            <h2>Collection names</h2>
            <ButtonList>
              <li>
                {this.state.firstCollectionItem ? (
                  <Card
                    context={context}
                    identifier={{
                      collectionName: defaultCollectionName,
                      id: (this.state.firstCollectionItem as FileIdentifier).id,
                      mediaItemType: 'file',
                    }}
                    onClick={this.openCollection}
                  />
                ) : (
                  <AkSpinner />
                )}
              </li>
            </ButtonList>
          </Group>

          <Group>
            <h2>Errors</h2>
            <ButtonList>
              <li>
                <Button onClick={this.openNotFound}>
                  Selected item not found
                </Button>
              </li>
              <li>
                <Button onClick={this.openInvalidId}>Invalid ID</Button>
              </li>
              <li>
                <Button onClick={this.openInvalidCollection}>
                  Invalid collection name
                </Button>
              </li>
              <li>
                <Button onClick={this.openErrorList}>Error list</Button>
              </li>
            </ButtonList>
          </Group>

          {this.state.selected && (
            <AnalyticsListener channel="media" onEvent={handleEvent}>
              <MediaViewer
                context={context}
                selectedItem={this.state.selected.identifier}
                dataSource={this.state.selected.dataSource}
                collectionName={defaultCollectionName}
                onClose={this.onClose}
                pageSize={5}
              />
            </AnalyticsListener>
          )}
        </Container>
      </I18NWrapper>
    );
  }
}
