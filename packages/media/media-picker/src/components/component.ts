import {
  MediaFile,
  Preview,
  MediaError,
  MediaProgress,
  UploadEventPayloadMap,
} from '../types';
import { GenericEventEmitter } from '../util/eventEmitter';
import { SelectedItem } from '../popup/domain';
import { PluginItemPayload } from '../domain/plugin';

export interface UploadEventEmitter {
  emitPluginItemsInserted(selectedPluginItems: SelectedItem[]): void;
  emitUploadsStart(files: MediaFile[]): void;
  emitUploadProgress(file: MediaFile, progress: MediaProgress): void;
  emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
  emitUploadProcessing(file: MediaFile): void;
  emitUploadEnd(file: MediaFile): void;
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

  emitUploadEnd(file: MediaFile): void {
    this.emit('upload-end', { file });
  }

  emitUploadError(file: MediaFile, error: MediaError): void {
    this.emit('upload-error', {
      file: file,
      error: error,
    });
  }
}
