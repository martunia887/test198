import { EditorView } from 'prosemirror-view';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ColumnParams } from '../../../utils';

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
export interface ColumnsListProps extends ColumnControlsProps {
  columnsParams: ColumnParams[];
}

export interface ColumnProps extends ColumnControlsProps {
  startIndex: number;
  endIndex: number;
  width: number;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  isPortal?: boolean;
  height?: number;
  rowHeights?: number[];
  hasMergedCells?: boolean;
}
