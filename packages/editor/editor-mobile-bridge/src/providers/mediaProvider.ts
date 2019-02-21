import { createPromise } from '../cross-platform-promise';
import { MediaAuthConfig } from '../types';
import { MediaClientConfig } from '@atlaskit/media-core';

function getToken(context) {
  return createPromise<MediaAuthConfig>(
    'getAuth',
    context.collectionName,
  ).submit();
}

function createMediaProvider() {
  const mediaClientConfig: MediaClientConfig = {
    authProvider: context => getToken(context),
  };

  return Promise.resolve({
    uploadContext: mediaClientConfig,
    viewContext: mediaClientConfig,
    uploadParams: {
      collection: null,
    },
  });
}

export default Promise.resolve(createMediaProvider());
