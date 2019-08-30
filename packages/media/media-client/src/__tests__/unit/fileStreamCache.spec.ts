import { LRUCache } from 'lru-fast';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StreamsCache } from '../../file-streams-cache';
import { createFileState } from '../../utils/createFileState';
import { FileState } from '../../models/file-state';

describe('StreamsCache', () => {
  it('should return the stream if already exist', () => {
    const cache = new StreamsCache(
      new LRUCache<string, ReplaySubject<FileState>>(10),
    );
    const fileStream1 = createFileState();

    cache.set('1', fileStream1);

    expect(cache.has('1')).toBeTruthy();
    expect(cache.has('2')).toBeFalsy();
    expect(cache.get('1')).toEqual(fileStream1);
  });
});
