import * as React from 'react';
import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Tooltip from '@atlaskit/tooltip';
import { browser } from '@atlaskit/editor-common';
import { TableCssClassName as cl } from '../../../types';
import { getColumnClassNames } from '../../../utils';
import { ColumnControlsProps } from './types';
import { getPluginState } from '../../../pm-plugins/main';
import messages from '../../messages';

import {
  hoverColumns,
  selectColumn,
  clearHoverSelection,
  hoverMergedCells,
} from '../../../commands';

interface ColumnProps extends ColumnControlsProps {
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

const getDraggableCells = (
  columnIndex: number,
  rowHeights?: number[],
  tableRef?: HTMLTableElement,
) => {
  if (!rowHeights || !tableRef || !tableRef.lastChild) {
    return null;
  }

  let html = '';
  for (
    let i = 0, rowsCount = tableRef.lastChild.childNodes.length;
    i < rowsCount;
    i++
  ) {
    const row = tableRef.lastChild.childNodes[i];
    const cell = row.childNodes[columnIndex] as HTMLElement;
    const nodeNade = cell.nodeName.toLowerCase();
    const style = `height:${rowHeights[i] - 1}px`;
    html += `<tr><${nodeNade} style="${style}" class="${cell.className} ${cl.SELECTED_CELL}">${cell.innerHTML}</${nodeNade}></tr>`;
  }

  return (
    <div className={cl.TABLE_CONTAINER}>
      <div className={cl.TABLE_NODE_WRAPPER}>
        <table className={cl.TABLE_PORTAL}>
          <tbody dangerouslySetInnerHTML={{ __html: html }} />
        </table>
      </div>
    </div>
  );
};

const ColumnControlButton = ({
  editorView,
  hoveredColumns,
  isInDanger,
  isResizing,
  provided,
  startIndex,
  endIndex,
  width,
  height,
  tableRef,
  rowHeights,
  isPortal,
  hasMergedCells,
  multiReorderIndexes = [],
  intl: { formatMessage },
}: ColumnProps & InjectedIntlProps) => {
  const { state, dispatch } = editorView;
  const [showMergedCells, setShowMergedCells] = useState(false);
  const dragStart = useRef(null as null | number);

  useEffect(() => {
    if (!provided) {
      return;
    }
    const { eventEmitter } = getPluginState(state);
    eventEmitter.emit('reordering-columns', {
      columnIndex: startIndex,
      style: provided.draggableProps.style,
      // @ts-ignore
      draggableId: provided.draggableProps[cl.RBD_DRAGGABLE],
    });
  }, [state, startIndex, provided]);

  const onMouseOver = useCallback(
    () => hoverColumns([startIndex])(state, dispatch),
    [state, dispatch, startIndex],
  );

  const onMouseOut = useCallback(() => {
    clearHoverSelection()(state, dispatch);
    if (showMergedCells) {
      setShowMergedCells(false);
    }
  }, [state, dispatch, showMergedCells]);

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (showMergedCells) {
        return;
      }
      // fix for issue ED-4665
      if (browser.ie_version === 11) {
        (editorView.dom as HTMLElement).blur();
      }
      selectColumn(startIndex, event.shiftKey)(state, dispatch);
    },
    [state, dispatch, showMergedCells, startIndex],
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!hasMergedCells) {
        return;
      }
      dragStart.current = event.clientX;

      function move(moveEvent: MouseEvent) {
        if (
          dragStart.current !== null &&
          !showMergedCells &&
          Math.abs(dragStart.current - moveEvent.clientX) > 5
        ) {
          clearHoverSelection()(editorView.state, dispatch);
          hoverMergedCells()(editorView.state, dispatch);
          setShowMergedCells(true);
        }
      }

      function finish(event: MouseEvent) {
        window.removeEventListener('mouseup', finish);
        window.removeEventListener('mousemove', move);
        dragStart.current = null;
      }
      window.addEventListener('mouseup', finish);
      window.addEventListener('mousemove', move);
    },
    [editorView, state, dispatch, dragStart, showMergedCells, hasMergedCells],
  );

  const style = {
    ...(provided ? provided.draggableProps.style : {}),
    width,
    height,
  };

  const portalContent = useMemo(
    () =>
      isPortal ? getDraggableCells(startIndex, rowHeights, tableRef) : null,
    [isPortal, startIndex, rowHeights, tableRef],
  );

  const control = (
    <div
      className={classnames(
        getColumnClassNames(
          startIndex,
          state.selection,
          hoveredColumns,
          isInDanger,
          isResizing,
        ),
        {
          [cl.COLUMN_CONTROLS_BUTTON_WRAP]: !isPortal,
          [cl.COLUMN_CONTROLS_BUTTON]: !isPortal,
          [cl.CONTROLS_BUTTON]: !isPortal,
          [cl.RBD_PORTAL]: isPortal,
          [cl.COLUMN_CONTROLS_PORTAL]: isPortal,
          [cl.SHOW_MERGED_CELLS]: showMergedCells,
          [cl.MULTI_REORDERING]:
            (multiReorderIndexes || []).indexOf(startIndex) > -1,
        },
      )}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      data-start-index={startIndex}
      data-end-index={endIndex}
      key={startIndex}
      ref={provided ? provided.innerRef : null}
      {...(provided ? provided.draggableProps : {})}
      {...(provided ? provided.dragHandleProps : {})}
      style={style}
    >
      {isPortal && (
        <>
          <div
            className={classnames(
              cl.COLUMN_CONTROLS_BUTTON_WRAP,
              cl.COLUMN_CONTROLS_BUTTON,
              cl.CONTROLS_BUTTON,
              cl.HOVERED_CELL_ACTIVE,
            )}
          />
          <div className={cl.REORDERING_INDICATOR}>
            {multiReorderIndexes.length || 1}
          </div>
          {portalContent}
        </>
      )}
    </div>
  );

  if (showMergedCells) {
    return (
      <Tooltip
        content={formatMessage(messages.canNotReorderColumns)}
        position="top"
      >
        {control}
      </Tooltip>
    );
  }

  return control;
};

export const ColumnButton = injectIntl(ColumnControlButton);
