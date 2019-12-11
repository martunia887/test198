import * as React from 'react';
import { MediaClient, FileState } from '@atlaskit/media-client';
import { Outcome } from '../domain';
import {
  ArchiveWrapper,
  ArchiveItemViewer,
  CustomVideoPlayerWrapper,
  AudioPlayer,
  CustomAudioPlayerWrapper,
  DefaultCoverWrapper,
  blanketColor,
} from '../styled';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';
import { MediaViewerError } from '../error';
import { BaseViewer } from './base-viewer';
import { ZipiZape, ZipEntry, EntryContent } from 'zipizape';
import { InteractiveImg } from './image/interactive-img';
import { CustomMediaPlayer } from '@atlaskit/media-ui';
import { PDFRenderer } from './doc/pdfRenderer';
import { ArchiveSidebar } from './archive-sidebar';

export type Props = {
  mediaClient: MediaClient;
  item: FileState;
  collectionName?: string;
};

type Content = {
  entries: ZipEntry[];
  selectedEntryContent: EntryContent;
};

export class ArchiveViewer extends BaseViewer<Content, Props> {
  private previews: Map<string, string> = new Map();

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
      const entries = await zip.readFile(blob as File);
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
        <ArchiveSidebar
          entries={entries}
          onEntrySelected={this.changeSelectedEntry}
        />
        {this.renderArchiveItemViewer(selectedEntryContent)}
      </ArchiveWrapper>
    );
  }

  private renderArchiveItemViewer(selectedEntryContent: EntryContent) {
    let content: string | undefined;
    const currentPreview = this.previews.get(selectedEntryContent.name);

    if (currentPreview) {
      content = currentPreview;
    } else {
      const preview = selectedEntryContent.getPreview();
      content = preview ? preview.src : undefined;
      content && this.previews.set(selectedEntryContent.name, content);
    }

    if (!content) {
      return null;
    }

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
      case 'audio':
        return (
          <ArchiveItemViewer>{this.renderAudio(content)}</ArchiveItemViewer>
        );
      case 'doc':
        return (
          <ArchiveItemViewer>{this.renderDocument(content)}</ArchiveItemViewer>
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
    return (
      <CustomVideoPlayerWrapper data-testid="media-viewer-video-content">
        <CustomMediaPlayer type="video" isAutoPlay={false} src={content} />
      </CustomVideoPlayerWrapper>
    );
  }

  private renderAudio(content: string) {
    return (
      <AudioPlayer data-testid="media-viewer-audio-content">
        {this.renderCover()}
        <CustomAudioPlayerWrapper>
          <CustomMediaPlayer type="audio" isAutoPlay={false} src={content} />
        </CustomAudioPlayerWrapper>
      </AudioPlayer>
    );
  }

  private renderCover() {
    // For now, always use default cover
    return (
      <DefaultCoverWrapper>
        <AudioIcon label="cover" size="xlarge" primaryColor={blanketColor} />
      </DefaultCoverWrapper>
    );
  }

  private renderDocument(content: string) {
    return <PDFRenderer src={content} />;
  }
}
