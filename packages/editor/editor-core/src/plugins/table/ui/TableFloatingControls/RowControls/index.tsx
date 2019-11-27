import * as React from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  Draggable,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import classnames from 'classnames';
import { RowControlsProps } from './types';
import { TableCssClassName as ClassName } from '../../../types';
import { RowParams, getRowHeights, getRowsParams } from '../../../utils';
import { RowButton } from './RowButton';
import { getPluginState } from '../../../pm-plugins/main';
import { closestElement } from '../../../../../utils';

interface RowListProps extends RowControlsProps {
  rowsParams: RowParams[];
}

const RowControlsList = (props: RowListProps) => (
  <>
    {props.rowsParams.map(({ startIndex, endIndex, height }) => {
      if (
        !props.allowReorderingRows ||
        props.hasMergedCells ||
        (props.isHeaderRowEnabled && startIndex === 0)
      ) {
        return (
          <RowButton
            key={`row-${startIndex}`}
            startIndex={startIndex}
            endIndex={endIndex}
            height={height}
            {...props}
          />
        );
      }
      return (
        <Draggable
          key={`row-${startIndex}`}
          draggableId={`row-${startIndex}`}
          type="rows"
          index={startIndex}
          disableInteractiveElementBlocking={true}
        >
          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
            <RowButton
              provided={provided}
              snapshot={snapshot}
              startIndex={startIndex}
              endIndex={endIndex}
              height={height}
              {...props}
            />
          )}
        </Draggable>
      );
    })}
  </>
);

const NumberedColumnList = ({
  heights,
  hasHeaderRow,
}: {
  heights: number[];
  hasHeaderRow?: boolean;
}) => (
  <>
    {heights.map((height, index) => (
      <div
        key={`numbered-column-button-${index}`}
        className={classnames(
          ClassName.NUMBERED_COLUMN_BUTTON,
          ClassName.CONTROLS_BUTTON,
        )}
        data-index={index}
        style={{
          height,
        }}
      >
        {hasHeaderRow ? (index > 0 ? index : null) : index + 1}
      </div>
    ))}
  </>
);

const RowControls = (props: RowControlsProps) => {
  const {
    tableRef,
    hasHeaderRow,
    tableActive,
    editorView,
    isNumberColumnEnabled,
    allowReorderingRows,
  } = props;
  if (!tableRef) {
    return null;
  }
  const { rowHeights, columnWidths, tableWidth } = getPluginState(
    editorView.state,
  );
  const heights = rowHeights ? rowHeights : getRowHeights(tableRef);
  const rowsParams = getRowsParams(heights);

  if (!allowReorderingRows) {
    return (
      <div
        className={classnames(ClassName.ROW_CONTROLS, {
          [ClassName.NUMBERED_COLUMN]: isNumberColumnEnabled,
        })}
      >
        {tableActive ? (
          <div className={ClassName.ROW_CONTROLS_INNER}>
            <RowControlsList rowsParams={rowsParams} {...props} />
          </div>
        ) : isNumberColumnEnabled ? (
          <NumberedColumnList heights={heights} hasHeaderRow={hasHeaderRow} />
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={classnames(ClassName.ROW_CONTROLS, {
        [ClassName.NUMBERED_COLUMN]: isNumberColumnEnabled,
      })}
    >
      {tableActive ? (
        // @ts-ignore
        <Droppable
          droppableId="rows"
          type="rows"
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
                  <RowButton
                    isPortal={true}
                    provided={provided}
                    snapshot={snapshot}
                    startIndex={rowsParams[rubric.source.index].startIndex}
                    endIndex={rowsParams[rubric.source.index].endIndex}
                    height={rowsParams[rubric.source.index].height}
                    width={tableWidth}
                    columnWidths={columnWidths}
                    {...props}
                  />
                </div>
              </div>
            );
          }}
        >
          {(droppableProvided: DroppableProvided) => (
            <div
              className={ClassName.ROW_CONTROLS_INNER}
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
              <RowControlsList rowsParams={rowsParams} {...props} />
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      ) : isNumberColumnEnabled ? (
        <NumberedColumnList heights={heights} hasHeaderRow={hasHeaderRow} />
      ) : null}
    </div>
  );
};

export default RowControls;
