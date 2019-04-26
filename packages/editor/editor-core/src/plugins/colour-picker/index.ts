import debounce from 'lodash.debounce';

import { Plugin, PluginKey, EditorState, Transaction } from 'prosemirror-state';
import { EditorView, DecorationSet, Decoration } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { Mapping } from 'prosemirror-transform';

import { EditorPlugin, PMPluginFactory } from '../../types';

export const pluginKey = new PluginKey('colourPickerPlugin');

type HashCode = {
  pos: number;
  value: string;
  dom?: HTMLDivElement;
  input?: HTMLInputElement;
  changeListener?: (e: Event) => any;
};

interface PluginState {
  set: DecorationSet;
  hashCodes: HashCode[];
}

const rx = /#([A-Fa-f0-9]{6})/g;

// returns a list of hashCodes for each instance (eg. #ff0000) within the document.
const getHashCodes = (node: PMNode, pos: number): HashCode[] => {
  const hashCodes: HashCode[] = [];
  node.forEach((child, offset) => {
    const totalOffset = pos + offset + 1;
    if (child.isText) {
      let result: RegExpExecArray | null;
      while ((result = rx.exec(child.textContent)) !== null) {
        hashCodes.push({
          pos: totalOffset + rx.lastIndex - result[0].length - 1,
          value: result[0],
        });
      }
    } else if (child.childCount > 0) {
      hashCodes.push(...getHashCodes(child, totalOffset));
    }
  });
  return hashCodes;
};

// modifies the pos value in accordance with the mapping
const mapHashCode = (mapping: Mapping, hashCode: HashCode): HashCode => ({
  ...hashCode,
  pos: mapping.maps.reduce<number>(
    (pos, stepMap) => stepMap.map(pos),
    hashCode.pos,
  ),
});

const mapHashCodes = (mapping: Mapping, hashCodes: HashCode[]): HashCode[] =>
  hashCodes.map(hashCode => mapHashCode(mapping, hashCode));

// Renders and returns the colour blob element
const renderDecoration = (
  hashCode: HashCode,
): { dom: HTMLDivElement; input: HTMLInputElement } => {
  const input = document.createElement('input');
  input.type = 'color';
  input.value = hashCode.value;

  const dom = document.createElement('div');
  dom.className = 'ProseMirror-colour-picker';
  dom.style.backgroundColor = hashCode.value;
  dom.appendChild(input);

  input.addEventListener('input', e => {
    e.preventDefault();
    e.stopPropagation();
  });
  input.addEventListener(
    'change',
    e => (dom.style.backgroundColor = input.value),
  );
  return { dom, input };
};

function updateChangeEvent(
  hashCode: HashCode,
  onchange: (e: Event) => any,
): HashCode {
  if (!hashCode.input) {
    return hashCode;
  }
  if (hashCode.changeListener) {
    hashCode.input.removeEventListener('change', hashCode.changeListener);
  }
  hashCode.input.addEventListener('change', onchange);
  hashCode.changeListener = onchange;
  return hashCode;
}

const createPlugin: PMPluginFactory = ({ portalProviderAPI }) => {
  let onchange: (hashCode: HashCode, e: Event) => any;

  const colourPicker: Plugin = new Plugin({
    key: pluginKey,

    view(editorView: EditorView) {
      // Make changes to the editor as the editor changes the colour value in the picker.
      onchange = debounce(
        (hashCode: HashCode, e: any) =>
          editorView.dispatch(
            editorView.state.tr.insertText(
              e.target.value,
              hashCode.pos,
              hashCode.pos + 7,
            ),
          ),
        200,
      );
      return {};
    },

    state: {
      init(_, state: EditorState): PluginState {
        const hashCodes = getHashCodes(state.doc, 0).map(hashCode => ({
          ...hashCode,
          ...renderDecoration(hashCode),
        }));
        hashCodes.forEach(hashCode =>
          updateChangeEvent(hashCode, (e: Event) => onchange(hashCode, e)),
        );
        const set = DecorationSet.create(
          state.doc,
          hashCodes.map(hashCode =>
            Decoration.widget(hashCode.pos, hashCode.dom),
          ),
        );
        return { set, hashCodes };
      },

      apply(transaction: Transaction, state: PluginState): PluginState {
        const newHashCodes = getHashCodes(transaction.doc, 0);
        const mappedSet = state.set.map(transaction.mapping, transaction.doc);
        const oldHashCodes = mapHashCodes(transaction.mapping, state.hashCodes);
        // find all decorations that need to be removed this transaction
        const removeDecorations = oldHashCodes.reduce<Decoration[]>(
          (acc, oldHashCode) => {
            const existingHashCode = newHashCodes.find(
              hashCode => hashCode.pos == oldHashCode.pos,
            );
            if (!existingHashCode) {
              const decorations = mappedSet.find(
                oldHashCode.pos,
                oldHashCode.pos,
              );
              return [...acc, ...decorations];
            }
            return acc;
          },
          [],
        );
        // generate an updated list of hashCodes, rendering new ones and updating existing decorations as required
        const hashCodes = newHashCodes.map(hashCode => {
          const existingHashCode = oldHashCodes.find(
            oldHashCode => oldHashCode.pos == hashCode.pos,
          );
          if (existingHashCode) {
            //update existing hashcode
            if (
              existingHashCode.input &&
              existingHashCode.input.value != hashCode.value
            ) {
              existingHashCode.input.value = hashCode.value;
            }
            updateChangeEvent(existingHashCode, (e: Event) =>
              onchange(existingHashCode, e),
            );
            return { ...existingHashCode, value: hashCode.value };
          } else {
            // add a new hashcode
            const { dom, input } = renderDecoration(hashCode);
            updateChangeEvent(hashCode, (e: Event) => onchange(hashCode, e));
            return { ...hashCode, dom, input };
          }
        });
        // find all decorations that need to be added this transaction
        const newDecorations = hashCodes.reduce<Decoration[]>(
          (acc, hashCode) => {
            const decorations = mappedSet.find(hashCode.pos, hashCode.pos);
            if (decorations.length === 0 && hashCode.dom) {
              return [...acc, Decoration.widget(hashCode.pos, hashCode.dom)];
            }
            return acc;
          },
          [],
        );
        // calculate the updated state
        const set = mappedSet
          .remove(removeDecorations)
          .add(transaction.doc, newDecorations);
        return { set, hashCodes };
      },
    },

    props: {
      decorations(state: EditorState) {
        return colourPicker.getState(state).set;
      },
    },
  });
  return colourPicker;
};

const colourPickerPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      {
        name: 'colourPicker',
        plugin: createPlugin,
      },
    ];
  },
};

export default colourPickerPlugin;
