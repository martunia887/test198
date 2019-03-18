import * as React from 'react';
import { akEditorTableNumberColumnWidth } from '@atlaskit/editor-common';
import { TableCssClassName as ClassName } from '../../types';
import { tableToolbarSize } from '../styles';
import { closestElement } from '../../../../utils/';

export interface Props {
  type: 'row' | 'column';
  tableRef: HTMLElement;
}

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

const InsertLine = ({ tableRef, type }: Props) => (
  <div
    className={ClassName.CONTROLS_INSERT_LINE}
    style={
      type === 'row'
        ? { width: getInsertLineWidth(tableRef) }
        : { height: getInsertLineHeight(tableRef) }
    }
  />
);

export default InsertLine;
