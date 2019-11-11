import { Node } from 'prosemirror-model';
import { EmojiProvider } from '@atlaskit/emoji/types';
import { UploadParams } from '@atlaskit/media-picker/types';
import { MediaClientConfig } from '@atlaskit/media-core/auth';

export interface Transformer<T> {
  encode(node: Node): T;
  parse(content: T): Node;
}

// TODO [ED-8005]: add other known providers like mention, etc
export interface Providers {
  mediaProvider?: Promise<MediaProvider>;
  emojiProvider?: Promise<EmojiProvider>;
  [key: string]: Promise<any> | undefined;
}

export interface FeatureFlags {}

export type MediaProvider = {
  uploadParams?: UploadParams;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   * NOTE: We currently don't accept MediaClientConfig, because we need config properties
   *       to initialize
   */
  uploadMediaClientConfig?: MediaClientConfig;

  /**
   * (optional) For any additional feature to be enabled
   */
  featureFlags?: FeatureFlags;

  /**
   * Used for displaying Media Cards and downloading files.
   */
  viewMediaClientConfig: MediaClientConfig;
};
