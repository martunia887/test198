import { Color as StatusColor } from '@atlaskit/status/element';
import AndroidNativeBridge from './android-impl';
import IosNativeBridge from './ios-impl';
import DummyNativeBridge from './dummy-impl';
import { NativeBridgeInterface } from './types';

export class NativeBridge implements NativeBridgeInterface {
  private readonly bridge:
    | AndroidNativeBridge
    | IosNativeBridge
    | DummyNativeBridge;

  private constructor(window: Window) {
    if (window.navigator.userAgent.match(/Android/)) {
      this.bridge = new AndroidNativeBridge(window);
    } else if (window.webkit) {
      this.bridge = new IosNativeBridge();
    } else {
      this.bridge = new DummyNativeBridge();
    }
  }

  public static fromWindow(window: Window): NativeBridge {
    const nativeBridge = new NativeBridge(window);
    window.nativeBridge = nativeBridge;
    return nativeBridge;
  }

  public showMentions(query: string) {
    this.bridge.showMentions(query);
  }

  public dismissMentions() {
    this.bridge.dismissMentions();
  }

  public updateTextFormat(markStates: string) {
    this.bridge.updateTextFormat(markStates);
  }

  public updateText(content: string) {
    this.bridge.updateText(content);
  }

  public submitPromise(name: string, uuid: string, args: string) {
    this.bridge.submitPromise(name, uuid, args);
  }

  updateBlockState(currentBlockType: string) {
    this.bridge.updateBlockState(currentBlockType);
  }

  updateListState(listState: string) {
    this.bridge.updateListState(listState);
  }

  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  ) {
    this.bridge.showStatusPicker(text, color, uuid, isNew);
  }

  dismissStatusPicker(isNew: boolean) {
    this.bridge.dismissStatusPicker(isNew);
  }

  currentSelection(
    text: string,
    url: string,
    top: number,
    right: number,
    bottom: number,
    left: number,
  ) {
    this.bridge.currentSelection(text, url, top, right, bottom, left);
  }

  stateChanged(canUndo: boolean, canRedo: boolean) {
    this.bridge.stateChanged(canUndo, canRedo);
  }

  trackEvent(event: string) {
    this.bridge.trackEvent(event);
  }

  updateTextColor(serializedColor: string) {
    this.bridge.updateTextColor(serializedColor);
  }

  dismissTypeAhead() {
    this.bridge.dismissTypeAhead();
  }

  typeAheadQuery(query: string, trigger: string) {
    this.bridge.typeAheadQuery(query, trigger);
  }

  sendError(
    message: string,
    source: string,
    line: number,
    col: number,
    stackTrace: string[],
  ) {
    this.bridge.sendError(message, source, line, col, stackTrace);
  }
}
