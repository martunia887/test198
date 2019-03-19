import * as React from 'react';
import styled from 'styled-components';
import {
  akEditorTableNumberColumnWidth,
  akEditorUnitZIndex,
} from '@atlaskit/editor-common';
import { TableCssClassName as ClassName } from '../../types';
import {
  tableToolbarSize,
  tableBorderSelectedColor,
  tableInsertColumnButtonSize,
} from '../styles';
import { closestElement } from '../../../../utils/';

export interface Props {
  tableRef: HTMLElement;
  className?: string;
  type?: 'row' | 'column';
}

const InsertLineBasic = styled.div`
  background: ${tableBorderSelectedColor};
  position: absolute;
  z-index: ${akEditorUnitZIndex};
`;

const InsertColumnLineStyled = styled(InsertLineBasic)`
  width: 2px;
  left: 9px;
  top: ${tableInsertColumnButtonSize - 2}px;
`;

const InsertRowLineStyled = styled(InsertLineBasic)`
  height: 2px;
  top: 8px;
  left: ${tableInsertColumnButtonSize - 2}px;
`;

const getInsertLineHeight = (tableRef: HTMLElement) => {
  // The line gets height 100% from the table,
  // but since we have an overflow on the left,
  // we should add an offset to make up for it.
  const LINE_OFFSET = 3;
  return tableRef.offsetHeight + tableToolbarSize + LINE_OFFSET;
};

const getToolbarSize = (tableRef: HTMLElement): number => {
  const parent = closestElement(tableRef, `.${ClassName.TABLE_CONTAINER}`);
  if (parent) {
    return parent.querySelector(`.${ClassName.NUMBERED_COLUMN}`)
      ? tableToolbarSize + akEditorTableNumberColumnWidth - 1
      : tableToolbarSize;
  }

  return tableToolbarSize;
};

const getInsertLineWidth = (tableRef: HTMLElement) => {
  // The line gets width 100% from the table,
  // but since we have an overflow on the left,
  // we should add an offset to make up for it.
  const LINE_OFFSET = 4;
  const { parentElement, offsetWidth } = tableRef;
  const parentOffsetWidth = parentElement!.offsetWidth;
  const { scrollLeft } = parentElement!;
  const diff = offsetWidth - parentOffsetWidth;
  const toolbarSize = getToolbarSize(tableRef);
  return (
    Math.min(
      offsetWidth + toolbarSize,
      parentOffsetWidth + toolbarSize - Math.max(scrollLeft - diff, 0),
    ) + LINE_OFFSET
  );
};

export const ColumnLine = ({ tableRef, className }: Props) => (
  <InsertColumnLineStyled
    className={className}
    style={{ height: getInsertLineHeight(tableRef) }}
  />
);

export const RowLine = ({ tableRef, className }: Props) => (
  <InsertRowLineStyled
    className={className}
    style={{ width: getInsertLineWidth(tableRef) }}
  />
);

const InsertLine = ({ tableRef, type, className }: Props) => {
  if (type === 'row') {
    return <RowLine tableRef={tableRef} className={className} />;
  }

  return <ColumnLine tableRef={tableRef} className={className} />;
};

export default InsertLine;
