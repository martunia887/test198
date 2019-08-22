import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
  MediaStore,
  MediaStoreGetCollectionItemsParams,
  MediaCollectionItem,
  FileItem,
  FileDetails,
  getFileStreamsCache,
} from '..';
import { FileFetcherImpl } from './file-fetcher';

export interface MediaCollectionFileItemDetails extends FileDetails {
  occurrenceKey: string;
}

export interface MediaCollectionFileItem extends FileItem {
  details: MediaCollectionFileItemDetails;
}

export interface MediaCollection {
  id: string;
  items: Array<MediaCollectionItem>;
}

export interface CollectionCacheEntry {
  items: MediaCollectionItem[];
  subject: ReplaySubject<MediaCollectionItem[]>;
  isLoadingNextPage: boolean;
  nextInclusiveStartKey?: string;
}

export type CollectionCache = {
  [collectionName: string]: CollectionCacheEntry;
};

export const collectionCache: CollectionCache = {};

const createCacheEntry = (): CollectionCacheEntry => ({
  items: [],
  subject: new ReplaySubject<MediaCollectionItem[]>(1),
  isLoadingNextPage: false,
});

export class CollectionFetcher {
  constructor(readonly mediaStore: MediaStore) {}

  file = new FileFetcherImpl(this.mediaStore);

  private populateCache(items: MediaCollectionItem[], collectionName: string) {
    items.forEach(item => {
      this.file.getFileState(item.id, {
        collectionName,
        occurrenceKey: item.occurrenceKey,
      });
    });
  }

  private removeFromCache(id: string, collectionName: string) {
    const collectionCacheIndex = collectionCache[
      collectionName
    ].items.findIndex(item => item.id === id);

    if (collectionCacheIndex === -1) {
      return;
    }

    getFileStreamsCache().remove(id);
    collectionCache[collectionName].items.splice(collectionCacheIndex, 1);
  }

  getItems(
    collectionName: string,
    params?: MediaStoreGetCollectionItemsParams,
  ): Observable<MediaCollectionItem[]> {
    if (!collectionCache[collectionName]) {
      collectionCache[collectionName] = createCacheEntry();
    }
    const collection = collectionCache[collectionName];
    const subject = collection.subject;

    this.mediaStore
      .getCollectionItems(collectionName, {
        ...params,
        details: 'full',
      })
      .then(items => {
        const { contents, nextInclusiveStartKey } = items.data;

        this.populateCache(contents, collectionName);
        // It's hard to merge two together, so we just take what's came from the server.
        // Since we load only one page > 2 pages will be ditched from the cache.
        collection.items = items.data.contents;
        collection.nextInclusiveStartKey = nextInclusiveStartKey;
        subject.next(collection.items);
      })
      .catch(error => subject.error(error));

    return subject;
  }

  async removeFile(id: string, collectionName: string, occurrenceKey?: string) {
    await this.mediaStore.removeCollectionFile(
      id,
      collectionName,
      occurrenceKey,
    );
    this.removeFromCache(id, collectionName);
    const collection = collectionCache[collectionName];
    collection.subject.next(collection.items);
  }

  async loadNextPage(
    collectionName: string,
    params?: MediaStoreGetCollectionItemsParams,
  ) {
    const collection = collectionCache[collectionName];
    const isLoading = collection ? collection.isLoadingNextPage : false;

    if (!collection || !collection.nextInclusiveStartKey || isLoading) {
      return;
    }

    collection.isLoadingNextPage = true;

    const {
      nextInclusiveStartKey: inclusiveStartKey,
      items: currentItems,
      subject,
    } = collectionCache[collectionName];
    const response = await this.mediaStore.getCollectionItems(collectionName, {
      ...params,
      inclusiveStartKey,
      details: 'full',
    });
    const { contents, nextInclusiveStartKey } = response.data;
    this.populateCache(contents, collectionName);
    const newItems = response.data.contents;
    const items = [...currentItems, ...newItems];

    subject.next(items);

    collectionCache[collectionName] = {
      items,
      nextInclusiveStartKey,
      subject,
      isLoadingNextPage: false,
    };
  }
}
