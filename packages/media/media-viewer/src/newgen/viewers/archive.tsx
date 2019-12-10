import * as React from 'react';
import { MediaClient, FileState } from '@atlaskit/media-client';
import { Outcome } from '../domain';
import {
  ArchiveSideBar,
  ArchiveWrapper,
  ArchiveItemViewer,
  CustomVideoPlayerWrapper,
} from '../styled';
import { MediaViewerError, ErrorName, ErrorMessage } from '../error';
import { BaseViewer } from './base-viewer';
import { ZipiZape, ZipEntry, EntryContent } from 'zipizape';
import { InteractiveImg } from './image/interactive-img';
import { CustomMediaPlayer } from '../../../../media-ui/src/customMediaPlayer';
import { JSXElement } from '@babel/types';
import { FormattedMessage } from 'react-intl';

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

    return (
      <ArchiveWrapper>
        {this.renderArchiveSideBar(entries)}
        {this.renderArchiveItemViewer(selectedEntryContent)}
      </ArchiveWrapper>
    );
  }

  private renderArchiveSideBar(entries: ZipEntry[]) {
    const entriesContent = entries.map((entry, index) => {
      return (
        <div key={index} onClick={this.changeSelectedEntry(entries, entry)}>
          {entry.name}
        </div>
      );
    });

    return <ArchiveSideBar>{entriesContent}</ArchiveSideBar>;
  }

  private renderArchiveItemViewer(selectedEntryContent: EntryContent) {
    const content = selectedEntryContent.getPreview()!.src; // TODO don't do this?
    console.log({ content });
    switch (selectedEntryContent.type) {
      case 'image':
        return (
          <ArchiveItemViewer>
            {this.renderExternalImage(content)}
          </ArchiveItemViewer>
        );
      case 'video':
        return (
          <ArchiveItemViewer>{this.renderVideo(content)}</ArchiveItemViewer>
        );
      default:
        return (
          <ArchiveItemViewer>
            <h1>UNSUPPORTED</h1>
          </ArchiveItemViewer>
        );
    }
  }

  private changeSelectedEntry = (
    entries: ZipEntry[],
    selectedEntry: ZipEntry,
  ) => async () => {
    const selectedEntryContent = await selectedEntry.getContent();
    console.log({ selectedEntryContent });
    this.setState({
      content: Outcome.successful({
        entries,
        selectedEntryContent: selectedEntryContent,
      }),
    });
  };

  private renderExternalImage(content: string) {
    return <InteractiveImg src={content} />;
  }

  private renderVideo(content: string) {
    return <h1>VIDEO UNSUPPORTED</h1>;
  }
}
