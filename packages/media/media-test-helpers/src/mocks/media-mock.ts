import { MediaFile, MediaType } from '@atlaskit/media-client';
import * as exenv from 'exenv';
import { Server, Router, Database } from 'kakapo';
import uuid from 'uuid/v4';

import { mapDataUriToBlob } from '../utils';

import { createDatabase, MediaDatabaseSchema } from './database';
import { createApiRouter, createMediaPlaygroundRouter } from './routers';

export type MockCollections = {
  [key: string]: Array<MediaFile & { blob: Blob }>;
};

export interface MediaMockConfig {
  isSlowServer?: boolean;
}

export class MediaMock {
  private server = new Server<MediaDatabaseSchema>();
  private routers: Router<MediaDatabaseSchema>[] = [];
  private dbs: Database<MediaDatabaseSchema>[] = [];

  constructor(readonly collections?: MockCollections) {}

  enable(config: MediaMockConfig = {}): void {
    const { isSlowServer } = config;
    if (!exenv.canUseDOM) {
      return;
    }
    this.routers = [
      createMediaPlaygroundRouter(),
      createApiRouter(isSlowServer),
    ];

    this.dbs = [createDatabase(this.collections)];

    [...this.routers, ...this.dbs].forEach(this.server.use.bind(this.server));
  }

  disable(): void {
    [...this.routers, ...this.dbs].forEach(
      (this.server as any).remove.bind(this.server),
    );
    this.routers.forEach(router => (router as any).reset());
    this.dbs.forEach(db => db.reset());
    this.routers = [];
    this.dbs = [];
  }
}

export function generateFilesFromTestData(
  files: (Partial<MediaFile> & { dataUri: string })[],
): Array<MediaFile & { blob: Blob }> {
  return files.map(file => {
    const blob = mapDataUriToBlob(file.dataUri);
    const id = file.id || uuid();
    const name = file.name || `test-file-${id}`;
    return {
      id,
      blob,
      mimeType: blob.type,
      mediaType: 'image' as MediaType,
      name,
      size: blob.size,
      artifacts: {},
      representations: {
        image: {},
      },
    };
  });
}

export const mediaMock = new MediaMock();
