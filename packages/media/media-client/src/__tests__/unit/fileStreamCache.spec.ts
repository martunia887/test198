import { LRUCache } from 'lru-fast';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { nextTick } from '@atlaskit/media-test-helpers';
import { StreamsCache } from '../../file-streams-cache';
import { createFileStateSubject } from '../../utils/createFileStateSubject';
import { FileState } from '../../models/file-state';
import { observableToPromise } from '../../utils/observableToPromise';

describe('StreamsCache', () => {
  it('should return the stream if already exist', () => {
    const cache = new StreamsCache(
      new LRUCache<string, ReplaySubject<FileState>>(10),
    );
    const fileStateSubject = createFileStateSubject();

    cache.set('1', fileStateSubject);

    expect(cache.has('1')).toBeTruthy();
    expect(cache.has('2')).toBeFalsy();
    expect(cache.get('1')).toEqual(fileStateSubject);
  });

  describe('set()', () => {
    it('should extend existing state if exists', async () => {
      const cache = new StreamsCache(
        new LRUCache<string, ReplaySubject<FileState>>(10),
      );
      const initialFileStateSubject = createFileStateSubject({
        id: 'one',
        status: 'processing',
        mediaType: 'audio',
        mimeType: '',
        name: '',
        size: 0,
        artifacts: {},
      });

      cache.set('1', initialFileStateSubject);
      const nextFileStateSubject = createFileStateSubject({
        id: 'one',
        status: 'processing',
        mediaType: 'audio',
        mimeType: '',
        name: 'file_name',
        size: 100,
        representations: {
          image: {},
        },
      });

      cache.set('1', nextFileStateSubject);

      await nextTick();

      expect(await observableToPromise(cache.get('1')!)).toEqual({
        id: 'one',
        status: 'processing',
        mediaType: 'audio',
        mimeType: '',
        name: 'file_name',
        size: 100,
        artifacts: {},
        representations: {
          image: {},
        },
      });
    });

    it('existing subscriptions should get new state', async () => {
      const cache = new StreamsCache(
        new LRUCache<string, ReplaySubject<FileState>>(10),
      );
      const initialFileStateSubject = createFileStateSubject({
        id: 'one',
        status: 'error',
      });
      const next = jest.fn();
      cache.set('1', initialFileStateSubject);
      cache.get('1')!.subscribe({
        next,
      });
      cache.set(
        '1',
        createFileStateSubject({
          id: 'one',
          status: 'processing',
          mediaType: 'audio',
          mimeType: '',
          name: 'file_name',
          size: 100,
          representations: {
            image: {},
          },
        }),
      );

      await nextTick();

      expect(next).toBeCalledTimes(2);
    });
  });
});
