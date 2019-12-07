import { Color as StatusColor } from '@atlaskit/status/element';
import { NativeBridgeInterface } from './types';

export default class IosNativeBridge implements NativeBridgeInterface {
  private get bridges() {
    if (typeof window.webkit !== 'object') {
      return {};
    }

    if (typeof window.webkit.messageHandlers !== 'object') {
      return {};
    }

    return window.webkit.messageHandlers;
  }

  private get mentionBridge() {
    return (
      this.bridges.mentionBridge || {
        postMessage() {
          console.warn(`mentionBridge not found`);
        },
      }
    );
  }

  private get textFormatBridge() {
    return (
      this.bridges.textFormatBridge || {
        postMessage() {
          console.warn(`textFormatBridge not found`);
        },
      }
    );
  }

  private get promiseBridge() {
    return (
      this.bridges.promiseBridge || {
        postMessage() {
          console.warn(`promiseBridge not found`);
        },
      }
    );
  }

  private get blockFormatBridge() {
    return (
      this.bridges.blockFormatBridge || {
        postMessage() {
          console.warn(`blockFormatBridge not found`);
        },
      }
    );
  }

  private get listBridge() {
    return (
      this.bridges.listBridge || {
        postMessage() {
          console.warn(`listBridge not found`);
        },
      }
    );
  }

  private get statusBridge() {
    return (
      this.bridges.statusBridge || {
        postMessage() {
          console.warn(`statusBridge not found`);
        },
      }
    );
  }

  private get linkBridge() {
    return (
      this.bridges.linkBridge || {
        postMessage() {
          console.warn(`linkBridge not found`);
        },
      }
    );
  }

  private get undoRedoBridge() {
    return (
      this.bridges.undoRedoBridge || {
        postMessage() {
          console.warn(`undoRedoBridge not found`);
        },
      }
    );
  }

  private get analyticsBridge() {
    return (
      this.bridges.analyticsBridge || {
        postMessage() {
          console.warn(`analyticsBridge not found`);
        },
      }
    );
  }

  private get typeAheadBridge() {
    return (
      this.bridges.typeAheadBridge || {
        postMessage() {
          console.warn(`typeAheadBridge not found`);
        },
      }
    );
  }

  private get errorBridge() {
    return (
      this.bridges.errorBridge || {
        postMessage() {
          console.warn(`errorBridge not found`);
        },
      }
    );
  }

  showMentions(query: string) {
    this.mentionBridge.postMessage({
      name: 'showMentions',
      query: query,
    });
  }

  dismissMentions() {
    this.mentionBridge.postMessage({
      name: 'dismissMentions',
    });
  }

  updateTextFormat(markStates: string) {
    this.textFormatBridge.postMessage({
      name: 'updateTextFormat',
      states: markStates,
    });
  }

  updateText(content: string) {
    this.textFormatBridge.postMessage({
      name: 'updateText',
      query: content,
    });
  }

  getServiceHost(): string {
    if (window.mediaBridge) {
      return window.mediaBridge.getServiceHost();
    } else {
      // ¯\_(ツ)_/¯ ugly, I know, but we need this data, and don't want call native side
      return 'http://www.atlassian.com';
    }
  }

  getCollection(): string {
    if (window.mediaBridge) {
      return window.mediaBridge.getCollection();
    } else {
      // ¯\_(ツ)_/¯ @see #getServiceHost()
      return 'FabricMediaSampleCollection';
    }
  }

  submitPromise(name: string, uuid: string, args: string) {
    this.promiseBridge.postMessage({
      name: 'submitPromise',
      promise: {
        name: name,
        uuid: uuid,
      },
      args: args,
    });
  }

  updateBlockState(currentBlockType: string) {
    this.blockFormatBridge.postMessage({
      name: 'updateBlockState',
      states: currentBlockType,
    });
  }

  updateListState(listState: string) {
    this.listBridge.postMessage({
      name: 'updateListState',
      states: listState,
    });
  }

  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  ) {
    this.statusBridge.postMessage({
      name: 'showStatusPicker',
      text,
      color,
      uuid,
      isNew,
    });
  }

  dismissStatusPicker(isNew: boolean) {
    this.statusBridge.postMessage({
      name: 'dismissStatusPicker',
      isNew,
    });
  }

  currentSelection(
    text: string,
    url: string,
    top: number,
    right: number,
    bottom: number,
    left: number,
  ) {
    this.linkBridge.postMessage({
      name: 'currentSelection',
      text,
      url,
      top,
      right,
      bottom,
      left,
    });
  }

  stateChanged(canUndo: boolean, canRedo: boolean) {
    this.undoRedoBridge.postMessage({
      name: 'stateChanged',
      canUndo,
      canRedo,
    });
  }

  trackEvent(event: string) {
    this.analyticsBridge.postMessage({
      name: 'trackEvent',
      event,
    });
  }

  updateTextColor(_serializedColor: string) {}

  dismissTypeAhead() {
    this.typeAheadBridge.postMessage({
      name: 'dismissTypeAhead',
    });
  }

  typeAheadQuery(query: string, trigger: string) {
    this.typeAheadBridge.postMessage({
      name: 'typeAheadQuery',
      query,
      trigger,
    });
  }

  sendError(
    message: string,
    source: string,
    line: number,
    col: number,
    stackTrace: string[],
  ) {
    this.errorBridge.postMessage({
      name: 'sendError',
      message,
      source,
      line,
      col,
      stackTrace,
    });
  }
}
