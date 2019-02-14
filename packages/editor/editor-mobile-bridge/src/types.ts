import { ClientBasedAuth } from '@atlaskit/media-core';

export interface ProseMirrorDOMChange {
  inDOMChange: {
    composing: boolean;
    finish: (force: boolean) => void;
  };
}

export interface ElementsConfig {
  baseUrl: string;
  cloudId?: string;
}

export interface MediaAuthConfig extends ClientBasedAuth {
  collectionName?: string;
}

export interface NativeFetchResponse {
  response: string;
  status: number;
  statusText: string;
}

export type AccountId = string;
