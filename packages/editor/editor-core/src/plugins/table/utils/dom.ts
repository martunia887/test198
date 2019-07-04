import { TableCssClassName as ClassName } from '../types';
import { closestElement } from '../../../utils';

export const isCellNode = (node: HTMLElement) => {
  const cl = node.classList;
  return (
    cl.contains(ClassName.TABLE_CELL_NODE_WRAPPER) ||
    cl.contains(ClassName.TABLE_HEADER_NODE_WRAPPER)
  );
};

export const isInsertColumnButton = (node: HTMLElement) => {
  const cl = node.classList;
  return cl.contains(ClassName.COLUMN_CONTROLS_DECORATION);
};

export const isInsertRowButton = (node: HTMLElement) => {
  const cl = node.classList;
  return (
    cl.contains(ClassName.CONTROLS_INSERT_ROW) ||
    closestElement(node, `.${ClassName.CONTROLS_INSERT_ROW}`) ||
    (cl.contains(ClassName.CONTROLS_BUTTON_OVERLAY) &&
      closestElement(node, `.${ClassName.ROW_CONTROLS}`))
  );
};

export const getIndex = (target: HTMLElement) =>
  parseInt(target.getAttribute('data-index') || '-1', 10);
