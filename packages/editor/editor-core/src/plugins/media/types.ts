import { MediaClientConfig } from '@atlaskit/media-core';
import { UploadParams } from '@atlaskit/media-picker';

export type MediaStateStatus =
  | 'unknown'
  | 'ready'
  | 'cancelled'
  | 'preview'
  | 'error'
  | 'mobile-upload-end';

export interface MediaState {
  id: string;
  status?: MediaStateStatus;
  fileName?: string;
  fileSize?: number;
  fileMimeType?: string;
  collection?: string;
  dimensions?: {
    width: number | undefined;
    height: number | undefined;
  };
  scaleFactor?: number;
  error?: {
    name: string;
    description: string;
  };
  /** still require to support Mobile */
  publicId?: string;
}

export interface MediaStateManager {
  getState(id: string): MediaState | undefined;
  newState(id: string, newState: Partial<MediaState>): MediaState;
  updateState(id: string, newState: Partial<MediaState>): MediaState;
  on(id: string, cb: (state: MediaState) => void);
  off(id: string, cb: (state: MediaState) => void): void;
  destroy(): void;
}

export interface FeatureFlags {}

export interface MediaProvider {
  uploadParams?: UploadParams;

  /**
   * A manager notifying subscribers on changes in Media states
   */
  stateManager?: MediaStateManager;

  /**
   * Used for displaying Media Cards and downloading files.
   * This is context config is required.
   */
  viewMediaClientConfig: MediaClientConfig;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   */
  uploadMediaClientConfig?: MediaClientConfig;

  /**
   * (optional) For any additional feature to be enabled
   */
  featureFlags?: FeatureFlags;
}

export type Listener = (data: any) => void;

export interface CustomMediaPicker {
  on(event: string, cb: Listener): void;
  removeAllListeners(event: any);
  emit(event: string, data: any): void;
  destroy(): void;
  setUploadParams(uploadParams: UploadParams);
}
