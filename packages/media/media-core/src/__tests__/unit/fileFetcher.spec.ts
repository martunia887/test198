jest.mock('@atlaskit/media-store');
import {
  MediaStore,
  FileItem,
  authToOwner,
  Auth,
  AuthProvider,
} from '@atlaskit/media-store';
import uuid from 'uuid';
import { FileFetcherImpl, getItemsFromKeys } from '../../file';
import {
  expectFunctionToHaveBeenCalledWith,
  asMock,
} from '@atlaskit/media-test-helpers';

describe('FileFetcher', () => {
  const fileId = 'some-file-id';
  const collectionName = 'some-collection-name';
  const fileName = 'some-name';
  const binaryUrl = 'some-binary-url';

  const setup = () => {
    const items = [
      {
        id: uuid(),
        collection: 'collection-1',
        details: {
          name: 'file-1',
        },
      },
      {
        id: uuid(),
        collection: 'collection-1',
        details: {
          name: 'file-2',
        },
      },
      {
        id: uuid(),
        collection: 'collection-2',
        details: {
          name: 'file-3',
        },
      },
    ];
    const itemsResponse = Promise.resolve({
      data: {
        items,
      },
    });
    const mediaStore = {
      getFileBinaryURL: jest.fn(),
      getItems: jest.fn().mockReturnValue(itemsResponse),
    } as any;
    const fileFetcher = new FileFetcherImpl(mediaStore);

    asMock(mediaStore.getFileBinaryURL).mockReturnValue(binaryUrl);

    return { fileFetcher, mediaStore, items, itemsResponse };
  };

  describe('downloadBinary()', () => {
    let appendChild: jest.SpyInstance<any>;

    describe('with normal browser', () => {
      beforeEach(() => {
        appendChild = jest.spyOn(document.body, 'appendChild');
      });

      it('should call getFileBinaryURL', () => {
        const { mediaStore, fileFetcher } = setup();
        fileFetcher.downloadBinary(fileId, fileName, collectionName);
        expect(mediaStore.getFileBinaryURL).toHaveBeenCalledWith(
          fileId,
          collectionName,
        );
      });

      // TODO: JEST-23 this started failing in landkid - must be investigated
      // it('should create a link', () => {
      //   const lastAppendCall =
      //     appendChild.mock.calls[appendChild.mock.calls.length - 1];
      //   const link = lastAppendCall[0] as HTMLAnchorElement;
      //   expect(link.download).toBe(fileName);
      //   expect(link.href).toBe(binaryUrl);
      //   expect(link.target).toBe('media-download-iframe');
      // });

      it('should create iframe and open binary url in it', () => {
        const { fileFetcher } = setup();
        fileFetcher.downloadBinary(fileId, fileName, collectionName);

        const iframe = document.getElementById(
          'media-download-iframe',
        ) as HTMLIFrameElement;
        expect(iframe).toBeDefined();
      });
    });

    describe('with IE11', () => {
      beforeEach(() => {
        const { mediaStore, fileFetcher } = setup();
        asMock(mediaStore.getFileBinaryURL).mockReturnValue(binaryUrl);
        appendChild = jest.spyOn(document.body, 'appendChild');
        (window as any).MSInputMethodContext = true;
        (document as any).documentMode = true;
        fileFetcher.downloadBinary(fileId, fileName, collectionName);
      });

      it('should detect IE11 and use _blank as target', () => {
        const lastAppendCall =
          appendChild.mock.calls[appendChild.mock.calls.length - 1];
        const link = lastAppendCall[0] as HTMLAnchorElement;
        expect(link.target).toBe('_blank');
      });
    });
  });

  describe('getFileState()', () => {
    it('should return an errored observable if we pass an invalid file id', done => {
      const { fileFetcher } = setup();

      fileFetcher.getFileState('invalid-id').subscribe({
        error(error) {
          expect(error).toEqual('invalid-id is not a valid file id');
          done();
        },
      });
    });

    it('should split calls to /items by collection name', done => {
      const { fileFetcher, mediaStore, items } = setup();

      fileFetcher
        .getFileState(items[0].id, { collectionName: items[0].collection })
        .subscribe();
      fileFetcher
        .getFileState(items[1].id, { collectionName: items[1].collection })
        .subscribe();
      fileFetcher
        .getFileState(items[2].id, { collectionName: items[2].collection })
        .subscribe();

      setImmediate(() => {
        expect(mediaStore.getItems).toHaveBeenCalledTimes(2);
        expect(mediaStore.getItems.mock.calls[0]).toEqual([
          [items[0].id, items[1].id],
          'collection-1',
        ]);
        expect(mediaStore.getItems.mock.calls[1]).toEqual([
          [items[2].id],
          'collection-2',
        ]);
        done();
      });
    });

    it('should group ids without collection in the same call to /items', done => {
      const { fileFetcher, mediaStore, items } = setup();

      fileFetcher.getFileState(items[0].id).subscribe();
      fileFetcher.getFileState(items[1].id).subscribe();
      fileFetcher.getFileState(items[2].id).subscribe();

      setImmediate(() => {
        expect(mediaStore.getItems).toHaveBeenCalledTimes(1);
        expect(mediaStore.getItems.mock.calls[0]).toEqual([
          [items[0].id, items[1].id, items[2].id],
          undefined,
        ]);
        done();
      });
    });
  });

  describe('copyFile', () => {
    it('should call mediaStore.copyFileWithToken', async () => {
      const { items, fileFetcher } = setup();
      const copyFileWithToken = jest.fn().mockResolvedValue({ data: {} });
      asMock(MediaStore).mockImplementation(() => ({
        copyFileWithToken,
      }));

      asMock(authToOwner).mockImplementation((owner: any) => owner);

      const owner: Auth = {
        asapIssuer: 'asapIssuer',
        token: 'sometoken',
        baseUrl: 'somebaseurl',
      };
      const authProvider: AuthProvider = () => Promise.resolve(owner);
      const userAuthProvider = jest.fn();

      const source = {
        id: items[0].id,
        collection: 'someCollectionName',
        authProvider,
      };
      const destination = {
        collection: 'recents',
        authProvider: userAuthProvider,
      };
      await fileFetcher.copyFile(source, destination);
      expectFunctionToHaveBeenCalledWith(copyFileWithToken, [
        {
          sourceFile: {
            id: items[0].id,
            collection: 'someCollectionName',
            owner,
          },
        },
        {
          collection: 'recents',
        },
      ]);
    });
  });
});

