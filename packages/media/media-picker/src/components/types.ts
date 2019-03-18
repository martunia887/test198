import { ReactNode } from 'react';
import { InjectedIntl } from 'react-intl';
import { Context } from '@atlaskit/media-core';
import { LocalUploadComponent } from './localUpload';
import { AppProxyReactContext } from '../popup/components/app';
import { Dropzone, UploadEventPayloadMap, UploadParams } from '..';
import { UploadComponent, UploadEventEmitter } from './component';
import { EventEmitter } from '../util/eventEmitter';
import { ServiceFile, ServiceName } from 'src/popup/domain';

export interface LocalUploadConfig {
  uploadParams: UploadParams; // This is tenant upload params
  shouldCopyFileToRecents?: boolean;
}

export interface LocalUploadComponent<
  M extends UploadEventPayloadMap = UploadEventPayloadMap
> extends UploadComponent<M> {
  cancel(uniqueIdentifier?: string): void;
  setUploadParams(uploadParams: UploadParams): void;
}

export type BinaryConfig = LocalUploadConfig;

export interface BinaryUploaderConstructor {
  new (context: Context, config: BinaryConfig): BinaryUploader;
}

export interface BinaryUploader extends LocalUploadComponent {
  upload(base64: string, name: string): void;
}

export interface BrowserConfig extends LocalUploadConfig {
  readonly multiple?: boolean;
  readonly fileExtensions?: Array<string>;
}

export interface BrowserConstructor {
  new (context: Context, browserConfig: BrowserConfig): Browser;
}

export interface Browser extends LocalUploadComponent {
  browse(): void;
  teardown(): void;
}

export interface ClipboardConfig extends LocalUploadConfig {}

export interface ClipboardConstructor {
  new (context: Context, clipboardConfig: ClipboardConfig): Clipboard;
}
export interface Clipboard extends LocalUploadComponent {
  activate(): Promise<void>;
  deactivate(): void;
}
export interface PopupPluginActions {
  fileClick: (serviceFile: ServiceFile, serviceName: ServiceName) => void;
}
export interface PopupPlugin {
  name: string;
  icon: ReactNode;
  render: (actions: PopupPluginActions) => ReactNode;
}

export interface PopupConfig extends LocalUploadConfig {
  readonly container?: HTMLElement;
  readonly proxyReactContext?: AppProxyReactContext;
  readonly singleSelect?: boolean;
  readonly plugins?: PopupPlugin[];
}

export interface PopupConstructor {
  new (context: Context, config: PopupConfig): Popup;
}

export type PopupUploadEventPayloadMap = UploadEventPayloadMap & {
  readonly closed: undefined;
};

export interface PopupUploadEventEmitter extends UploadEventEmitter {
  emitClosed(): void;
}
export interface Popup
  extends UploadEventEmitter,
    EventEmitter<PopupUploadEventPayloadMap> {
  show(): Promise<void>;
  cancel(uniqueIdentifier?: string | Promise<string>): Promise<void>;
  teardown(): void;
  hide(): void;
  setUploadParams(uploadParams: UploadParams): void;
  emitClosed(): void;
}

export interface DropzoneReactContext {
  intl?: InjectedIntl;
}
export interface DropzoneConfig extends LocalUploadConfig {
  container?: HTMLElement;
  headless?: boolean;
  proxyReactContext?: DropzoneReactContext;
}

export interface DropzoneConstructor {
  new (context: Context, dropzoneConfig: DropzoneConfig): Dropzone;
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

export interface Dropzone
  extends LocalUploadComponent<DropzoneUploadEventPayloadMap> {
  activate(): Promise<void>;
  deactivate(): void;
}
