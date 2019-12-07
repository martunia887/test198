import { EditorView } from 'prosemirror-view';
import {
  EventDispatcher,
  textFormattingStateKey,
  TextFormattingState,
  blockPluginStateKey,
  BlockTypeState,
  listsStateKey,
  ListsState,
  statusPluginKey,
  StatusState,
  StatusType,
  textColorPluginKey,
  TextColorPluginState,
  typeAheadPluginKey,
  TypeAheadPluginState,
  hyperlinkStateKey,
  HyperlinkState,
  HyperlinkInsertStatus,
  historyPluginKey,
  HistoryPluginState,
} from '@atlaskit/editor-core';

import { NativeBridge } from './native-bridge';
import { valueOf as valueOfListState } from './native-bridge/listState';
import { valueOf as valueOfMarkState } from './native-bridge/markState';
import { WebBridge } from './web-bridge';

interface SerialisedTextColor {
  color: string | null;
  disabled?: boolean | undefined;
  borderColorPalette?: {
    [color: string]: string; // Hex
  };
  palette?: {
    [color: string]: string; // Hex
  };
}

export interface PluginSubscriptionConfig {
  nativeBridge: NativeBridge;
  webBridge: WebBridge;
}

export class PluginSubscription {
  private readonly nativeBridge: NativeBridge;
  private readonly webBridge: WebBridge;
  private eventDispatcher?: EventDispatcher;

  private readonly configs = [
    {
      bridge: 'statusBridge',
      pluginKey: statusPluginKey,
      updater: (pluginState: StatusState, view: EditorView) => {
        const { showStatusPickerAt, isNew } = pluginState;
        let status: StatusType | undefined;

        if (view && showStatusPickerAt) {
          const node = view.state.doc.nodeAt(showStatusPickerAt);
          if (node && node.type === view.state.schema.nodes.status) {
            status = {
              ...node.attrs,
            } as StatusType;
          }
        }

        if (status) {
          this.nativeBridge.showStatusPicker(
            status.text,
            status.color,
            status.localId!,
            isNew,
          );
        } else if (!showStatusPickerAt) {
          this.nativeBridge.dismissStatusPicker(isNew);
        }
      },
    },
    {
      bridge: 'textFormatBridge',
      pluginKey: textFormattingStateKey,
      updater: (pluginState: TextFormattingState) => {
        this.nativeBridge.updateTextFormat(
          JSON.stringify(valueOfMarkState(pluginState)),
        );
      },
    },
    {
      bridge: 'blockFormatBridge',
      pluginKey: blockPluginStateKey,
      updater: (pluginState: BlockTypeState) => {
        this.nativeBridge.updateBlockState(pluginState.currentBlockType.name);
        /**
         * Currently `updateBlockState` is on different bridges in native land.
         * We have a ticket to align on the naming.
         * @see https://product-fabric.atlassian.net/browse/FM-1341
         */
        // if (window.webkit) {
        //   // iOS
        //   this.nativeBridge.call('blockFormatBridge', 'updateBlockState', {
        //     states: pluginState.currentBlockType.name,
        //   });
        // } else {
        //   // Android
        //   toNativeBridge.call('textFormatBridge', 'updateBlockState', {
        //     states: pluginState.currentBlockType.name,
        //   });
        // }
      },
    },
    {
      bridge: 'listBridge',
      pluginKey: listsStateKey,
      updater: (pluginState: ListsState) => {
        this.nativeBridge.updateListState(
          JSON.stringify(valueOfListState(pluginState)),
        );
      },
    },
    {
      bridge: 'textFormatBridge',
      pluginKey: textColorPluginKey,
      updater: (
        pluginState: TextColorPluginState,
        _view: EditorView,
        initialPass?: boolean,
      ) => {
        let color = pluginState.color || null;
        let serialisedState: SerialisedTextColor = {
          color,
          disabled: pluginState.disabled,
        };

        if (initialPass) {
          let palette = Object.create(null);
          let borderColorPalette = Object.create(null);

          for (let { value, label, border } of pluginState.palette) {
            borderColorPalette[label.toLowerCase().replace(' ', '-')] = border;
            palette[label] = value;
          }

          serialisedState = {
            ...pluginState,
            color,
            borderColorPalette,
            palette,
          };
        }

        this.nativeBridge.updateTextColor(JSON.stringify(serialisedState));
      },
      sendInitialState: true,
    },
    {
      bridge: 'typeAheadBridge',
      pluginKey: typeAheadPluginKey,
      updater: (pluginState: TypeAheadPluginState) => {
        const { active, query, trigger } = pluginState;

        if (active === false) {
          this.nativeBridge.dismissTypeAhead();
          return;
        }

        this.nativeBridge.typeAheadQuery(query!, trigger!);
      },
    },
    {
      bridge: 'linkBridge',
      pluginKey: hyperlinkStateKey,
      updater: (pluginState: HyperlinkState, view: EditorView) => {
        const { activeText, activeLinkMark, canInsertLink } = pluginState;
        const message = {
          text: '',
          url: '',
          top: -1,
          right: -1,
          bottom: -1,
          left: -1,
        };

        if (view && activeLinkMark && !!(activeLinkMark as any).node) {
          const coords = view.coordsAtPos((activeLinkMark as any).pos);
          message.top = coords.top;
          message.right = coords.right;
          message.bottom = coords.bottom;
          message.left = coords.left;
        }

        if (
          activeLinkMark &&
          activeLinkMark.type === HyperlinkInsertStatus.EDIT_LINK_TOOLBAR
        ) {
          const linkType = activeLinkMark.node.type.schema.marks.link;
          const linkText = activeLinkMark.node.textContent;

          message.text = linkText || '';
          message.url =
            activeLinkMark.node.marks
              .filter(mark => mark.type === linkType)
              .map(link => link.attrs.href)
              .pop() || '';
        }

        if (
          canInsertLink &&
          message.text.length === 0 &&
          typeof activeText === 'string' &&
          activeText !== ''
        ) {
          message.text = activeText!;
        }

        this.nativeBridge.currentSelection(
          message.text,
          message.url,
          message.top,
          message.right,
          message.bottom,
          message.left,
        );
      },
    },
    {
      bridge: 'undoRedoBridge',
      pluginKey: historyPluginKey,
      updater: (pluginState: HistoryPluginState) => {
        this.nativeBridge.stateChanged(
          pluginState.canUndo,
          pluginState.canRedo,
        );
      },
    },
  ];

