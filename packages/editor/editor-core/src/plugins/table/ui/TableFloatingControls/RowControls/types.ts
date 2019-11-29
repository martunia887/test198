import { EditorView } from 'prosemirror-view';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { RowParams } from '../../../utils';

export interface RowControlsProps {
  editorView: EditorView;
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
  allowReorderingRows?: boolean;
}

export interface RowProps extends RowControlsProps {
  startIndex: number;
  endIndex: number;
  height: number;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  width?: number;
  isPortal?: boolean;
  columnWidths?: number[];
}

export interface RowListProps extends RowControlsProps {
  rowsParams: RowParams[];
}
