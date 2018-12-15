import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import { arrow, deleteNode } from '../actions';
import { Direction } from '../direction';
import { Command } from '../../../types';
import { splitListItem } from 'prosemirror-schema-list';
import { setTextSelection } from 'prosemirror-utils';

// export function testFunc(
//   tr
// ) {
//   console.log('from:', tr.selection.from)
//   return tr
// }

const enterKeyCommand: Command = (state, dispatch): boolean => {
  const { selection } = state;
  console.log('Handling gap cursor enter');
  const { listItem, paragraph } = state.schema.nodes;
  // return splitListItem(listItem)(state, dispatch);
  const { $from, $to } = state.selection;
  const tr = state.tr.insert(
    $to.pos + 1, // + 1,
    paragraph.createChecked({}),
  );
  if (dispatch) {
    dispatch(
      setTextSelection($to.pos + 1)(tr)
        // setTextSelection($to.pos + 7)(tr)
        .delete($from.pos + 3, $from.pos + 4)
        // .delete($from.pos - 1, $from.pos)
        .scrollIntoView(),
    );
  }

  // if (selection.empty) {
  // return fallback(input, position)alse;
  // const { $from } = selection;
  // const { listItem, codeBlock } = state.schema.nodes;
  // const node = $from.node($from.depth);
  // const wrapper = $from.node($from.depth - 1);

  // if (wrapper && wrapper.type === listItem) {
  //   const wrapperHasContent = hasVisibleContent(wrapper);
  //   if (node.type === codeBlock || (isEmptyNode(node) && !wrapperHasContent )) {
  //     return outdentList()(state, dispatch);
  //   } else {
  //     return splitListItem(listItem)(state, dispatch);
  //   }
  // }
  // }

  //return false gives you two newlines, true only one
  return true;
};

/*
    Enter: (state: EditorState, dispatch) => {
      const {
        selection,
        schema: { nodes },
      } = state;
      const { $from, $to } = selection;
      const node = $from.node($from.depth);

      const selectionIsAtEndOfCodeBlock =
        node &&
        node.type === nodes.codeBlock &&
        $from.parentOffset === $from.parent.nodeSize  2 && // cursor offset is at the end of block
        $from.indexAfter($from.depth) === node.childCount; // paragraph is the last child of code block
      const codeBlockEndsWithNewLine =
        node.lastChild &&
        node.lastChild.text &&
        node.lastChild.text.endsWith('\n');

      if (selectionIsAtEndOfCodeBlock && codeBlockEndsWithNewLine) {
        const tr = state.tr.insert(
          $to.pos + 1,
          nodes.paragraph.createChecked({}),
        );

        dispatch(
          setTextSelection($to.pos + 1)(tr)
            .delete($from.pos  1, $from.pos)
            .scrollIntoView(),
        );
        return true;
      }
      return false;
    },
    const { listItem } = state.schema.nodes;
      if (isEmptyNode(node) && !wrapperHasContent) {
*/

export default function keymapPlugin(): Plugin {
  const map = {};

  keymaps.bindKeymapWithCommand(
    keymaps.enter.common!,
    enterKeyCommand,
    // (state, dispatch, view) => {
    //   const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
    //   return arrow(Direction.LEFT, endOfTextblock)(state, dispatch);
    // },
    map,
  );
  // keymaps.bindKeymapWithCommand(keymaps.enter.common!!,

  keymaps.bindKeymapWithCommand(
    keymaps.moveLeft.common!,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.LEFT, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveRight.common!,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.RIGHT, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common!,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.UP, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    (state, dispatch, view) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.DOWN, endOfTextblock)(state, dispatch);
    },
    map,
  );

  // default PM's Backspace doesn't handle removing block nodes when cursor is after it
  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common!,
    deleteNode(Direction.BACKWARD),
    map,
  );

  // handle Delete key (remove node after the cursor)
  keymaps.bindKeymapWithCommand(
    keymaps.deleteKey.common!,
    deleteNode(Direction.FORWARD),
    map,
  );

  return keymap(map);
}
