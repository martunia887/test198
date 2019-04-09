import { EditorView } from 'prosemirror-view';
import { TableCondition } from '@atlaskit/adf-schema';

export interface Rule {
  id: string;
  condition?: TableCondition;
  value?: string;
  useAsReference?: boolean;
}

export interface FilterMenuProps {
  editorView: EditorView;
  isOpen: boolean;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export interface FilterMenuState {
  rules: Rule[];
}
