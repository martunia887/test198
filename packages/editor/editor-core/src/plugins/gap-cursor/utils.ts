import { Node as PMNode, ResolvedPos, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { findPositionOfNodeBefore, findDomRefAtPos } from 'prosemirror-utils';
import { tableMarginTop } from '@atlaskit/editor-common';

import { GapCursorSelection, Side } from './selection';
import { TableCssClassName } from '../table/types';
import { tableInsertColumnButtonSize } from '../table/ui/styles';
import { closestElement } from '../../utils';

// we don't show gap cursor for those nodes
const IGNORED_NODES = [
  'paragraph',
  'bulletList',
  'orderedList',
  'listItem',
  'taskItem',
  'decisionItem',
  'heading',
  'blockquote',
];

// Returns DOM node's vertical margin. It descents into the node and reads margins of nested DOM nodes
const getDomNodeVerticalMargin = (
  ref: HTMLElement | null,
  side: 'top' | 'bottom',
): number => {
  let margin = 0;
  while (ref && ref.nodeType === 1) {
    const css = window.getComputedStyle(ref);
    const curMargin = parseInt((css as any)[`margin-${side}`], 10);
    if (curMargin > margin) {
      margin = curMargin;
    }
    ref = ref[side === 'top' ? 'firstChild' : 'lastChild'] as HTMLElement;
  }
  return margin;
};

export const isIgnored = (node?: PMNode | null): boolean => {
  return !!node && IGNORED_NODES.indexOf(node.type.name) !== -1;
};

export const isValidTargetNode = (node?: PMNode | null): boolean => {
  return !!node && !isIgnored(node);
};

export function getMediaNearPos(
  doc: PMNode,
  $pos: ResolvedPos,
  schema: Schema,
  dir = -1,
): PMNode | null {
  let $currentPos = $pos;
  let currentNode: PMNode | null = null;
  const { mediaSingle, media, mediaGroup } = schema.nodes;

  do {
    $currentPos = doc.resolve(
      dir === -1 ? $currentPos.before() : $currentPos.after(),
    );

    if (!$currentPos) {
      return null;
    }

    currentNode =
      (dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter) ||
      $currentPos.parent;

    if (!currentNode || currentNode.type === schema.nodes.doc) {
      return null;
    }

    if (
      currentNode.type === mediaSingle ||
      currentNode.type === media ||
      currentNode.type === mediaGroup
    ) {
      return currentNode;
    }
  } while ($currentPos.depth > 0);

  return null;
}

export const isTextBlockNearPos = (
  doc: PMNode,
  schema: Schema,
  $pos: ResolvedPos,
  dir: number,
) => {
  let $currentPos = $pos;
  let currentNode: PMNode | null = null;

  while ($currentPos.depth > 0) {
    $currentPos = doc.resolve(
      dir === -1 ? $currentPos.before() : $currentPos.after(),
    );

    if (!$currentPos) {
      return false;
    }

    currentNode =
      (dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter) ||
      $currentPos.parent;

    if (!currentNode || currentNode.type === schema.nodes.doc) {
      return false;
    }

    if (currentNode.isTextblock) {
      return true;
    }
  }

  let childNode: PMNode | null = currentNode;

  while (childNode && childNode.firstChild) {
    childNode = childNode.firstChild;
    if (childNode && childNode.isTextblock) {
      return true;
    }
  }

  return false;
};

const isMediaSingle = (node?: HTMLElement | null): boolean => {
  if (!node) {
    return false;
  }
  const firstChild = node.firstChild as HTMLElement;
  return (
    !!firstChild &&
    firstChild.nodeType === Node.ELEMENT_NODE &&
    firstChild.classList.contains('media-single')
  );
};

const isNodeViewWrapper = (node?: HTMLElement | null): boolean => {
  if (!node) {
    return false;
  }
  return (
    !!node &&
    node.nodeType === Node.ELEMENT_NODE &&
    node.className.indexOf('-content-wrap') !== -1
  );
};

function getBreakoutModeFromTargetNode(node: PMNode): string {
  if (node.attrs.layout) {
    return node.attrs.layout;
  }

  if (node.marks && node.marks.length) {
    return (
      node.marks.find(mark => mark.type.name === 'breakout') || {
        attrs: { mode: '' },
      }
    ).attrs.mode;
  }

  return '';
}

// incapsulated this hack into a separate util function
export const fixCursorAlignment = (view: EditorView) => {
  const {
    state: { selection, schema },
    domAtPos,
  } = view;
  const { side, $from } = selection as GapCursorSelection;

  // gap cursor is positioned relative to that node
  const targetNode = side === Side.LEFT ? $from.nodeAfter! : $from.nodeBefore!;
  if (!targetNode) {
    return;
  }
  const targetNodePos =
    side === Side.LEFT ? $from.pos + 1 : findPositionOfNodeBefore(selection);
  if (targetNodePos === undefined) {
    return;
  }

  let targetNodeRef = findDomRefAtPos(
    targetNodePos,
    domAtPos.bind(view),
  ) as HTMLElement;

  const gapCursorRef = view.dom.querySelector(
    '.ProseMirror-gapcursor span',
  ) as HTMLElement;

  const gapCursorParentNodeRef = gapCursorRef.parentNode! as HTMLElement;
  const previousSibling = gapCursorParentNodeRef.previousSibling as HTMLElement;
  const isTargetNodeMediaSingle = isMediaSingle(targetNodeRef);
  const isMediaWithWrapping =
    isTargetNodeMediaSingle &&
    /wrap-[right|left]/i.test(targetNode.attrs.layout);
  const prevNodeMarginBottom = getDomNodeVerticalMargin(
    previousSibling,
    'bottom',
  );

  const minHeight = 20;
  let height = 0;
  let width = 0;
  let marginTop = 0;
  let breakoutWidth = 0;
  let paddingLeft = 0;

  // gets width and height of the prevNode DOM element, or its nodeView wrapper DOM element
  do {
    const isTargetNodeNodeViewWrapper = isNodeViewWrapper(targetNodeRef);
    const firstChild = targetNodeRef.firstChild as HTMLElement;
    const css = window.getComputedStyle(
      isTargetNodeMediaSingle || isTargetNodeNodeViewWrapper
        ? firstChild || targetNodeRef
        : targetNodeRef,
    );
    const isInTableCell = /td|th/i.test(targetNodeRef.parentNode!.nodeName);

    height = parseInt(css.height!, 10);
    width = parseInt(css.width!, 10);

    width += parseInt(css.paddingLeft!, 10);
    width += parseInt(css.paddingRight!, 10);
    height += parseInt(css.paddingTop!, 10);
    height += parseInt(css.paddingBottom!, 10);

    // padding is cumulative
    paddingLeft += parseInt(css.paddingLeft!, 10);

    if (previousSibling || isMediaWithWrapping || isInTableCell) {
      const curNodeMarginTop = getDomNodeVerticalMargin(targetNodeRef, 'top');
      if (curNodeMarginTop > prevNodeMarginBottom) {
        marginTop = curNodeMarginTop - prevNodeMarginBottom;
      }
      if (isMediaWithWrapping) {
        marginTop = curNodeMarginTop;
      }
    }

    if (isTargetNodeNodeViewWrapper || isTargetNodeMediaSingle) {
      breakoutWidth = width;
    }

    targetNodeRef = targetNodeRef.parentNode as HTMLElement;
  } while (targetNodeRef && !targetNodeRef.contains(gapCursorRef));

  // height of the rule (<hr>) is 0, that's why we set minHeight
  if (height < minHeight) {
    height = minHeight;
    marginTop -= Math.round(minHeight / 2) - 1;
  }

  // table nodeView margin fix
  if (targetNode.type === schema.nodes.table) {
    const tableFullMarginTop = tableMarginTop + tableInsertColumnButtonSize / 2;
    height -= tableFullMarginTop;
    marginTop = tableFullMarginTop;
    gapCursorRef.style.paddingLeft = `${paddingLeft}px`;
  }

  // breakout mode
  const breakoutMode = getBreakoutModeFromTargetNode(targetNode);
  if (/full-width|wide/i.test(breakoutMode)) {
    gapCursorRef.setAttribute('layout', breakoutMode);
  }

  // mediaSingle with layout="wrap-left" or "wrap-right"
  if (isMediaWithWrapping) {
    gapCursorParentNodeRef.setAttribute('layout', targetNode.attrs.layout);
    if (targetNode.attrs.layout === 'wrap-right') {
      gapCursorRef.style.marginLeft = `-${width}px`;
    }
  }

  gapCursorRef.style.height = `${height}px`;
  gapCursorRef.style.marginTop = `${marginTop}px`;
  gapCursorRef.style.width = `${breakoutWidth || width}px`;
};

export const isIgnoredClick = (elem: HTMLElement) => {
  if (elem.nodeName === 'BUTTON' || closestElement(elem, 'button')) {
    return true;
  }

  // check if target node has a parent table node
  let tableWrap;
  let node = elem;
  while (node) {
    if (
      node.className &&
      (node.getAttribute('class') || '').indexOf(
        TableCssClassName.TABLE_CONTAINER,
      ) > -1
    ) {
      tableWrap = node;
      break;
    }
    node = node.parentNode as HTMLElement;
  }

  if (tableWrap) {
    const rowControls = tableWrap.querySelector(
      `.${TableCssClassName.ROW_CONTROLS_WRAPPER}`,
    );
    const columnControls = tableWrap.querySelector(
      `.${TableCssClassName.COLUMN_CONTROLS_WRAPPER}`,
    );
    return (
      (rowControls && rowControls.contains(elem)) ||
      (columnControls && columnControls.contains(elem))
    );
  }

  return false;
};
