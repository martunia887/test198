import { EditorView } from 'prosemirror-view';

export interface ColumnControlsProps {
  editorView: EditorView;
  tableRef?: HTMLTableElement;
  hoveredColumns?: number[];
  isInDanger?: boolean;
  isResizing?: boolean;
  isReordering?: boolean;
  isHeaderColumnEnabled?: boolean;
  hasMergedCells?: boolean;
  multiReorderIndexes?: number[];
  allowReorderingColumns?: boolean;
}
