import * as React from 'react';
import { Component, SyntheticEvent } from 'react';
import { first } from 'rxjs/operators/first';
import {
  genericFileId,
  audioFileId,
  errorFileId,
  gifFileId,
  externalImageIdentifier,
  defaultCollectionName,
  createUploadMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { CardEvent, CardAction } from '@atlaskit/media-card';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { Filmstrip, FilmstripItem } from '../src';
import { ExampleWrapper, FilmstripWrapper } from '../example-helpers/styled';
import {
  FileItem,
  UploadableFile,
  MediaClient,
  MediaItem,
  FileIdentifier,
} from '@atlaskit/media-client';
import { MediaClientConfigContext } from '@atlaskit/media-core';

export interface ExampleState {
  items: FilmstripItem[];
}

const mediaClientConfig = createUploadMediaClientConfig();

class Example extends Component<{}, ExampleState> {
  onCardClick = (result: CardEvent) => {
    const { items } = this.state;

    if (!result.mediaItemDetails) {
      return;
    }
    const selectedId = (result.mediaItemDetails as FileIdentifier).id;
    const currentItemIndex = this.getItemIndex(selectedId);

    if (currentItemIndex > -1) {
      const item = items[currentItemIndex];
      const newItem = {
        ...item,
        selected: !item.selected,
      };
      items[currentItemIndex] = newItem;

      this.setState({
        items,
      });
    }
  };

  getItemIndex = (id: string | Promise<string>): number => {
    const { items } = this.state;
    const item = items.find(
      item => (item.identifier as FileIdentifier).id === id,
    );

    if (item) {
      return items.indexOf(item);
    }

    return -1;
  };

  onClose = (item?: FileItem) => {
    if (!item) {
      return;
    }

    const { items } = this.state;
    const index = this.getItemIndex(item.details.id);

    if (index > -1) {
      items.splice(index, 1);
      this.setState({
        items,
      });
    }
  };

  cardProps: Partial<FilmstripItem> = {
    selectable: true,
    onClick: this.onCardClick,
    actions: [
      {
        handler: this.onClose,
        icon: <EditorCloseIcon label="close" />,
      },
    ],
  };

  state: ExampleState = {
    items: [
      {
        identifier: genericFileId,
        ...this.cardProps,
      },
      {
        identifier: externalImageIdentifier,
        ...this.cardProps,
      },
      {
        identifier: audioFileId,
        ...this.cardProps,
      },
      {
        identifier: errorFileId,
        ...this.cardProps,
      },
      {
        identifier: gifFileId,
        ...this.cardProps,
      },
    ],
  };

  createOnClickFromId = (id: string) => (event: any) => {
    this.onCardClick({
      event,
      mediaItemDetails: {
        id,
      },
    });
  };

  createActionsFromId = (id: string): CardAction[] => {
    const handler = () => {
      this.onClose({
        type: 'file',
        details: {
          id,
        },
      });
    };

    return [
      {
        handler,
        icon: <EditorCloseIcon label="close" />,
      },
    ];
  };

  uploadFile = async (event: SyntheticEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files || !event.currentTarget.files.length) {
      return;
    }

    const file = event.currentTarget.files[0];
    const uplodableFile: UploadableFile = {
      content: file,
      name: file.name,
      collection: defaultCollectionName,
    };
    const mediaClient = new MediaClient(mediaClientConfig);
    mediaClient.file
      .upload(uplodableFile)
      .pipe(first())
      .subscribe({
        next: state => {
          if (state.status === 'uploading') {
            const { id } = state;
            const { items } = this.state;
            const newItem: FilmstripItem = {
              ...this.cardProps,
              onClick: this.createOnClickFromId(id),
              actions: this.createActionsFromId(id),
              identifier: {
                id,
                mediaItemType: 'file',
                collectionName: defaultCollectionName,
              },
              selected: true,
            };

            this.setState({
              items: [newItem, ...items],
            });
          }
        },
        error(error) {
          console.log('subscription', error);
        },
      });
  };

  render() {
    const { items } = this.state;

    return (
      <MediaClientConfigContext.Provider value={mediaClientConfig}>
        <ExampleWrapper>
          <FilmstripWrapper>
            <Filmstrip items={items} />
          </FilmstripWrapper>
          <div>
            Upload file <input type="file" onChange={this.uploadFile} />
          </div>
        </ExampleWrapper>
      </MediaClientConfigContext.Provider>
    );
  }
}

export default () => <Example />;
