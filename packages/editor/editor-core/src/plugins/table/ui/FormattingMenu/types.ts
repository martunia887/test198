import { EditorView } from 'prosemirror-view';
import { TableFormattingMarks, TableCondition } from '@atlaskit/adf-schema';

export interface Rule {
  id: string;
  condition?: TableCondition;
  value?: string;
}

export interface FormattingMenuProps {
  editorView: EditorView;
  isOpen: boolean;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export interface Formatting {
  rules: Rule[];
  marks: TableFormattingMarks[];
  background?: string;
}

export interface FormattingMenuState extends Formatting {
  isColorPickerOpen: boolean;
}
