// TODO: do dynamic import
import * as firebase from 'firebase/app';
import 'firebase/database';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common';
import { findParentNodeOfType, getCellsInColumn } from 'prosemirror-utils';
// import { traverse } from '@atlaskit/adf-utils';

import { ReferenceProvider } from '../../refs/provider';
import { getPluginState as getTablePluginState } from '../../table/pm-plugins/main';
import { addPushRef, setDatabase } from '../actions';
// import { handleSetProvider } from '../action-handlers';

export const pluginKey = new PluginKey('refsServerPlugin');

type Obj<K = string, V = string> = { [key: string]: string };
export type PullRef = Obj<Obj>;
export type PushRefs = Obj<Obj>;

export interface RefsServerPluginState {
  localRefs: Obj;
  pullRefs: Obj<PullRef>;
  pushRefs: PushRefs;
  database?: firebase.database.Database;
}

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAB7Se6hXJMOgt3MCsvvhsXT7UtZ4Z5M24',
  authDomain: 'fabric-editor-refs.firebaseapp.com',
  databaseURL: 'https://fabric-editor-refs.firebaseio.com',
  projectId: 'fabric-editor-refs',
  storageBucket: 'fabric-editor-refs.appspot.com',
  messagingSenderId: '230682376459',
};

export enum REFS_SERVER_ACTIONS {
  ADD_PUSH_REF,
  SET_DATABASE,
}

// const hasIdAndTitle = (attrs?: {
//   [key: string]: any;
// }): attrs is { id: string; title: string } => attrs && attrs.id && attrs.title;

// const populateRefs = (doc, localRefs, pullRefs, pushRefs) => {
//   traverse(doc as any, {
//     table: table => {
//       if (hasIdAndTitle(table.attrs)) {
//         const { id, title } = table.attrs;
//         localRefs[id] = title;
//       }
//     },
//     tableHeader: (tableHeader, parent) => {
//       if (
//         tableHeader.attrs &&
//         tableHeader.attrs.id &&
//         tableHeader.attrs.reference
//       ) {
//         if (
//           parent.parent &&
//           parent.parent.node &&
//           parent.parent.node.attrs &&
//           parent.parent.node.attrs.id
//         ) {
//           const [
//             sourceDocId,
//             sourceTableRefId,
//             sourceColumnRefId,
//           ] = (tableHeader.attrs.reference as string).split(':');

//           const tableRefId = parent.parent.node.attrs.id;
//           pullRefs[sourceDocId] = pullRefs[sourceDocId] || {};
//           pullRefs[sourceDocId][sourceTableRefId] =
//             pullRefs[sourceDocId][sourceTableRefId] || {};

//           pullRefs[sourceDocId][sourceTableRefId][sourceColumnRefId] = [
//             tableRefId,
//             tableHeader.attrs.id,
//           ];
//         }
//       }
//     },
//   });
// };

// const subscribeToPush = (
//   fireDb: firebase.database.Database,
//   docId: string,
//   ref: PullRef,
// ) => {
//   const docRef = fireDb.ref(`docs/${docId}`);
//   docRef.on('value', snapshot => {
//     if (snapshot) {
//       console.log(snapshot.val());
//     }
//   });
// };

export const createPlugin = (providerFactory: ProviderFactory) =>
  new Plugin({
    key: pluginKey,
    state: {
      init: (): RefsServerPluginState => {
        const localRefs = {};
        const pullRefs = {};
        const pushRefs = {};
        // if (editorProps.defaultValue) {
        //   let doc = editorProps.defaultValue;
        //   if (typeof doc === 'string') {
        //     try {
        //       doc = JSON.parse(doc);
        //     } catch {
        //       doc = { type: 'doc' };
        //     }
        //   }
        //   populateRefs(doc, localRefs, pullRefs, pushRefs);
        // }

        // Object.keys(pullRefs).forEach(docId =>
        //   subscribeToPush(fireDb, docId, pullRefs[docId]),
        // );

        return { localRefs, pushRefs, pullRefs };
      },
      apply(tr, pluginState: RefsServerPluginState, oldState, newState) {
        const meta = tr.getMeta(pluginKey) || {};
        const data = meta.data || {};

        if (tr.docChanged) {
          const tableState = getTablePluginState(oldState);
          if (tableState && tableState.editorHasFocus && tableState.tableNode) {
            const { id } = tableState.tableNode.attrs;
            const colRef = pluginState.pushRefs[id];
            if (colRef) {
              const { schema, selection } = newState;
              const cell = findParentNodeOfType(schema.nodes.tableCell)(
                selection,
              );
              if (cell) {
                const $pos = newState.doc.resolve(cell.pos);
                const columnIndex = $pos.index($pos.depth);
                const cells = getCellsInColumn(columnIndex)(selection);
                if (cells && cells.length > 1) {
                  const header = cells[0];
                  if (colRef === header.node.attrs.id) {
                    console.log('Release the 🐙');
                  }
                }
              }
            }
          }
        }

        const { pushRefs, database } = data;
        switch (meta.action) {
          case REFS_SERVER_ACTIONS.SET_DATABASE:
            return {
              ...pluginState,
              database,
            };

          case REFS_SERVER_ACTIONS.ADD_PUSH_REF:
            return {
              ...pluginState,
              pushRefs: { ...pluginState.pushRefs, ...pushRefs },
            };
        }

        return pluginState;
      },
    },
    view: view => {
      const { state, dispatch } = view;
      let docRef: firebase.database.Reference;

      firebase.initializeApp(FIREBASE_CONFIG);
      // firebase.database.enableLogging(true);
      const database = firebase.database();
      setDatabase(database)(state, dispatch);

      const providerHandler = async (
        _,
        $provider: Promise<ReferenceProvider>,
      ) => {
        const provider = await $provider;

        const docId = provider.getDocumentId();
        if (docRef) {
          docRef.off('value');
        }
        docRef = database.ref(`docs/${docId}`);

        docRef.on('value', snapshot => {
          if (snapshot) {
            addPushRef(snapshot.val())(state, dispatch);
          }
        });
      };

      // make sure editable DOM node is mounted
      if (view.dom.parentNode) {
        providerFactory.subscribe('referenceProvider', providerHandler);
      }

      return {
        destroy() {
          if (providerFactory) {
            providerFactory.unsubscribe('referenceProvider', providerHandler);
          }
          if (docRef) {
            docRef.off('value');
          }
        },
      };
    },
  });

export const getPluginState = (state: EditorState) => {
  return pluginKey.getState(state);
};
