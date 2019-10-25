import { Identifier } from '@atlaskit/media-core';
import {
  createStorybookMediaClientConfig,
  defaultCollectionName,
  externalImageIdentifier,
  imageFileId,
  largeImageFileId,
  smallImageFileId,
  videoFileId,
} from '@atlaskit/media-test-helpers';

// shared example variables
export const mediaClientConfig = createStorybookMediaClientConfig();
export const collectionName = defaultCollectionName;
export const identifiers: Identifier[] = [
  imageFileId,
  smallImageFileId,
  externalImageIdentifier,
  largeImageFileId,
  videoFileId,
];

export type SyncIdentifier = Omit<Identifier, 'id'> & { id?: string };
export const toSyncIdentifier = async (identifier: Identifier) =>
  identifier.mediaItemType === 'file'
    ? {
        ...identifier,
        id: await identifier.id,
      }
    : {
        ...identifier,
        id: 'external file yo',
      };
