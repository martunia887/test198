import {
  defaultCollectionName,
  userAuthProvider,
  mediaPickerAuthProvider,
  defaultMediaPickerAuthProvider,
} from '@atlaskit/media-test-helpers';
import { MediaProvider, MediaStateManager } from '@atlaskit/editor-core';
import { MediaClientConfig } from '@atlaskit/media-core';

export interface MediaProviderFactoryConfig {
  collectionName?: string;
  stateManager?: MediaStateManager;
  dropzoneContainer?: HTMLElement;
  includeUploadMediaClientConfig?: boolean;
  includeUserAuthProvider?: boolean;
  useMediaPickerAuthProvider?: boolean;
}

/**
 * Add "import * as mediaTestHelpers from '@atlaskit/media-test-helpers'"
 * at the beginning of your file and pass "mediaTestHelpers" into this function
 */
export function storyMediaProviderFactory(
  mediaProviderFactoryConfig: MediaProviderFactoryConfig = {},
) {
  const {
    collectionName,
    stateManager,
    includeUploadMediaClientConfig,
    includeUserAuthProvider,
    useMediaPickerAuthProvider = true,
  } = mediaProviderFactoryConfig;
  const collection = collectionName || defaultCollectionName;
  const mediaClientConfig: MediaClientConfig = {
    authProvider: useMediaPickerAuthProvider
      ? mediaPickerAuthProvider()
      : defaultMediaPickerAuthProvider,
    userAuthProvider:
      includeUserAuthProvider === false ? undefined : userAuthProvider,
  };

  return Promise.resolve<MediaProvider>({
    featureFlags: {},
    stateManager,
    uploadParams: { collection },
    viewMediaClientConfig: mediaClientConfig,
    uploadMediaClientConfig:
      includeUploadMediaClientConfig === false ? undefined : mediaClientConfig,
  });
}

export type promisedString = Promise<string>;
export type resolveFn = (...any) => any;
export type thumbnailStore = { [id: string]: promisedString | resolveFn };

export function fileToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new (window as any).FileReader();
    reader.onloadend = function() {
      resolve(reader.result);
    };
    reader.onabort = function() {
      reject('abort');
    };
    reader.onerror = function(err) {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
}

export function isImage(type: string) {
  return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}
