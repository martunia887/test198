import { EditorView } from 'prosemirror-view';

export interface ColumnControlsProps {
  editorView: EditorView;
  editorParent: HTMLElement;
  tableRef?: HTMLTableElement;
  hoveredColumns?: number[];
  isInDanger?: boolean;
  isResizing?: boolean;
  isReordering?: boolean;
  isHeaderColumnEnabled?: boolean;
  hasMergedCells?: boolean;
  multiReorderIndexes?: number[];
}
