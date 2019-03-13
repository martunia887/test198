import { createPromise } from '../cross-platform-promise';
import {
  Auth,
  AuthContext,
  MediaClientConfig,
  ClientBasedAuth,
} from '@atlaskit/media-core';
import { MediaProvider } from '@atlaskit/editor-core';

const getMediaToken = (context?: AuthContext): Promise<Auth> =>
  createPromise<ClientBasedAuth>(
    'getAuth',
    // if collectionName exists in media's AuthContext, pass it along
    // otherwise pass an empty string (note that undefined doesn't work well with native promises)
    context && context.collectionName ? context.collectionName : '',
  ).submit();

function createMediaProvider() {
  const mediaClientConfig: MediaClientConfig = {
    authProvider: (context?: AuthContext) => getMediaToken(context),
  };

  return Promise.resolve({
    uploadMediaClientConfig: mediaClientConfig,
    viewMediaClientConfig: mediaClientConfig,
    uploadParams: {
      collection: '', // initially empty, will be returned by upload-end event
    },
  } as MediaProvider);
}

export default createMediaProvider();
