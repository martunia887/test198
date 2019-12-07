import { EditorView } from 'prosemirror-view';
import { ResolveResponse } from '@atlaskit/smart-card';
import { EditorBridges, IOSEditorBridges } from './editor/native-bridge/types';
import { WebBridge } from './editor/web-bridge';
import RendererBridgeImpl from './renderer/native-to-web/implementation';
import { NativeBridge } from './editor/native-bridge';

export interface BridgedWindow extends EditorBridges {
  bridge?: WebBridge;
  rendererBridge?: RendererBridgeImpl;
  nativeBridge: NativeBridge;
  webkit?: {
    messageHandlers: IOSEditorBridges;
  };
}

export type EditorViewWithComposition = EditorView & {
  domObserver: {
    observer?: MutationObserver;
    flush: () => void;
  };
  composing: boolean;
};

export type PromiseName =
  | 'getAuth'
  | 'getConfig'
  | 'nativeFetch'
  | 'getAccountId'
  | 'getResolvedLink'
  | 'getLinkResolve';

export type PromisePayload =
  | GetAuthPayload
  | GetConfigPayload
  | NativeFetchPayload
  | GetAccountIdPayload
  | GetResolvedLinkPayload
  | GetLinkResolvePayload;

export interface GetAuthPayload {
  baseUrl: string;
  clientId: string;
  token: string;
}

export interface GetConfigPayload {
  baseUrl: string;
  cloudId?: string;
  productId: string;
}

export interface NativeFetchPayload {
  response: string;
  status: number;
  statusText: string;
}

export type GetAccountIdPayload = string | { accountId: string };

export type GetResolvedLinkPayload = ResolveResponse;

// RPC not implemented on native side pending
// upstream work for SmartLinks v2
export type GetLinkResolvePayload = unknown;