describe('getItemsFromKeys()', () => {
  const details = {} as any;

  it('should return the same an array with the same length', () => {
    const keys = [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '2',
        collection: 'user-collection',
      },
    ];
    const items: FileItem[] = [
      {
        id: '1',
        type: 'file',
        details,
      },
    ];

    expect(getItemsFromKeys(keys, items)).toHaveLength(keys.length);
  });

  it('should respect order', () => {
    const keys = [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '2',
        collection: 'user-collection',
      },
    ];
    const items: FileItem[] = [
      {
        id: '2',
        type: 'file',
        details: {
          ...details,
          name: 'file-2',
        },
      },
      {
        id: '1',
        type: 'file',
        details: {
          ...details,
          name: 'file-1',
        },
      },
    ];

    const result = getItemsFromKeys(keys, items);

    expect(result[0]).toEqual({
      name: 'file-1',
    });
    expect(result[1]).toEqual({
      name: 'file-2',
    });
    expect(result[2]).toBeUndefined();
  });

  it('should use collection name to find item', () => {
    const keys = [
      {
        id: '1',
        collection: 'first-collection',
      },
      {
        id: '1',
        collection: 'other-collection',
      },
      {
        id: '2',
        collection: 'user-collection',
      },
    ];
    const items: FileItem[] = [
      {
        id: '2',
        type: 'file',
        collection: 'user-collection',
        details: {
          ...details,
          name: 'file-2',
        },
      },
      {
        id: '1',
        type: 'file',
        collection: 'first-collection',
        details: {
          ...details,
          name: 'file-1',
        },
      },
    ];

    const result = getItemsFromKeys(keys, items);

    expect(result).toEqual([
      {
        name: 'file-1',
      },
      undefined,
      {
        name: 'file-2',
      },
    ]);
  });

  it('should return undefined for not found files', () => {
    const keys = [
      {
        id: '1',
        collection: 'a',
      },
      {
        id: '2',
        collection: 'b',
      },
    ];
    const items: FileItem[] = [
      {
        id: '2',
        type: 'file',
        details: {
          ...details,
          name: 'file-2',
        },
      },
    ];

    const result = getItemsFromKeys(keys, items);

    expect(result).toEqual([undefined, undefined]);
  });
});
