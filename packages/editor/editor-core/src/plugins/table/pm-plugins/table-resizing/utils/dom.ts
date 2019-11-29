import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { TableCssClassName as ClassName } from '../../../types';
import { getPluginState as getMainPluginState } from '../../main';
import { containsClassName, closestElement } from '../../../../../utils';
import { updateOverflowShadows } from '../../../nodeviews/TableComponent';

function getHeights(
  children: NodeListOf<HTMLElement>,
): Array<number | undefined> {
  const heights: Array<number | undefined> = [];
  for (let i = 0, count = children.length; i < count; i++) {
    const child: HTMLElement = children[i] as HTMLElement;
    if (child) {
      const rect = child.getBoundingClientRect();
      const height = rect ? rect.height : child.offsetHeight;
      heights[i] = height;
    } else {
      heights[i] = undefined;
    }
  }
  return heights;
}
function getWidths(children: HTMLCollection): Array<number | undefined> {
  const widths: Array<number | undefined> = [];
  for (let i = 0, count = children.length; i < count; i++) {
    const child: HTMLElement = children[i] as HTMLElement;
    if (child) {
      const rect = child.getBoundingClientRect();
      const width = rect ? rect.width : child.offsetWidth;
      widths[i] = width;
    } else {
      widths[i] = undefined;
    }
  }
  return widths;
}

export const updateControls = (state: EditorState) => {
  const { tableRef } = getMainPluginState(state);
  if (!tableRef) {
    return;
  }
  const tr = tableRef.querySelector('tr');
  if (!tr) {
    return;
  }
  const wrapper = tableRef.parentElement;
  if (!(wrapper && wrapper.parentElement)) {
    return;
  }
  const cols = tr.children;
  const rows = tableRef.querySelectorAll('tr');
  const columnControls = wrapper.querySelectorAll<HTMLElement>(
    `.${ClassName.COLUMN_CONTROLS_BUTTON}`,
  );
  const rowControls = wrapper.parentElement.querySelectorAll<HTMLElement>(
    `.${ClassName.ROW_CONTROLS_BUTTON}`,
  );
  const numberedRows = wrapper.parentElement.querySelectorAll<HTMLElement>(
    `.${ClassName.NUMBERED_COLUMN_BUTTON}`,
  );

  const colWidths = getWidths(cols);
  const rowHeights = getHeights(rows);

  // update column controls width on resize
  for (let i = 0, count = columnControls.length; i < count; i++) {
    const colWidth = colWidths[i];
    if (colWidth) {
      columnControls[i].style.width = `${colWidth + 1}px`;
    }
  }

  // update rows controls height on resize
  for (let i = 0, count = rowControls.length; i < count; i++) {
    const height = rowHeights[i];
    if (height) {
      rowControls[i].style.height = `${height + 1}px`;

      if (numberedRows.length) {
        numberedRows[i].style.height = `${height + 1}px`;
      }
    }
  }

  updateOverflowShadows(
    wrapper,
    tableRef,
    wrapper.parentElement.querySelector<HTMLElement>(
      `.${ClassName.TABLE_RIGHT_SHADOW}`,
    ),
    wrapper.parentElement.querySelector<HTMLElement>(
      `.${ClassName.TABLE_LEFT_SHADOW}`,
    ),
  );
};

export const isClickNear = (
  event: MouseEvent,
  click: { x: number; y: number },
): boolean => {
  const dx = click.x - event.clientX,
    dy = click.y - event.clientY;
  return dx * dx + dy * dy < 100;
};

export const getResizeCellPos = (
  view: EditorView,
  event: MouseEvent,
  lastColumnResizable: boolean,
): number | null => {
  const target = event.target as HTMLElement;

  if (!containsClassName(target, ClassName.RESIZE_HANDLE_DECORATION)) {
    return null;
  }

  const tableCell = closestElement(target, 'td, th');

  if (!tableCell) {
    return null;
  }

  const cellStartPosition = view.posAtDOM(tableCell, 0);
  return cellStartPosition - 1;
};
