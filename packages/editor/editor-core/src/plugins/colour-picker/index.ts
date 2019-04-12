import { Plugin, PluginKey, EditorState, Transaction } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { EditorPlugin, PMPluginFactory } from '../../types';
import { Mapping } from 'prosemirror-transform';

export const pluginKey = new PluginKey('colourPickerPlugin');

type HashCode = {
  pos: number;
  value: string;
  active: boolean;
  div?: HTMLDivElement;
};

interface PluginState {
  set: DecorationSet;
  hashCodes: HashCode[];
}

// TODO: const rx = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
const rx = /#([A-Fa-f0-9]{6})/g;

// returns a list of hashCodes for each instance (eg. #ff0000) within the document.
const getHashCodes = (node: PMNode, pos: number): HashCode[] => {
  const hashCodes: HashCode[] = [];
  node.forEach((child, offset) => {
    const totalOffset = pos + offset;
    if (child.isText) {
      let result: RegExpExecArray | null;
      while ((result = rx.exec(child.textContent)) !== null) {
        hashCodes.push({
          active: false,
          pos: totalOffset + rx.lastIndex - result[0].length + 1,
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
const renderDecoration = (hashCode: HashCode): HTMLDivElement => {
  const div = document.createElement('div');
  div.setAttribute('style', `background: ${hashCode.value}`);
  div.className = 'ProseMirror-colour-picker';
  return div;
};

const createPlugin: PMPluginFactory = ({ portalProviderAPI }) => {
  const colourPicker: Plugin = new Plugin({
    key: pluginKey,
    state: {
      init(_, state: EditorState): PluginState {
        const hashCodes = getHashCodes(state.doc, 0).map(hashCode => ({
          ...hashCode,
          active: true,
          div: renderDecoration(hashCode),
        }));
        const set = DecorationSet.create(
          state.doc,
          hashCodes.map(hashCode =>
            Decoration.widget(hashCode.pos, hashCode.div),
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
        const updatedHashCodes = newHashCodes.map(hashCode => {
          const existingHashCode = oldHashCodes.find(
            oldHashCode => oldHashCode.pos == hashCode.pos,
          );
          if (existingHashCode) {
            if (existingHashCode.div) {
              existingHashCode.div.setAttribute(
                'style',
                `background: ${hashCode.value}`,
              );
            }
            return { ...existingHashCode, value: hashCode.value };
          } else {
            return { ...hashCode, div: renderDecoration(hashCode) };
          }
        });
        // find all decorations that need to be added this transaction
        const newDecorations = updatedHashCodes.reduce<Decoration[]>(
          (acc, hashCode) => {
            if (!hashCode.active && hashCode.div) {
              return [...acc, Decoration.widget(hashCode.pos, hashCode.div)];
            }
            return acc;
          },
          [],
        );
        // calculate the updated state
        const set = mappedSet
          .remove(removeDecorations)
          .add(transaction.before, newDecorations);
        const hashCodes = updatedHashCodes.map(hashCode => ({
          ...hashCode,
          active: true,
        }));
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
