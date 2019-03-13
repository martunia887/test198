import {
  defaultCollectionName,
  userAuthProvider,
  mediaPickerAuthProvider,
  defaultMediaPickerAuthProvider,
} from '@atlaskit/media-test-helpers';
import { MediaProvider } from '@atlaskit/editor-core';
import { MediaClientConfig } from '@atlaskit/media-core';

export interface MediaProviderFactoryConfig {
  collectionName?: string;
  dropzoneContainer?: HTMLElement;
  includeUploadMediaClientConfig?: boolean;
  includeUserAuthProvider?: boolean;
  useMediaPickerAuthProvider?: boolean;
}

export const storyMediaProviderConfig = (
  mediaProviderFactoryConfig: MediaProviderFactoryConfig = {},
): MediaClientConfig => {
  const {
    includeUserAuthProvider,
    useMediaPickerAuthProvider = true,
  } = mediaProviderFactoryConfig;

  return {
    authProvider: useMediaPickerAuthProvider
      ? mediaPickerAuthProvider()
      : defaultMediaPickerAuthProvider,
    userAuthProvider:
      includeUserAuthProvider === false ? undefined : userAuthProvider,
  };
};

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
  } = mediaProviderFactoryConfig;
  const collection = collectionName || defaultCollectionName;
  const mediaClientConfig = storyMediaProviderConfig();

  return Promise.resolve<MediaProvider>({
    featureFlags: {},
    uploadParams: { collection },
    viewMediaClientConfig: mediaClientConfig,
    uploadMediaClientConfig:
      includeUploadMediaClientConfig === false ? undefined : mediaClientConfig,
  });
}

export type promisedString = Promise<string>;
export type resolveFn = (...v: any) => any;
export type thumbnailStore = { [id: string]: promisedString | resolveFn };

export function fileToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new (window as any).FileReader();
    reader.onloadend = function() {
      resolve(reader.result);
    };
    reader.onabort = function() {
      reject('abort');
    };
    reader.onerror = function(err: ErrorEvent) {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
}

export function isImage(type: string) {
  return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}
