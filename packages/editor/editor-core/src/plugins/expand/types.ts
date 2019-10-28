import { Node as PMNode } from 'prosemirror-model';

export interface ExpandPluginState {
  expandRef?: HTMLDivElement | null;
  expandTitleRef?: HTMLDivElement | null;
  expandPosition?: number;
  expandNode?: PMNode | null;
  // adjust title popup position whenever table layout is updated
  parentLayout?: string;
  shouldFocusTitle?: boolean;
}

export type ExpandPluginAction =
  | {
      type: 'SET_EXPAND';
      data: {
        expandNode?: PMNode | null;
        expandPosition?: number;
        expandRef?: HTMLDivElement | null;
      };
    }
  | {
      type: 'SET_PARENT_LAYOUT';
      data: {
        parentLayout?: string;
      };
    }
  | {
      type: 'SET_SHOULD_FOCUS_TITLE';
      data: {
        shouldFocusTitle: boolean;
      };
    };
