import * as React from 'react';
import { MediaClient, FileState } from '@atlaskit/media-client';
import { Outcome } from '../domain';
import {
  ArchiveEntries,
  ArchiveWrapper,
  SelectedEntryWrapper,
  CustomVideoPlayerWrapper,
} from '../styled';
import { MediaViewerError } from '../error';
import { BaseViewer } from './base-viewer';
import { ZipiZape, ZipEntry, EntryContent } from 'zipizape';
import { InteractiveImg } from './image/interactive-img';
import { CustomMediaPlayer } from '../../../../media-ui/src/customMediaPlayer';

export type Props = {
  mediaClient: MediaClient;
  item: FileState;
  collectionName?: string;
  onClose?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
};

type Content = {
  entries: ZipEntry[];
  selectedEntryContent: EntryContent;
};

export class ArchiveViewer extends BaseViewer<Content, Props> {
  protected async init() {
    const { item, collectionName, mediaClient } = this.props;
    if (item.status === 'processed') {
      const url = await mediaClient.file.getFileBinaryURL(
        item.id,
        collectionName,
      );
      const response = await fetch(url);
      const blob = await response.blob();

      const zip = new ZipiZape();
      const entries = await zip.readFile(blob);
      this.setState({
        content: Outcome.successful({
          entries,
          selectedEntryContent: await entries[0].getContent(), // TODO handle undefined
        }),
      });
    } else {
      // item.status is not 'processed'
    }
  }

  protected get initialState() {
    return {
      content: Outcome.pending<Content, MediaViewerError>(),
    };
  }

  protected release() {
    return null; // TODO
  }

  protected renderSuccessful(content: Content) {
    const { entries, selectedEntryContent } = content;
    // TODO: handle empty entries
    const entriesContent = entries.map((entry, index) => {
      return (
        <div key={index} onClick={this.changeSelectedEntry(entries, entry)}>
          {entry.name}
        </div>
      );
    });

    console.log({ entriesContent });

    const selectedEntryViewer = this.renderEntryViewer(selectedEntryContent);

    return (
      <ArchiveWrapper>
        <ArchiveEntries>{entriesContent}</ArchiveEntries>
        <SelectedEntryWrapper>{selectedEntryViewer}</SelectedEntryWrapper>
      </ArchiveWrapper>
    );
  }

  private changeSelectedEntry = (
    entries: ZipEntry[],
    selectedEntry: ZipEntry,
  ) => async () => {
    const selectedEntryContent = await selectedEntry.getContent();
    this.setState({
      content: Outcome.successful({
        entries,
        selectedEntryContent: selectedEntryContent,
      }),
    });
  };

  private renderEntryViewer(entryContent: EntryContent) {
    const content = entryContent.getPreview()!.src;
    switch (entryContent.type) {
      case 'image':
        return <InteractiveImg src={content} />;
      case 'video':
        return (
          <CustomVideoPlayerWrapper data-testid="media-viewer-video-content">
            <CustomMediaPlayer
              type="video"
              // isAutoPlay={isAutoPlay}
              // onHDToggleClick={this.onHDChange}
              // showControls={showControls}
              src={content}
              // isHDActive={isHDActive}
              // isHDAvailable={isHDAvailable(item)}
              // isShortcutEnabled={true}
              // onCanPlay={onCanPlay}
              // onFirstPlay={this.onFirstPlay}
              // onError={onError}
            />
          </CustomVideoPlayerWrapper>
        );
      default:
        return null;
    }
  }
}
