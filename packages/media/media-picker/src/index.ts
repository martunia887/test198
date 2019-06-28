export { PopupUploadEventPayloadMap } from './components/types';

import {
  BrowserConfig,
  ClipboardConfig,
  DropzoneConfig,
  PopupConfig,
} from './components/types';

export { UploadEventEmitter } from './components/component';

// Events public API and types
export {
  UploadsStartEventPayload,
  UploadStatusUpdateEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadEndEventPayload,
  UploadErrorEventPayload,
  UploadEventPayloadMap,
  isImagePreview,
} from './domain/uploadEvent';

export { MediaFile } from './domain/file';
export { MediaProgress } from './domain/progress';
export { MediaError } from './domain/error';
export { ImagePreview, Preview, NonImagePreview } from './domain/preview';

export { UploadParams } from './domain/config';
export { BrowserConfig, PopupConfig, ClipboardConfig, DropzoneConfig };

// REACT COMPONENTS

export { PopupLoader as Popup } from './components/popup';
export { DropzoneLoader as Dropzone } from './components/dropzone';
export { ClipboardLoader as Clipboard } from './components/clipboard';
export { BrowserLoader as Browser } from './components/browser';
