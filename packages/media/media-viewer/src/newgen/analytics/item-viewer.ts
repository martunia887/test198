import { GasPayload } from '@atlaskit/analytics-gas-types';
import {
  ProcessedFileState,
  FileState,
  ProcessingFileState,
} from '@atlaskit/media-client';
import { packageAttributes, fileStateToFileGasPayload } from './index';

export type ViewerLoadPayload = {
  status: 'success' | 'error';
  errorMessage?: string;
};

export type AnalyticViewerProps = {
  onLoad: (payload: ViewerLoadPayload) => void;
};

export const mediaFileCommencedEvent = (id: string): GasPayload => {
  return {
    eventType: 'operational',
    action: 'commenced',
    actionSubject: 'mediaFile',
    actionSubjectId: id,
    attributes: {
      fileId: id,
      ...packageAttributes,
    },
  };
};

export const mediaFileLoadSucceededEvent = (
  file: ProcessedFileState,
): GasPayload => {
  return {
    eventType: 'operational',
    actionSubject: 'mediaFile',
    action: 'loadSucceeded',
    actionSubjectId: file.id,
    attributes: {
      status: 'success',
      ...fileStateToFileGasPayload(file),
      ...packageAttributes,
    },
  };
};

export const mediaFileLoadFailedEvent = (
  id: string,
  failReason: string,
  file?: ProcessedFileState,
): GasPayload => {
  const fileAttributes = file
    ? fileStateToFileGasPayload(file)
    : {
        fileId: id,
      };
  return {
    eventType: 'operational',
    actionSubject: 'mediaFile',
    action: 'loadFailed',
    actionSubjectId: id,
    attributes: {
      status: 'fail',
      ...fileAttributes,
      failReason,
      ...packageAttributes,
    },
  };
};

export const mediaPreviewFailedEvent = (
  failReason: string,
  fileState?: FileState,
): GasPayload => {
  const fileId = fileState ? fileState.id : undefined;
  const fileAttributes = fileState && fileStateToFileGasPayload(fileState);

  // related to MS-2519 where files interupted during upload become empty/corrupted, with no artifacts or metadata.
  // This should ideally be solved by the back-end (in terms of flagging the metadata with this state).
  // For now, we detect it here and adjust the analytics data so we can segment these from genuinely unsupported file types.

  return {
    eventType: 'operational',
    actionSubject: 'mediaFile',
    action: 'previewFailed',
    actionSubjectId: fileId,
    attributes: {
      status: 'fail',
      ...fileAttributes,
      failReason:
        failReason === 'unsupported' && isEmptyFile(fileState)
          ? 'empty'
          : failReason,
      ...packageAttributes,
    },
  };
};

export const isEmptyFile = (fileState?: FileState) => {
  if (fileState && fileState.status === 'processing') {
    const {
      artifacts,
      mediaType,
      mimeType,
      name,
      representations,
      size,
    } = fileState;
    return !(
      artifacts ||
      mediaType ||
      mimeType ||
      name ||
      representations ||
      size
    );
  }
  return false;
};
