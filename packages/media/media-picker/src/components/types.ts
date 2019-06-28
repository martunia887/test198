import { AppProxyReactContext } from '../popup/components/app';
import { UploadParams, UploadEventPayloadMap } from '..';
import { UploadEventEmitter } from './component';

export interface LocalUploadConfig {
  uploadParams: UploadParams; // This is tenant upload params
  shouldCopyFileToRecents?: boolean;
}

export interface BrowserConfig extends LocalUploadConfig {
  readonly multiple?: boolean;
  readonly fileExtensions?: Array<string>;
}

export interface ClipboardConfig extends LocalUploadConfig {}

export interface PopupConfig extends LocalUploadConfig {
  readonly container?: HTMLElement;
  readonly proxyReactContext?: AppProxyReactContext;
  readonly singleSelect?: boolean;
}

export interface DropzoneConfig extends LocalUploadConfig {
  container?: HTMLElement;
  headless?: boolean;
  proxyReactContext?: AppProxyReactContext;
}

export interface DropzoneDragEnterEventPayload {
  length: number;
}

export interface DropzoneDragLeaveEventPayload {
  length: number;
}

export type DropzoneUploadEventPayloadMap = UploadEventPayloadMap & {
  readonly drop: undefined;
  readonly 'drag-enter': DropzoneDragEnterEventPayload;
  readonly 'drag-leave': DropzoneDragLeaveEventPayload;
};

export type PopupUploadEventPayloadMap = UploadEventPayloadMap & {
  readonly closed: undefined;
};
