import { EditorView } from 'prosemirror-view';

export interface RowControlsProps {
  editorView: EditorView;
  editorParent: HTMLElement;
  tableRef?: HTMLTableElement;
  hoveredRows?: number[];
  isInDanger?: boolean;
  isResizing?: boolean;
  insertRowButtonIndex?: number;
  hasHeaderRow?: boolean;
  isNumberColumnEnabled?: boolean;
  tableActive?: boolean;
  isHeaderRowEnabled?: boolean;
  hasMergedCells?: boolean;
  multiReorderIndexes?: number[];
}
