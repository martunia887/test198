import { Observable } from 'rxjs';
import { MediaClientConfig, Auth } from '@atlaskit/media-core';
import { FileState } from '@atlaskit/media-client';
import { fakeMediaClient, asMock } from '@atlaskit/media-test-helpers';

export interface CreateContextOptions {
  authPromise?: Promise<Auth>;
  getFileState?: () => Observable<FileState>;
  config?: MediaClientConfig;
}

export const createMediaClient = (options: CreateContextOptions = {}) => {
  const { authPromise, getFileState, config } = options;
  const mediaClient = fakeMediaClient(
    config || {
      authProvider: () =>
        authPromise ||
        Promise.resolve<Auth>({
          token: 'some-token',
          clientId: 'some-client-id',
          baseUrl: 'some-service-host',
        }),
    },
  );
  if (getFileState) {
    asMock(mediaClient.file.getFileState).mockImplementation(getFileState);
  }

  return mediaClient;
};
