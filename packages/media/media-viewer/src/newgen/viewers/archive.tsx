import * as React from 'react';
import {
  MediaClient,
  FileState,
  Identifier,
  isFileIdentifier,
} from '@atlaskit/media-client';
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

export type Props = {
  mediaClient: MediaClient;
  item: FileState;
  selectedEntryContent?: EntryContent;
  collectionName?: string;
};

type Content = {
  selectedEntryContent: EntryContent;
};

export const getArchiveEntriesFromIdentifier = async (
  identifier: Identifier,
  mediaClient: MediaClient,
): Promise<ZipEntry[]> => {
  if (!isFileIdentifier(identifier)) {
    return [];
  }

  const { id, collectionName } = identifier;
  const url = await mediaClient.file.getFileBinaryURL(await id, collectionName);
  const response = await fetch(url);
  const blob = await response.blob();

  const zip = new ZipiZape();
  const entries = await zip.readFile(blob as File);

  return entries;
};

export class ArchiveViewer extends BaseViewer<Content, Props> {
  private previews: Map<string, string> = new Map();

  protected async init() {
    const { selectedEntryContent } = this.props;
    const content = !selectedEntryContent
      ? Outcome.pending<Content, MediaViewerError>()
      : Outcome.successful<Content, MediaViewerError>({
          selectedEntryContent,
        });

    this.setState({
      content,
    });
  }

  protected get initialState() {
    const { selectedEntryContent } = this.props;
    if (!selectedEntryContent) {
      return {
        content: Outcome.pending<Content, MediaViewerError>(),
      };
    }

    return {
      content: Outcome.successful<Content, MediaViewerError>({
        selectedEntryContent,
      }),
    };
  }

  protected release() {
    return null; // TODO
  }

  protected renderSuccessful() {
    const { selectedEntryContent } = this.props;
    if (!selectedEntryContent) {
      return null;
    }

    return (
      <ArchiveWrapper>
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

  private renderExternalImage(content: string) {
    return <InteractiveImg src={content} />;
  }

  protected needsReset(propsA: Props, propsB: Props): boolean {
    if (propsA.selectedEntryContent !== propsB.selectedEntryContent) {
      return true;
    }

    return false;
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
