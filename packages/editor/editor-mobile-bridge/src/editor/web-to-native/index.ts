import AndroidBridge from './android-impl';
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
} from './bridge';
import NativeBridge from './bridge';
import DummyBridge from './dummy-impl';
import IosBridge from './ios-impl';

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

export type EditorPluginBridges = keyof EditorBridges;
declare global {
  interface Window extends EditorBridges {
    webkit?: any;
  }
}

function getBridgeImpl(): NativeBridge {
  if (window.navigator.userAgent.match(/Android/)) {
    return new AndroidBridge();
  } else if (window.webkit) {
    return new IosBridge();
  } else {
    return new DummyBridge();
  }
}

export const toNativeBridge: NativeBridge = getBridgeImpl();
