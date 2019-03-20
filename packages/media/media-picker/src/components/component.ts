import { MediaFile as MediaStoreMediaFile } from '@atlaskit/media-store';
import { MediaFile } from '../domain/file';
import { MediaProgress } from '../domain/progress';
import { MediaError } from '../domain/error';
import { Preview } from '../domain/preview';

import { GenericEventEmitter } from '../util/eventEmitter';
import { UploadEventPayloadMap } from '../domain/uploadEvent';
import { SelectedItem } from '../popup/domain';
import { PluginItemPayload } from '../domain/plugin';

export interface UploadEventEmitter {
  emitPluginItemsInserted(selectedPluginItems: SelectedItem[]): void;
  emitUploadsStart(files: MediaFile[]): void;
  emitUploadProgress(file: MediaFile, progress: MediaProgress): void;
  emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
  emitUploadProcessing(file: MediaFile): void;
  emitUploadEnd(
    file: MediaFile,
    fileDetails: Partial<MediaStoreMediaFile>,
  ): void;
  emitUploadError(file: MediaFile, error: MediaError): void;
}

export class UploadComponent<M extends UploadEventPayloadMap>
  extends GenericEventEmitter<M>
  implements UploadEventEmitter {
  emitPluginItemsInserted(selectedPluginItems: SelectedItem[]): void {
    const payload: PluginItemPayload[] = selectedPluginItems.map(item => {
      return {
        pluginName: item.serviceName,
        pluginFile: {
          id: item.id,
          metadata: item.metadata,
        },
      };
    });

    this.emit('plugin-items-inserted', payload);
  }

  emitUploadsStart(files: MediaFile[]): void {
    this.emit('uploads-start', {
      files,
    });
  }

  emitUploadProgress(file: MediaFile, progress: MediaProgress): void {
    this.emit('upload-status-update', {
      file,
      progress,
    });
  }

  emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void {
    this.emit('upload-preview-update', {
      file,
      preview,
    });
  }

  emitUploadProcessing(file: MediaFile): void {
    this.emit('upload-processing', { file });
  }

  emitUploadEnd(
    file: MediaFile,
    fileDetails: Partial<MediaStoreMediaFile>,
  ): void {
    this.emit('upload-end', { file, public: fileDetails });
  }

  emitUploadError(file: MediaFile, error: MediaError): void {
    this.emit('upload-error', {
      file: file,
      error: error,
    });
  }
}
