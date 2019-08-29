import { LRUCache } from 'lru-fast';
import { FileState } from './models/file-state';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { observableToPromise } from './utils/observableToPromise';

export class StreamsCache<T> {
  constructor(private readonly streams: LRUCache<string, ReplaySubject<T>>) {}

  has(id: string): boolean {
    return !!this.streams.find(id);
  }

  set(id: string, stream: ReplaySubject<T>) {
    const existingFileStateStream = this.get(id);

    if (existingFileStateStream) {
      Promise.all([
        observableToPromise(existingFileStateStream),
        observableToPromise(stream),
      ]).then(([existingFileState, newFileState]) => {
        const newState = {
          ...existingFileState,
          ...newFileState,
        };

        existingFileStateStream.next(newState);
      });
    } else {
      this.streams.set(id, stream);
    }
  }

  get(id: string): ReplaySubject<T> | undefined {
    return this.streams.get(id);
  }

  getOrInsert(id: string, callback: () => ReplaySubject<T>): ReplaySubject<T> {
    if (!this.has(id)) {
      this.set(id, callback());
    }
    return this.get(id)!;
  }

  removeAll() {
    this.streams.removeAll();
  }

  remove(id: string) {
    this.streams.remove(id);
  }

  get size(): number {
    return this.streams.size;
  }
}

let streamCache: StreamsCache<FileState>;
export const getFileStreamsCache = () => {
  if (!streamCache) {
    const mediaState = require('@atlaskit/media-core').mediaState;
    streamCache = new StreamsCache<FileState>(mediaState.streams);
  }
  return streamCache;
};
