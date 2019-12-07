import { Color as StatusColor } from '@atlaskit/status/element';
import {
  NativeBridgeInterface,
  MentionBridge,
  TextFormattingBridge,
  MediaBridge,
  PromiseBridge,
  ListBridge,
  StatusBridge,
  LinkBridge,
  UndoRedoBridge,
  AnalyticsBridge,
  TypeAheadBridge,
  ErrorBridge,
} from './types';
import { BridgedWindow } from '../../types';

export default class AndroidNativeBridge implements NativeBridgeInterface {
  analyticsBridge: AnalyticsBridge;
  errorBridge: ErrorBridge;
  linkBridge: LinkBridge;
  listBridge: ListBridge;
  mediaBridge: MediaBridge;
  mentionBridge: MentionBridge;
  promiseBridge: PromiseBridge;
  statusBridge: StatusBridge;
  textFormatBridge: TextFormattingBridge;
  typeaheadBridge: TypeAheadBridge;
  undoRedoBridge: UndoRedoBridge;

  constructor(window: BridgedWindow) {
    this.analyticsBridge = window.analyticsBridge as AnalyticsBridge;
    this.errorBridge = window.errorBridge as ErrorBridge;
    this.linkBridge = window.linkBridge as LinkBridge;
    this.listBridge = window.listBridge as ListBridge;
    this.mediaBridge = window.mediaBridge as MediaBridge;
    this.mentionBridge = window.mentionsBridge as MentionBridge;
    this.promiseBridge = window.promiseBridge as PromiseBridge;
    this.statusBridge = window.statusBridge as StatusBridge;
    this.textFormatBridge = window.textFormatBridge as TextFormattingBridge;
    this.typeaheadBridge = window.typeAheadBridge as TypeAheadBridge;
    this.undoRedoBridge = window.undoRedoBridge as UndoRedoBridge;
  }

  showMentions(query: string) {
    this.mentionBridge.showMentions(query);
  }

  dismissMentions() {
    /*TODO: implement when mentions are ready */
  }

  updateTextFormat(markStates: string) {
    this.textFormatBridge.updateTextFormat(markStates);
  }

  updateText(content: string) {
    this.textFormatBridge.updateText(content);
  }

  getServiceHost(): string {
    return this.mediaBridge.getServiceHost();
  }

  getCollection(): string {
    return this.mediaBridge.getCollection();
  }

  submitPromise(name: string, uuid: string, args: string) {
    if (this.promiseBridge) {
      this.promiseBridge.submitPromise(name, uuid, args);
    }
  }

  updateBlockState(currentBlockType: string) {
    this.textFormatBridge.updateBlockState(currentBlockType);
  }

  updateListState(listState: string) {
    this.listBridge.updateListState(listState);
  }

  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  ) {
    this.statusBridge.showStatusPicker(text, color, uuid, isNew);
  }

  dismissStatusPicker(isNew: boolean) {
    this.statusBridge.dismissStatusPicker(isNew);
  }

  currentSelection(
    text: string,
    url: string,
    top: number,
    right: number,
    bottom: number,
    left: number,
  ) {
    this.linkBridge.currentSelection(text, url, top, right, bottom, left);
  }

  stateChanged(canUndo: boolean, canRedo: boolean) {
    if (this.undoRedoBridge) {
      this.undoRedoBridge.stateChanged(canUndo, canRedo);
    }
  }

  trackEvent(event: string) {
    this.analyticsBridge.trackEvent(event);
  }

  updateTextColor(_serializedColor: string) {}

  typeAheadQuery(query: string, trigger: string) {
    this.typeaheadBridge.typeAheadQuery(query, trigger);
  }

  dismissTypeAhead() {
    this.typeaheadBridge.dismissTypeAhead();
  }

  sendError(
    message: string,
    source: string,
    line: number,
    col: number,
    stackTrace: string[],
  ) {
    this.errorBridge.sendError(message, source, line, col, stackTrace);
  }
}
