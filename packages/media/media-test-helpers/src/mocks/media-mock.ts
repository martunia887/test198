import { Server } from 'kakapo';
import * as exenv from 'exenv';
import uuid from 'uuid/v4';

import { MediaFile, MediaType } from '@atlaskit/media-client';

import { createApiRouter, createMediaPlaygroundRouter } from './routers';
import { createDatabase } from './database';
import { mapDataUriToBlob } from '../utils';

export type MockCollections = {
  [key: string]: Array<MediaFile & { blob?: Blob }>;
};
export class MediaMock {
  private server = new Server();

  constructor(readonly collections?: MockCollections) {}

  enable(): void {
    if (!exenv.canUseDOM) {
      return;
    }

    this.server.use(createDatabase(this.collections));
    this.server.use(createMediaPlaygroundRouter());
    this.server.use(createApiRouter());
  }

  disable(): void {
    // TODO: add teardown logic to kakapo server
    /* eslint-disable no-console */
    console.warn('Disabling logic is not implemented in MediaMock');
  }
}

export type MockFileInputParams = Partial<MediaFile> & { dataUri?: string };
export type MockFile = MediaFile & { blob?: Blob };

export function generateFilesFromTestData(
  files: MockFileInputParams[],
): MockFile[] {
  return files.map(file => {
    const {
      processingStatus = 'succeeded',
      dataUri,
      id = uuid(),
      name = `test-file-${id}`,
    } = file;
    const blob =
      dataUri && dataUri !== '' ? mapDataUriToBlob(dataUri) : undefined;

    return {
      id,
      blob,
      mimeType: (blob && blob.type) || 'inode/empty',
      mediaType: 'image' as MediaType,
      name,
      size: (blob && blob.size) || 0,
      artifacts: {},
      processingStatus,
      representations:
        processingStatus === 'succeeded'
          ? {
              image: {},
            }
          : {},
    };
  });
}

export const mediaMock = new MediaMock();
