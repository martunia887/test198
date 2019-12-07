import {
  ListBridge,
  MediaBridge,
  MentionBridge,
  PromiseBridge,
  TextFormattingBridge,
  StatusBridge,
  TypeAheadBridge,
  LinkBridge,
  UndoRedoBridge,
  AnalyticsBridge,
} from './native-bridge/types';

export interface EditorBridges {
  mentionsBridge?: MentionBridge;
  mentionBridge?: MentionBridge;
  textFormatBridge?: TextFormattingBridge;
  mediaBridge?: MediaBridge;
  promiseBridge?: PromiseBridge;
  listBridge?: ListBridge;
  blockFormatBridge?: TextFormattingBridge;
  statusBridge?: StatusBridge;
  typeAheadBridge?: TypeAheadBridge;
  linkBridge?: LinkBridge;
  undoRedoBridge?: UndoRedoBridge;
  analyticsBridge?: AnalyticsBridge;
}

import { Color as StatusColor } from '@atlaskit/status/element';

export interface WebBridgeInterface {
  currentVersion(): string;
  onBoldClicked(): void;
  onItalicClicked(): void;
  onUnderlineClicked(): void;
  onCodeClicked(): void;
  onStrikeClicked(): void;
  onSuperClicked(): void;
  onSubClicked(): void;
  onMentionSelect(id: string, displayName: string): void;
  onMentionPickerResult(result: string): void;
  setContent(content: string): void;
  getContent(): string;
  clearContent(): void;
  onMediaPicked(eventName: string, payload: string): void;
  onPromiseResolved(uuid: string, paylaod: string): void;
  onPromiseRejected(uuid: string, err?: Error): void;
  onBlockSelected(blockType: string): void;
  onOrderedListSelected(): void;
  onBulletListSelected(): void;
  onIndentList(): void;
  onOutdentList(): void;
  onStatusUpdate(text: string, color: StatusColor, uuid: string): void;
  onStatusPickerDismissed(): void;
  onLinkUpdate(text: string, url: string): void;
  insertBlockType(type: string): void;
  scrollToSelection(): void;
  undo(): void;
  redo(): void;
  setKeyboardControlsHeight(height: string): void;
}

export type EditorPluginBridges = keyof EditorBridges;
