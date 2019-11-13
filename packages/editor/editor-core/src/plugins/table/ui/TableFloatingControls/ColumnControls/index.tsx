import * as React from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  Draggable,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';

import { TableCssClassName as ClassName } from '../../../types';
import {
  getColumnsWidths,
  getColumnsParams,
  ColumnParams,
} from '../../../utils';
import { ColumnControlsProps } from './types';
import { ColumnButton } from './ColumnButton';
import { getPluginState } from '../../../pm-plugins/main';

export interface Props {
  editorView: EditorView;
  hoveredColumns?: number[];
  isInDanger?: boolean;
  isResizing?: boolean;
  numberOfColumns?: number;
  selection?: Selection;
  tableRef?: HTMLTableElement;
}

interface ColumnsListProps extends ColumnControlsProps {
  columnsParams: ColumnParams[];
}

const ColumnsList = (props: ColumnsListProps) => (
  <>
    {props.columnsParams.map(({ startIndex, endIndex, width }) => {
      if (
        props.hasMergedCells ||
        (props.isHeaderColumnEnabled && startIndex === 0)
      ) {
        return (
          <ColumnButton
            key={`col-${startIndex}`}
            startIndex={startIndex}
            endIndex={endIndex}
            width={width}
            {...props}
          />
        );
      }
      return (
        <Draggable
          key={`col-${startIndex}`}
          draggableId={`col-${startIndex}`}
          type="columns"
          index={startIndex}
          disableInteractiveElementBlocking={true}
        >
          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
            <ColumnButton
              provided={provided}
              snapshot={snapshot}
              startIndex={startIndex}
              endIndex={endIndex}
              width={width}
              {...props}
            />
          )}
        </Draggable>
      );
    })}
  </>
);

const ColumnControls = (props: ColumnControlsProps) => {
  const { editorParent, tableRef, editorView } = props;
  if (!tableRef || !tableRef.querySelector('tr')) {
    return null;
  }
  const { columnWidths, rowHeights, tableHeight } = getPluginState(
    editorView.state,
  );
  const widths = columnWidths ? columnWidths : getColumnsWidths(editorView);
  const columnsParams = getColumnsParams(widths);

  return (
    <div className={ClassName.COLUMN_CONTROLS}>
      {/*
        // @ts-ignore */}
      <Droppable
        droppableId="columns"
        type="columns"
        direction="horizontal"
        renderClone={(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: any,
        ) => (
          <div className={editorParent.className}>
            <div className="ProseMirror">
              <ColumnButton
                isPortal={true}
                provided={provided}
                snapshot={snapshot}
                startIndex={columnsParams[rubric.source.index].startIndex}
                endIndex={columnsParams[rubric.source.index].endIndex}
                width={columnsParams[rubric.source.index].width}
                height={tableHeight}
                rowHeights={rowHeights}
                {...props}
              />
            </div>
          </div>
        )}
      >
        {(droppableProvided: DroppableProvided) => (
          <div
            className={ClassName.COLUMN_CONTROLS_INNER}
            ref={ref => {
              droppableProvided.innerRef(ref);
            }}
            {...droppableProvided.droppableProps}
          >
            <ColumnsList columnsParams={columnsParams} {...props} />
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ColumnControls;
