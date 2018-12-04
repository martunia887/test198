import { Plugin, PluginKey, EditorState, Transaction } from 'prosemirror-state';
import { uuid } from '@atlaskit/editor-common';

export const stateKey = new PluginKey('uniqueIdsPlugin');

export function createUniqueIdsPlugin() {
  return new Plugin({
    key: stateKey,
    /*
     * After each transaction, we search through the document for any nodes
     * that have an id attribute set to "null" and generate a random UUID to use.
     * See https://discuss.prosemirror.net/t/release-0-23-0-possibly-to-be-1-0-0/959/17 for a discussion of this approach.
     */
    appendTransaction: (
      transactions: Transaction[],
      oldState: EditorState,
      state: EditorState,
    ) => {
      const { tr } = state;
      if (transactions.some(transaction => transaction.docChanged)) {
        let modified = false;
        state.doc.descendants((node, pos) => {
          if (node.attrs.id === null) {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              id: uuid.generate(),
            });
            modified = true;
          }
        });
        if (modified) {
          return tr;
        }
      }
    },
  });
}

export default {
  pmPlugins() {
    return [
      {
        name: 'unique-ids',
        plugin: () => {
          return createUniqueIdsPlugin();
        },
      },
    ];
  },
};
