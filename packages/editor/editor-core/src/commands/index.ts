import { Fragment, Slice, Node as PMNode } from 'prosemirror-model';
import {
  EditorState,
  NodeSelection,
  Selection,
  TextSelection,
  Transaction,
} from 'prosemirror-state';
import { findWrapping, liftTarget } from 'prosemirror-transform';
import { EditorView } from 'prosemirror-view';
import * as baseCommand from 'prosemirror-commands';
import * as baseListCommand from 'prosemirror-schema-list';
import * as blockTypes from '../plugins/block-type/types';
import {
  isRangeOfType,
  canMoveDown,
  canMoveUp,
  atTheEndOfDoc,
  atTheBeginningOfBlock,
  isTableCell,
} from '../utils';

import { hyperlinkPluginKey } from '../plugins/hyperlink';

export function toggleBlockType(view: EditorView, name: string): boolean {
  const { nodes } = view.state.schema;
  switch (name) {
    case blockTypes.NORMAL_TEXT.name:
      if (nodes.paragraph) {
        return setNormalText()(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_1.name:
      if (nodes.heading) {
        return toggleHeading(1)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_2.name:
      if (nodes.heading) {
        return toggleHeading(2)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_3.name:
      if (nodes.heading) {
        return toggleHeading(3)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_4.name:
      if (nodes.heading) {
        return toggleHeading(4)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_5.name:
      if (nodes.heading) {
        return toggleHeading(5)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_6.name:
      if (nodes.heading) {
        return toggleHeading(6)(view.state, view.dispatch);
      }
      break;
  }
  return false;
}

export function setNormalText(): Command {
  return function(state, dispatch) {
    const { tr, selection: { $from, $to }, schema } = state;
    dispatch(tr.setBlockType($from.pos, $to.pos, schema.nodes.paragraph));
    return true;
  };
}

export function toggleHeading(level: number): Command {
  return function(state, dispatch) {
    const { tr, selection: { $from, $to }, schema } = state;
    const currentBlock = $from.parent;
    if (
      currentBlock.type !== schema.nodes.heading ||
      currentBlock.attrs['level'] !== level
    ) {
      dispatch(
        tr.setBlockType($from.pos, $to.pos, schema.nodes.heading, { level }),
      );
    } else {
      dispatch(tr.setBlockType($from.pos, $to.pos, schema.nodes.paragraph));
    }
    return true;
  };
}

/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it's possible for a selection to start or end at an empty node at the very end of
 * a line. This isn't obvious by looking at the editor and it's likely not what the
 * user intended - so we need to adjust the seletion a bit in scenarios like that.
 */
export function adjustSelectionInList(
  doc,
  selection: TextSelection,
): TextSelection {
  let { $from, $to } = selection;

  const isSameLine = $from.pos === $to.pos;

  if (isSameLine) {
    $from = doc.resolve($from.start($from.depth));
    $to = doc.resolve($from.end($from.depth));
  }

  let startPos = $from.pos;
  let endPos = $to.pos;

  if (isSameLine && startPos === doc.nodeSize - 3) {
    // Line is empty, don't do anything
    return selection;
  }

  // Selection started at the very beginning of a line and therefor points to the previous line.
  if ($from.nodeBefore && !isSameLine) {
    startPos++;
    let node = doc.nodeAt(startPos);
    while (!node || (node && !node.isText)) {
      startPos++;
      node = doc.nodeAt(startPos);
    }
  }

  if (endPos === startPos) {
    return new TextSelection(doc.resolve(startPos));
  }

  return new TextSelection(doc.resolve(startPos), doc.resolve(endPos));
}

export function preventDefault(): Command {
  return function(state, dispatch) {
    return true;
  };
}

export function toggleList(listType: 'bulletList' | 'orderedList'): Command {
  return function(
    state: EditorState,
    dispatch: (tr: Transaction) => void,
    view: EditorView,
  ): boolean {
    dispatch(
      state.tr.setSelection(
        adjustSelectionInList(state.doc, state.selection as TextSelection),
      ),
    );
    state = view.state;

    const { $from, $to } = state.selection;
    const parent = $from.node(-2);
    const grandgrandParent = $from.node(-3);
    const isRangeOfSingleType = isRangeOfType(
      state.doc,
      $from,
      $to,
      state.schema.nodes[listType],
    );

    if (
      ((parent && parent.type === state.schema.nodes[listType]) ||
        (grandgrandParent &&
          grandgrandParent.type === state.schema.nodes[listType])) &&
      isRangeOfSingleType
    ) {
      // Untoggles list
      return liftListItems()(state, dispatch);
    } else {
      // Wraps selection in list and converts list type e.g. bullet_list -> ordered_list if needed
      if (!isRangeOfSingleType) {
        liftListItems()(state, dispatch);
        state = view.state;
      }
      return wrapInList(state.schema.nodes[listType])(state, dispatch);
    }
  };
}

export function toggleBulletList(): Command {
  return toggleList('bulletList');
}

export function toggleOrderedList(): Command {
  return toggleList('orderedList');
}

export function wrapInList(nodeType, attrs?): Command {
  return baseCommand.autoJoin(
    baseListCommand.wrapInList(nodeType, attrs),
    (before, after) => before.type === after.type && before.type === nodeType,
  );
}

export function liftListItems(): Command {
  return function(state, dispatch) {
    const { tr } = state;
    const { $from, $to } = state.selection;

    tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      // Following condition will ensure that block types paragraph, heading, codeBlock, blockquote, panel are lifted.
      // isTextblock is true for paragraph, heading, codeBlock.
      if (
        node.isTextblock ||
        node.type.name === 'blockquote' ||
        node.type.name === 'panel'
      ) {
        const sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
        const range = sel.$from.blockRange(sel.$to);

        if (!range || sel.$from.parent.type !== state.schema.nodes.listItem) {
          return false;
        }

        const target = range && liftTarget(range);

        if (target === undefined || target === null) {
          return false;
        }

        tr.lift(range, target);
      }
    });

    dispatch(tr);

    return true;
  };
}

export function insertBlockType(name: string): Command {
  return function(state, dispatch) {
    const { nodes } = state.schema;

    switch (name) {
      case blockTypes.BLOCK_QUOTE.name:
        if (nodes.paragraph && nodes.blockquote) {
          return wrapSelectionIn(nodes.blockquote)(state, dispatch);
        }
        break;
      case blockTypes.CODE_BLOCK.name:
        if (nodes.codeBlock) {
          return insertCodeBlock()(state, dispatch);
        }
        break;
      case blockTypes.PANEL.name:
        if (nodes.panel && nodes.paragraph) {
          return wrapSelectionIn(nodes.panel)(state, dispatch);
        }
        break;
    }
    return false;
  };
}

/**
 * Function will add wraping node.
 * 1. If currently selected blocks can be wrapped in the warpper type it will wrap them.
 * 2. If current block can not be wrapped inside wrapping block it will create a new block below selection,
 *  and set selection on it.
 */
function wrapSelectionIn(type): Command {
  return function(state: EditorState, dispatch) {
    const { tr } = state;
    const { $from, $to } = state.selection;
    const { paragraph } = state.schema.nodes;
    const range = $from.blockRange($to) as any;
    const wrapping = range && (findWrapping(range, type) as any);
    if (range && wrapping) {
      tr.wrap(range, wrapping).scrollIntoView();
    } else {
      tr.replaceRangeWith(
        $to.pos,
        $to.pos,
        type.createAndFill({}, paragraph.create()),
      );
      tr.setSelection(Selection.near(tr.doc.resolve(state.selection.to + 1)));
    }
    dispatch(tr);
    return true;
  };
}

/**
 * Function will insert code block at current selection if block is empty or below current selection and set focus on it.
 */
export function insertCodeBlock(): Command {
  return function(state: EditorState, dispatch) {
    const { tr } = state;
    const { $to } = state.selection;
    const { codeBlock } = state.schema.nodes;
    const moveSel = $to.node($to.depth).textContent ? 1 : 0;
    tr.replaceRangeWith($to.pos, $to.pos, codeBlock.createAndFill()!);
    tr.setSelection(
      Selection.near(tr.doc.resolve(state.selection.to + moveSel)),
    );
    dispatch(tr);
    return true;
  };
}

export function showLinkPanel(): Command {
  return function(state, dispatch, view) {
    const pluginState = hyperlinkPluginKey.getState(state);
    return pluginState.showLinkPanel(view);
  };
}

export function insertNewLine(): Command {
  return function(state, dispatch) {
    const { $from } = state.selection;
    const node = $from.parent;
    const { hardBreak } = state.schema.nodes;

    if (hardBreak) {
      const hardBreakNode = hardBreak.create();

      if (node.type.validContent(Fragment.from(hardBreakNode))) {
        dispatch(state.tr.replaceSelectionWith(hardBreakNode));
        return true;
      }
    }

    dispatch(state.tr.insertText('\n'));
    return true;
  };
}

export function insertRule(): Command {
  return function(state, dispatch) {
    const { to } = state.selection;
    const { rule } = state.schema.nodes;
    if (rule) {
      const ruleNode = rule.create();
      dispatch(state.tr.insert(to + 1, ruleNode));
      return true;
    }
    return false;
  };
}

export function insertNodesEndWithNewParagraph(nodes: PMNode[]): Command {
  return function(state, dispatch) {
    const { tr, schema } = state;
    const { paragraph } = schema.nodes;

    if (
      (atTheEndOfDoc(state) && atTheBeginningOfBlock(state)) ||
      isTableCell(state)
    ) {
      nodes.push(paragraph.create());
    }

    tr.replaceSelection(new Slice(Fragment.from(nodes), 0, 0));

    dispatch(tr);
    return true;
  };
}

export function createNewParagraphAbove(
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean {
  const append = false;
  if (!canMoveUp(state) && canCreateParagraphNear(state)) {
    createParagraphNear(append)(state, dispatch);
    return true;
  }

  return false;
}

export function createNewParagraphBelow(
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean {
  const append = true;
  if (!canMoveDown(state) && canCreateParagraphNear(state)) {
    createParagraphNear(append)(state, dispatch);
    return true;
  }

  return false;
}

function canCreateParagraphNear(state: EditorState): boolean {
  const { selection: { $from } } = state;
  const node = $from.node($from.depth);
  const insideCodeBlock = !!node && node.type === state.schema.nodes.codeBlock;
  const isNodeSelection = state.selection instanceof NodeSelection;
  return $from.depth > 1 || isNodeSelection || insideCodeBlock;
}

export function createParagraphNear(append: boolean = true): Command {
  return function(state, dispatch) {
    const paragraph = state.schema.nodes.paragraph;

    if (!paragraph) {
      return false;
    }

    let insertPos;

    if (state.selection instanceof TextSelection) {
      if (topLevelNodeIsEmptyTextBlock(state)) {
        return false;
      }
      insertPos = getInsertPosFromTextBlock(state, append);
    } else {
      insertPos = getInsertPosFromNonTextBlock(state, append);
    }

    const tr = state.tr.insert(insertPos, paragraph.createAndFill()!);
    tr.setSelection(TextSelection.create(tr.doc, insertPos + 1));
    dispatch(tr);

    return true;
  };
}

function getInsertPosFromTextBlock(state: EditorState, append: boolean): void {
  const { $from, $to } = state.selection;
  let pos;
  if (!append) {
    pos = $from.start(0);
  } else {
    pos = $to.end(0);
  }
  return pos;
}

function getInsertPosFromNonTextBlock(
  state: EditorState,
  append: boolean,
): void {
  const { $from, $to } = state.selection;
  const nodeAtSelection =
    state.selection instanceof NodeSelection &&
    state.doc.nodeAt(state.selection.$anchor.pos);
  const isMediaSelection =
    nodeAtSelection && nodeAtSelection.type.name === 'mediaGroup';

  let pos;
  if (!append) {
    // The start position is different with text block because it starts from 0
    pos = $from.start($from.depth);
    // The depth is different with text block because it starts from 0
    pos = $from.depth > 0 && !isMediaSelection ? pos - 1 : pos;
  } else {
    pos = $to.end($to.depth);
    pos = $to.depth > 0 && !isMediaSelection ? pos + 1 : pos;
  }
  return pos;
}

function topLevelNodeIsEmptyTextBlock(state): boolean {
  const topLevelNode = state.selection.$from.node(1);
  return (
    topLevelNode.isTextblock &&
    topLevelNode.type !== state.schema.nodes.codeBlock &&
    topLevelNode.nodeSize === 2
  );
}

export function createParagraphAtEnd(): Command {
  return function(state, dispatch) {
    const { doc, tr, schema: { nodes } } = state;
    const lastPos = doc.resolve(doc.content.size - 1);
    const lastNode = lastPos.node(1);
    if (
      lastNode &&
      !(lastNode.type === nodes.paragraph && lastNode.content.size === 0)
    ) {
      tr.insert(doc.content.size, nodes.paragraph.createAndFill()!);
    }
    tr.setSelection(TextSelection.create(tr.doc, tr.doc.content.size - 1));
    tr.scrollIntoView();
    dispatch(tr);
    return true;
  };
}

export function changeIndent(dir = 1): Command {
  return function(state: EditorState, dispatch, view) {
    const { selection } = state;
    const { $from, $to } = selection;
    const { paragraph, heading, bulletList, orderedList } = state.schema.nodes;
    const node = $to.node(1);

    if (node) {
      const indentLevel = node.attrs.indentLevel || 0;
      const inLimit = dir === 1 ? indentLevel < 6 : indentLevel >= 1;
      if (indentLevel && !inLimit) {
        return true;
      }
      if (inLimit) {
        const attrs: { [key: string]: any } = {};
        if (node.type === heading) {
          attrs.level = node.attrs['level'];
        }
        // indentLevel should be set null if its decreased to 0.
        attrs.indentLevel = indentLevel + dir || null;
        if (node.type === paragraph || node.type === heading) {
          dispatch(state.tr.setBlockType($to.pos, $to.pos, node.type, attrs));
          return true;
        }
        if (
          (node.type === bulletList || node.type === orderedList) &&
          $to.depth === 3
        ) {
          const listStart = $to.start(1);
          const firstlistPos = state.doc.resolve(listStart + 2);
          if ($to.pos <= firstlistPos.end(3)) {
            let tr = state.tr;
            const newNode = node.type.create(
              { indentLevel: indentLevel + dir },
              node.content,
            );
            tr = tr.replaceRangeWith($to.start(1), $to.end(1), newNode);
            tr = tr.setSelection(
              new TextSelection(
                tr.doc.resolve($from.pos),
                tr.doc.resolve($to.pos),
              ),
            );
            dispatch(tr);
            return true;
          }
        }
      }
    }
    return false;
  };
}

export interface Command {
  (
    state: EditorState,
    dispatch: (tr: Transaction) => void,
    view?: EditorView,
  ): boolean;
}
