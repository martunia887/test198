import * as React from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  Draggable,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { TableCssClassName as ClassName } from '../../../types';
import { getColumnsWidths, getColumnsParams } from '../../../utils';
import { ColumnControlsProps, ColumnsListProps } from './types';
import { ColumnButton } from './ColumnButton';
import { getPluginState } from '../../../pm-plugins/main';
import { closestElement } from '../../../../../utils';

const ColumnsList = (props: ColumnsListProps) => (
  <>
    {props.columnsParams.map(({ startIndex, endIndex, width }) => {
      if (
        !props.allowReorderingColumns ||
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
  const { tableRef, editorView, allowReorderingColumns } = props;
  if (!tableRef || !tableRef.lastChild) {
    return null;
  }
  const { columnWidths, rowHeights, tableHeight } = getPluginState(
    editorView.state,
  );
  const widths = columnWidths ? columnWidths : getColumnsWidths(editorView);
  const columnsParams = getColumnsParams(widths);

  if (!allowReorderingColumns) {
    return (
      <div className={ClassName.COLUMN_CONTROLS}>
        <div className={ClassName.COLUMN_CONTROLS_INNER}>
          <ColumnsList columnsParams={columnsParams} {...props} />
        </div>
      </div>
    );
  }

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
        ) => {
          const parent = closestElement(
            editorView.dom as HTMLElement,
            '.fabric-editor-popup-scroll-parent',
          ) as HTMLElement;
          return (
            <div className={parent.className}>
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
          );
        }}
      >
        {(droppableProvided: DroppableProvided) => (
          <div
            className={ClassName.COLUMN_CONTROLS_INNER}
            data-context-id={
              // @ts-ignore
              droppableProvided.droppableProps[
                ClassName.RBD_DROPPABLE_CONTEXT_ID
              ]
            }
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
