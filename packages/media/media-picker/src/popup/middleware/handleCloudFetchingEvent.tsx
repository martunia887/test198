import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';

import { Action, Dispatch, Store } from 'redux';
import { finalizeUpload } from '../actions/finalizeUpload';
import {
  HANDLE_CLOUD_FETCHING_EVENT,
  HandleCloudFetchingEventAction,
} from '../actions/handleCloudFetchingEvent';

import { State } from '../domain';

import {
  WsUploadEvents,
  RemoteUploadEndPayload,
  RemoteUploadFailPayload,
} from '../tools/websocket/upload/wsUploadEvents';
import { MediaFile } from '../../types';
import { sendUploadEvent } from '../actions/sendUploadEvent';

type CloudFetchingEventAction = HandleCloudFetchingEventAction<
  keyof WsUploadEvents
>;

const isCloudFetchingEventAction = (
  action: Action,
): action is CloudFetchingEventAction => {
  return action.type === HANDLE_CLOUD_FETCHING_EVENT;
};

const isRemoteUploadEndAction = (
  action: CloudFetchingEventAction,
): action is HandleCloudFetchingEventAction<'RemoteUploadEnd'> => {
  return action.event === 'RemoteUploadEnd';
};

const isRemoteUploadFailAction = (
  action: CloudFetchingEventAction,
): action is HandleCloudFetchingEventAction<'RemoteUploadFail'> => {
  return action.event === 'RemoteUploadFail';
};

export const handleCloudFetchingEvent = (store: Store<State>) => (
  next: Dispatch<State>,
) => (action: Action) => {
  // Handle cloud upload end
  const handleRemoteUploadEndMessage = (
    file: MediaFile,
    data: RemoteUploadEndPayload,
  ) => {
    const { uploadId, fileId } = data;
    const source = {
      id: fileId,
      collection: RECENTS_COLLECTION,
    };
    const uploadedFile = {
      ...file,
      id: fileId,
    };

    store.dispatch(finalizeUpload(uploadedFile, uploadId, source, file.id));
  };

  // Handle cloud upload fail
  const handleRemoteUploadFailMessage = (
    file: MediaFile,
    data: RemoteUploadFailPayload,
  ) => {
    store.dispatch(
      sendUploadEvent({
        event: {
          name: 'upload-error',
          data: {
            file,
            error: {
              fileId: data.uploadId,
              name: 'remote_upload_fail',
              description: data.description,
            },
          },
        },
        uploadId: data.uploadId,
      }),
    );
  };

  if (isCloudFetchingEventAction(action)) {
    if (isRemoteUploadEndAction(action)) {
      handleRemoteUploadEndMessage(action.file, action.payload);
    } else if (isRemoteUploadFailAction(action)) {
      handleRemoteUploadFailMessage(action.file, action.payload);
    }
  }

  return next(action);
};
