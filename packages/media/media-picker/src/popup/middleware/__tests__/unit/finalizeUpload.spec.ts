import { Auth } from '@atlaskit/media-core';
import {
  FileState,
  MediaFile,
  MediaFileArtifacts,
  fileStreamsCache,
} from '@atlaskit/media-client';
import {
  mockStore,
  mockFetcher,
  fakeMediaClient,
  asMock,
  expectFunctionToHaveBeenCalledWith,
} from '@atlaskit/media-test-helpers';
import { sendUploadEvent } from '../../../actions/sendUploadEvent';
import finalizeUploadMiddleware, { finalizeUpload } from '../../finalizeUpload';
import {
  FinalizeUploadAction,
  FINALIZE_UPLOAD,
} from '../../../actions/finalizeUpload';
import { State } from '../../../domain';
import { ReplaySubject, Observable } from 'rxjs';

describe('finalizeUploadMiddleware', () => {
  const auth: Auth = {
    clientId: 'some-client-id',
    token: 'some-token',
    baseUrl: 'some-base-url',
  };
  const upfrontId = Promise.resolve('1');
  const file = {
    id: 'some-file-id',
    name: 'some-file-name',
    type: 'some-file-type',
    creationDate: Date.now(),
    size: 12345,
    upfrontId,
  };
  const copiedFile: MediaFile = {
    id: 'some-copied-file-id',
    mediaType: 'image',
    mimeType: 'some/image',
    name: 'some-file-name',
    size: 12345,
    artifacts: {} as MediaFileArtifacts,
    representations: {},
  };
  const collection = 'some-collection';
  const uploadId = 'some-upload-id';
  const source = {
    id: file.id,
    collection,
  };
  const setup = (state: Partial<State> = {}) => {
    const store = mockStore(state);
    const { userMediaClient, tenantMediaClient } = store.getState();
    asMock(userMediaClient.mediaClientConfig.authProvider).mockResolvedValue(
      auth,
    );

    const fetcher = mockFetcher();
    asMock(tenantMediaClient.mediaStore.copyFileWithToken).mockResolvedValue({
      data: copiedFile,
    });
    fetcher.pollFile.mockImplementation(() => Promise.resolve(copiedFile));

    return {
      fetcher,
      store,
      next: jest.fn(),
      action: {
        type: FINALIZE_UPLOAD,
        file,
        uploadId,
        source,
      } as FinalizeUploadAction,
    };
  };

  it('should do nothing given unknown action', () => {
    const { fetcher, store, next } = setup();
    const action = {
      type: 'UNKNOWN',
    };

    finalizeUploadMiddleware(fetcher)(store)(next)(action);

    expect(store.dispatch).not.toBeCalled();
    expect(next).toBeCalledWith(action);
  });

  it('should send upload end event with metadata', () => {
    const { fetcher, store, action } = setup();

    return finalizeUpload(fetcher, store, action).then(action => {
      expect(action).toEqual(
        sendUploadEvent({
          event: {
            name: 'upload-end',
            data: {
              file,
              public: copiedFile,
            },
          },
          uploadId,
        }),
      );
    });
  });

  it('should send upload processing event with metadata', () => {
    const { fetcher, store, action } = setup();

    return finalizeUpload(fetcher, store, action).then(() => {
      expect(store.dispatch).toBeCalledWith(
        sendUploadEvent({
          event: {
            name: 'upload-processing',
            data: {
              file,
            },
          },
          uploadId,
        }),
      );
    });
  });

  it('should send upload error event given some error happens', () => {
    const { fetcher, store, action } = setup();
    const error = {
      message: 'some-error-message',
    };
    const { tenantMediaClient } = store.getState();

    asMock(tenantMediaClient.mediaStore.copyFileWithToken).mockRejectedValue(
      error,
    );

    return finalizeUpload(fetcher, store, action).then(() => {
      expect(store.dispatch).toBeCalledWith(
        sendUploadEvent({
          event: {
            name: 'upload-error',
            data: {
              file,
              error: {
                name: 'object_create_fail',
                description: error.message,
              },
            },
          },
          uploadId,
        }),
      );
    });
  });

  it('Should resolve deferred id when the source id is on the store', () => {
    const resolver = jest.fn();
    const rejecter = jest.fn();
    const { fetcher, store, action } = setup({
      deferredIdUpfronts: {
        'some-file-id': {
          resolver,
          rejecter,
        },
      },
    });

    return finalizeUpload(fetcher, store, action).then(() => {
      expect(resolver).toHaveBeenCalledTimes(1);
      expect(resolver).toBeCalledWith('some-copied-file-id');
    });
  });

  it('should call copyFileWithToken with the right params', async () => {
    const tenantMediaClient = fakeMediaClient();
    const { fetcher, store, action } = setup({
      config: { uploadParams: { collection: 'some-tenant-collection' } },
      tenantMediaClient,
    });

    asMock(tenantMediaClient.mediaStore.copyFileWithToken).mockResolvedValue({
      data: { id: 'some-id' },
    });

    await finalizeUpload(fetcher, store, action);

    expect(
      asMock(tenantMediaClient.mediaStore.copyFileWithToken),
    ).toBeCalledTimes(1);
    expectFunctionToHaveBeenCalledWith(
      tenantMediaClient.mediaStore.copyFileWithToken,
      [
        {
          sourceFile: {
            collection: 'some-collection',
            id: 'some-file-id',
            owner: {
              id: 'some-client-id',
              token: 'some-token',
              baseUrl: 'some-base-url',
            },
          },
        },
        {
          collection: 'some-tenant-collection',
          occurrenceKey: undefined,
          replaceFileId: undefined,
        },
      ],
    );
    expect(tenantMediaClient.mediaClientConfig.authProvider).toBeCalledWith({
      collectionName: 'some-tenant-collection',
    });
  });

  it('should populate cache with processed state', async () => {
    const { fetcher, store, action } = setup();
    const subject = new ReplaySubject<Partial<FileState>>(1);
    const next = jest.fn();
    subject.next({
      id: copiedFile.id,
    });
    fileStreamsCache.set(copiedFile.id, subject as Observable<FileState>);

    await finalizeUpload(fetcher, store, action);

    const observable = fileStreamsCache.get(copiedFile.id);
    observable!.subscribe({ next });

    // Needed due usage of setTimeout in finalizeUpload
    await new Promise(resolve => setTimeout(resolve, 1));

    expect(next).toBeCalledWith({
      id: 'some-copied-file-id',
    });
  });
});