  constructor(config: PluginSubscriptionConfig) {
    this.webBridge = config.webBridge;
    this.nativeBridge = config.nativeBridge;
  }

  public subscribe(eventDispatcher: EventDispatcher, view: EditorView) {
    this.eventDispatcher = eventDispatcher;

    this.configs.forEach(config => {
      const { updater, pluginKey } = config;
      const pluginState = pluginKey.getState(view.state);

      (this.webBridge as any)[`${config.bridge}State`] = {
        ...(this.webBridge as any)[`${config.bridge}State`],
        ...pluginState,
      };

      (this.webBridge as any)[`${config.bridge}Listener`] = (
        pluginState: any,
        initialPass: boolean,
      ) => updater(pluginState, view, initialPass);

      if (config.sendInitialState && pluginState) {
        (this.webBridge as any)[`${config.bridge}Listener`](pluginState, true);
      }

      eventDispatcher.on(
        (pluginKey as any).key,
        (this.webBridge as any)[`${config.bridge}Listener`],
      );
    });
  }

  public unsubscribe() {
    this.configs.forEach(config => {
      (this.webBridge as any)[`${config.bridge}State`] = undefined;
      (this.webBridge as any)[`${config.bridge}Listener`] = undefined;

      if (this.eventDispatcher) {
        this.eventDispatcher.off(
          (config.pluginKey as any).key,
          (this.webBridge as any)[`${config.bridge}Listener`],
        );
      }
    });
  }
}
