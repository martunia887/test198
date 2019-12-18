import { ExtensionLayout } from '@atlaskit/adf-schema';
import { UpdateExtension, ExtensionProvider } from '@atlaskit/editor-common';
import { NodeWithPos } from 'prosemirror-utils';

export type ExtensionState = {
  layout: ExtensionLayout;
  allowBreakout: boolean;
  stickToolbarToBottom: boolean;
  showEditButton: boolean;
  updateExtension?: UpdateExtension<object>;
  nodeWithPos?: NodeWithPos;
  element?: HTMLElement;
  extensionProvider?: ExtensionProvider;
};

export type ExtensionAction =
  | {
      type: 'SET_NODE_INFO';
      data: { element?: HTMLElement; nodeWithPos?: NodeWithPos };
    }
  | {
      type: 'UPDATE_STATE';
      data: Partial<ExtensionState>;
    };
