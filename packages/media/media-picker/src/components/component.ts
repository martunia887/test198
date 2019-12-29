import {
  MediaFile,
  Preview,
  UploadEventPayloadMap,
  MediaError,
} from '../types';
import { GenericEventEmitter } from '../util/eventEmitter';

export interface UploadEventEmitter {
  emitUploadsStart(files: MediaFile[]): void;
  emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
  emitUploadProcessing(file: MediaFile): void;
  emitUploadEnd(file: MediaFile): void;
  emitUploadError(file: MediaFile, error: MediaError): void;
}

export class UploadComponent<M extends UploadEventPayloadMap>
  extends GenericEventEmitter<M>
  implements UploadEventEmitter {
  emitUploadsStart(files: MediaFile[]): void {
    this.emit('uploads-start', {
      files,
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
