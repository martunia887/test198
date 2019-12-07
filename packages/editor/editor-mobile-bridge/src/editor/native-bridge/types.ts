import { Color as StatusColor } from '@atlaskit/status/element';

export interface MentionBridge {
  showMentions(query: String): void;
  dismissMentions(): void;
}

export interface TextFormattingBridge {
  updateTextFormat(markStates: string): void;
  updateText(content: string): void;
  updateBlockState(currentBlockType: string): void;
  updateTextColor(color: string): void;
}

export interface MediaBridge {
  getServiceHost(): string;
  getCollection(): string;
}

export interface PromiseBridge {
  submitPromise(name: string, uuid: string, args?: string): void;
}

export interface ListBridge {
  updateListState(listState: string): void;
}

export interface StatusBridge {
  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  ): void;
  dismissStatusPicker(isNew: boolean): void;
}

export interface TypeAheadBridge {
  dismissTypeAhead(): void;
  typeAheadQuery(query: string, trigger: string): void;
}

export interface LinkBridge {
  currentSelection(
    text: string,
    url: string,
    top: number,
    right: number,
    bottom: number,
    left: number,
  ): void;
}

export interface UndoRedoBridge {
  stateChanged(canUndo: boolean, canRedo: boolean): void;
}

export interface AnalyticsBridge {
  trackEvent(event: string): void;
}

export interface ErrorBridge {
  sendError(
    message: string,
    source: string,
    line: number,
    col: number,
    stackTrace: string[],
  ): void;
}

export interface NativeBridgeInterface
  extends MentionBridge,
    TextFormattingBridge,
    PromiseBridge,
    ListBridge,
    StatusBridge,
    LinkBridge,
    UndoRedoBridge,
    AnalyticsBridge,
    TypeAheadBridge,
    ErrorBridge {}

export interface EditorBridges {
  analyticsBridge?: AnalyticsBridge;
  blockFormatBridge?: TextFormattingBridge;
  errorBridge?: ErrorBridge;
  linkBridge?: LinkBridge;
  listBridge?: ListBridge;
  mediaBridge?: MediaBridge;
  mentionBridge?: MentionBridge;
  mentionsBridge?: MentionBridge;
  promiseBridge?: PromiseBridge;
  statusBridge?: StatusBridge;
  textFormatBridge?: TextFormattingBridge;
  typeAheadBridge?: TypeAheadBridge;
  undoRedoBridge?: UndoRedoBridge;
}

export interface PostMessagePayload {
  name: string;
  [key: string]: unknown;
}

export interface PostMessageBridge {
  postMessage<T extends PostMessagePayload>(payload: T): void;
}

export interface IOSEditorBridges {
  analyticsBridge?: PostMessageBridge;
  blockFormatBridge?: PostMessageBridge;
  errorBridge?: PostMessageBridge;
  linkBridge?: PostMessageBridge;
  listBridge?: PostMessageBridge;
  mediaBridge?: PostMessageBridge;
  mentionBridge?: PostMessageBridge;
  mentionsBridge?: PostMessageBridge;
  promiseBridge?: PostMessageBridge;
  statusBridge?: PostMessageBridge;
  textFormatBridge?: PostMessageBridge;
  typeAheadBridge?: PostMessageBridge;
  undoRedoBridge?: PostMessageBridge;
}

export type EditorPluginBridges = keyof EditorBridges;
