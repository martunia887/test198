import * as events from 'events';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { MediaClientConfig, Auth } from '@atlaskit/media-core';
import { MediaClient, FileItem, FileState } from '@atlaskit/media-client';

export class Stubs {
  static mediaViewer(overrides: any) {
    const noop = () => {};
    const emitter = new events.EventEmitter();
    const mediaViewer = {
      on: noop,
      off: noop,
      trigger: (event: string) => emitter.emit(event),
      isOpen: jest.fn(),
      open: overrides.open || jest.fn(),
      setFiles: overrides.setFiles || jest.fn(),
      getCurrent: jest.fn(),
      isShowingLastFile: jest.fn(),
    };

    jest
      .spyOn(mediaViewer, 'on')
      .mockImplementation((event, callback) => emitter.on(event, callback));
    jest
      .spyOn(mediaViewer, 'off')
      .mockImplementation((event, callback) =>
        emitter.removeListener(event, callback),
      );

    return mediaViewer;
  }

  static mediaViewerConstructor(overrides?: any) {
    return jest.fn(() => Stubs.mediaViewer(overrides || {}));
  }

  static mediaItemProvider(subject?: Subject<FileItem>) {
    return {
      observable: jest.fn(() => subject || new Subject<FileItem>()),
    };
  }

  static mediaClient(
    config: MediaClientConfig,
    getFileState?: () => Observable<FileState>,
  ): Partial<MediaClient> {
    return {
      config,
      file: {
        downloadBinary: jest.fn(),
        getFileState: jest.fn(getFileState || (() => Observable.empty())),
        upload: jest.fn(),
      } as any,
      collection: {
        getItems: jest.fn(() => Observable.empty()),
        loadNextPage: jest.fn(),
      } as any,
    };
  }
}

export interface CreateMediaClientOptions {
  authPromise?: Promise<Auth>;
  getFileState?: () => Observable<FileState>;
  config?: MediaClientConfig;
}

export const createMediaClient = (options?: CreateMediaClientOptions) => {
  const defaultOptions: CreateMediaClientOptions = {
    authPromise: Promise.resolve<Auth>({
      token: 'some-token',
      clientId: 'some-client-id',
      baseUrl: 'some-service-host',
    }),
    getFileState: undefined,
    config: undefined,
  };
  const { authPromise, getFileState, config } = options || defaultOptions;
  const authProvider = jest.fn(() => authPromise);
  const mediaClientConfig: MediaClientConfig = {
    authProvider,
  };
  return Stubs.mediaClient(
    config || mediaClientConfig,
    getFileState,
  ) as MediaClient;
};
