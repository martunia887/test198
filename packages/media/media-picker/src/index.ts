export {
  DropzoneUploadEventPayloadMap,
  PopupUploadEventPayloadMap,
} from './components/types';

import {
  Browser,
  BrowserConfig,
  BrowserConstructor,
  ClipboardConfig,
  Popup,
  PopupConfig,
  PopupConstructor,
  DropzoneConfig,
  DropzoneConstructor,
  Dropzone,
} from './components/types';

import { Context, MediaClientConfig } from '@atlaskit/media-core';

export const isBrowser = (component: any): component is Browser =>
  component && 'browse' in component && 'teardown' in component;
export const isDropzone = (component: any): component is Dropzone =>
  component && 'activate' in component && 'deactivate' in component;
export const isPopup = (component: any): component is Popup =>
  component &&
  ['show', 'cancel', 'teardown', 'hide'].every(
    (prop: string) => prop in component,
  );

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

// Constructor public API and types
export interface MediaPickerConstructors {
  browser: BrowserConstructor;
  dropzone: DropzoneConstructor;
  popup: PopupConstructor;
}

export { Browser, Dropzone, Popup };
export type MediaPickerComponent = Browser | Dropzone | Popup;

export interface MediaPickerComponents {
  browser: Browser;
  dropzone: Dropzone;
  popup: Popup;
}

export { UploadParams } from './domain/config';

export { BrowserConfig, DropzoneConfig, PopupConfig, ClipboardConfig };
export interface ComponentConfigs {
  browser: BrowserConfig;
  dropzone: DropzoneConfig;
  popup: PopupConfig;
}

export { BrowserConstructor, DropzoneConstructor, PopupConstructor };

function isContext(
  contextOrMediaClientConfig: Context | MediaClientConfig,
): contextOrMediaClientConfig is Context {
  return !!(contextOrMediaClientConfig as Context).collection;
}

export async function MediaPicker<K extends keyof MediaPickerComponents>(
  componentName: K,
  contextOrMediaClientConfig: Context | MediaClientConfig,
  pickerConfig?: ComponentConfigs[K],
): Promise<MediaPickerComponents[K]> {
  switch (componentName) {
    case 'browser': {
      const [{ BrowserImpl }, { getMediaClient }] = await Promise.all([
        import(/* webpackChunkName:"@atlaskit-internal_media-picker-browser" */ './components/browser'),
        import(/* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
      ]);

      const contextOrMediaClientConfigObject = isContext(
        contextOrMediaClientConfig,
      )
        ? { context: contextOrMediaClientConfig }
        : { mediaClientConfig: contextOrMediaClientConfig };
      const mediaClient = getMediaClient(contextOrMediaClientConfigObject);

      return new BrowserImpl(mediaClient, pickerConfig as
        | BrowserConfig
        | undefined);
    }
    case 'dropzone': {
      const [{ DropzoneImpl }, { getMediaClient }] = await Promise.all([
        import(/* webpackChunkName:"@atlaskit-internal_media-picker-dropzone" */ './components/dropzone'),
        import(/* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
      ]);

      const contextOrMediaClientConfigObject = isContext(
        contextOrMediaClientConfig,
      )
        ? { context: contextOrMediaClientConfig }
        : { mediaClientConfig: contextOrMediaClientConfig };

      const mediaClient = getMediaClient(contextOrMediaClientConfigObject);

      return new DropzoneImpl(mediaClient, pickerConfig as
        | DropzoneConfig
        | undefined);
    }
    case 'popup': {
      const [{ PopupImpl }, { getMediaClient }] = await Promise.all([
        import(/* webpackChunkName:"@atlaskit-internal_media-picker-popup" */ './components/popup'),
        import(/* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
      ]);

      const contextOrMediaClientConfigObject = isContext(
        contextOrMediaClientConfig,
      )
        ? { context: contextOrMediaClientConfig }
        : { mediaClientConfig: contextOrMediaClientConfig };

      const mediaClient = getMediaClient(contextOrMediaClientConfigObject);

      return new PopupImpl(mediaClient, pickerConfig as PopupConfig);
    }
    default:
      throw new Error(`The component ${componentName} does not exist`);
  }
}

// REACT COMPONENTS

export { ClipboardLoader as Clipboard } from './components/clipboard';
