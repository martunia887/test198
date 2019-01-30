import {
  MediaStore,
  ContextConfig,
  MediaStoreGetFileImageParams,
  ImageMetadata,
  LimitsPayload,
} from '@atlaskit/media-store';
import { CollectionFetcher } from '../collection';
import { FileFetcherImpl, FileFetcher } from '../file';

export interface Context {
  getImage(
    id: string,
    params?: MediaStoreGetFileImageParams,
    controller?: AbortController,
  ): Promise<Blob>;
  getImageMetadata(
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<ImageMetadata>;
  getImageUrl(
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<string>;
  getLimits(key: string, collectionName?: string): Promise<LimitsPayload>;

  readonly collection: CollectionFetcher;
  readonly file: FileFetcher;
  readonly config: ContextConfig;
}

export class ContextFactory {
  public static create(config: ContextConfig): Context {
    return new ContextImpl(config);
  }
}

class ContextImpl implements Context {
  private readonly mediaStore: MediaStore;
  readonly collection: CollectionFetcher;
  readonly file: FileFetcher;

  constructor(readonly config: ContextConfig) {
    this.mediaStore = new MediaStore({
      authProvider: config.authProvider,
    });
    this.collection = new CollectionFetcher(this.mediaStore);
    this.file = new FileFetcherImpl(this.mediaStore);
  }

  getImage(
    id: string,
    params?: MediaStoreGetFileImageParams,
    controller?: AbortController,
  ): Promise<Blob> {
    return this.mediaStore.getImage(id, params, controller);
  }

  getImageUrl(
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<string> {
    return this.mediaStore.getFileImageURL(id, params);
  }

  async getImageMetadata(
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<ImageMetadata> {
    return (await this.mediaStore.getImageMetadata(id, params)).metadata;
  }

  // TODO: rename => getStorageLimits or context.storage.getLimits
  // TODO: cache value per key
  async getLimits(
    key: string,
    collectionName?: string,
  ): Promise<LimitsPayload> {
    if (key === 'free-plan-key') {
      return Promise.resolve({
        displayName: '',
        total: {
          used: 0,
          allowed: 0,
        },
        maxFileSize: 20000000,
      });
    }

    return (await this.mediaStore.getLimits(key, collectionName)).data;
  }
}
