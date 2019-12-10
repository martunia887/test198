import * as React from 'react';
import { MediaClient, FileState } from '@atlaskit/media-client';
import { Outcome } from '../domain';
import {
  ArchiveEntries,
  ArchiveWrapper,
  SelectedEntryWrapper,
} from '../styled';
import { MediaViewerError } from '../error';
import { BaseViewer } from './base-viewer';
import { ZipiZape, ZipEntry } from 'zipizape';

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
  selectedEntry: ZipEntry;
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
          selectedEntry: entries[0],
        }),
      });
    } else {
      // item.status is not 'processed'
    }
  }

  protected get initialState() {
    return {
      content: Outcome.pending<string, MediaViewerError>(),
    };
  }

  protected release() {
    return null;
  }

  protected renderSuccessful(content: Content) {
    const { entries, selectedEntry } = content;
    console.log({ selectedEntry });
    // TODO: handle empty entries
    const entriesContent = entries.map((entry, index) => {
      return (
        <div key={index} onClick={this.changeSelectedEntry(entries, entry)}>
          {entry.name}
        </div>
      );
    });

    return (
      <ArchiveWrapper>
        <ArchiveEntries>{entriesContent}</ArchiveEntries>
        <SelectedEntryWrapper></SelectedEntryWrapper>
      </ArchiveWrapper>
    );
  }

  private changeSelectedEntry = (
    entries: ZipEntry[],
    selectedEntry: ZipEntry,
  ) => () => {
    this.setState({
      content: Outcome.successful({
        entries,
        selectedEntry,
      }),
    });
  };
}
