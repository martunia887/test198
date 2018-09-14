import { Preview } from '../../../domain/preview';

export interface WsErrorData {
  type: 'Error';
  error: 'ServerError' | 'RemoteUploadFail' | 'NoUserFound';
  reason: string;
}

export interface WsServerErrorData extends WsErrorData {
  error: 'ServerError';
}

export interface WsNoUserFoundData extends WsErrorData {
  error: 'NoUserFound';
}

export interface WsUploadMessageData {
  type:
    | 'RemoteUploadStart'
    | 'RemoteUploadProgress'
    | 'RemoteUploadEnd'
    | 'NotifyMetadata'
    | 'Error';
  uploadId: string;
  // Alternative backend schema for error activities
  // Will be removed after backend unifies response schema
  data?: {
    uploadId: string;
  };
}

export interface WsRemoteUploadFailData
  extends WsUploadMessageData,
    WsErrorData {
  type: 'Error';
  error: 'RemoteUploadFail';
  // Alternative backend schema for error activities
  // Will be removed after backend unifies response schema
  data?: {
    reason: string;
    uploadId: string;
  };
}

export interface WsRemoteUploadStartData extends WsUploadMessageData {
  type: 'RemoteUploadStart';
}

export interface WsRemoteUploadProgressData extends WsUploadMessageData {
  type: 'RemoteUploadProgress';
  currentAmount: number;
  totalAmount: number;
}

export interface WsRemoteUploadEndData extends WsUploadMessageData {
  type: 'RemoteUploadEnd';
  fileId: string;
}

// TODO: use types from media-store
export type FetchFileArtifactMetadata = {
  url?: string;
  width?: number;
  height?: number;
  size?: number;
};

export interface WsMetadata {
  pending: boolean;
  preview?: FetchFileArtifactMetadata;
  original?: FetchFileArtifactMetadata;
}

export interface WsNotifyMetadata extends WsUploadMessageData {
  type: 'NotifyMetadata';
  metadata: WsMetadata;
}

export type WsMessageData = WsUploadMessageData | WsErrorData;

export const isRemoteUploadStartData = (
  data: WsMessageData,
): data is WsRemoteUploadStartData => {
  return data && data.type === 'RemoteUploadStart';
};

export const isRemoteUploadProgressData = (
  data: WsUploadMessageData,
): data is WsRemoteUploadProgressData => {
  return data.type === 'RemoteUploadProgress';
};

export const isRemoteUploadEndData = (
  data: WsUploadMessageData,
): data is WsRemoteUploadEndData => {
  return data.type === 'RemoteUploadEnd';
};

const isErrorData = (data: WsMessageData): data is WsErrorData => {
  return data.type === 'Error';
};

export const isRemoteUploadErrorData = (
  data: WsUploadMessageData,
): data is WsRemoteUploadFailData => {
  return isErrorData(data) && data.error === 'RemoteUploadFail';
};

export const isNotifyMetadata = (
  data: WsUploadMessageData,
): data is WsNotifyMetadata => {
  return data.type === 'NotifyMetadata';
};

export const isServerError = (
  data: WsMessageData,
): data is WsServerErrorData => {
  return isErrorData(data) && data.error === 'ServerError';
};

export const isNoUserFound = (
  data: WsMessageData,
): data is WsNoUserFoundData => {
  return isErrorData(data) && data.error === 'NoUserFound';
};

// TODO: investigate if we can just rely on ws dimensions or should we keep previous logic
export const getPreviewFromPayload = (payload: WsNotifyMetadata): Preview => {
  const { metadata } = payload;

  if (!metadata.original) {
    return {
      dimensions: {
        width: 0,
        height: 0,
      },
      src: '',
    };
  }

  return {
    dimensions: {
      width: metadata.original.width,
      height: metadata.original.height,
    },
    src: metadata.original.url || '',
  };
};
