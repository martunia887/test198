import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView, Decoration, DecorationSet } from 'prosemirror-view';
import { getCellsInRow, getCellsInColumn } from 'prosemirror-utils';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Dispatch } from '../../../event-dispatcher';
import { handleUpdateTitleTarget, handleSetProvider } from '../action-handlers';
import { ReferenceProvider } from '../provider';
import { setReferenceProvider } from '../actions';

export const pluginKey = new PluginKey('refsPlugin');

export interface RefsPluginState {
  nodePosition?: number;
  titleMenuTarget?: HTMLElement;
  provider: ReferenceProvider | null;
}

export enum REFS_ACTIONS {
  UPDATE_TITLE_TARGET,
  SET_PROVIDER,
}

export const createPlugin = (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
) =>
  new Plugin({
    state: {
      init: (): RefsPluginState => {
        return {
          provider: null,
        };
      },
      apply(tr: Transaction, _pluginState: RefsPluginState) {
        const meta = tr.getMeta(pluginKey) || {};
        const data = meta.data || {};
        const { nodePosition, titleMenuTarget, provider } = data;

        let pluginState = { ..._pluginState };

        if (tr.docChanged && pluginState.nodePosition) {
          const { pos, deleted } = tr.mapping.mapResult(
            pluginState.nodePosition,
          );
          pluginState = {
            ...pluginState,
            nodePosition: deleted ? undefined : pos,
          };
        }

        switch (meta.action) {
          case REFS_ACTIONS.UPDATE_TITLE_TARGET:
            return handleUpdateTitleTarget(nodePosition, titleMenuTarget)(
              pluginState,
              dispatch,
            );
          case REFS_ACTIONS.SET_PROVIDER:
            return handleSetProvider(provider)(pluginState, dispatch);

          default:
            break;
        }

        return pluginState;
      },
    },
    key: pluginKey,
    view: (view: EditorView) => {
      const providerHandler = (name, provider: Promise<ReferenceProvider>) => {
        setReferenceProvider(provider)(view.state, view.dispatch);
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
        },
      };
    },
    props: {
      // disable editing in columns that have references
      decorations: state => {
        const { schema, selection } = state;
        let decorations: Decoration[] = [];

        state.doc.descendants((node, pos) => {
          if (node.type === schema.nodes.table) {
            const columns = getCellsInRow(0)(selection);
            if (columns) {
              columns.forEach((headerCell, columnIndex) => {
                if (headerCell.node.attrs.reference) {
                  const cells = getCellsInColumn(columnIndex)(selection);
                  if (cells) {
                    cells.forEach(cell => {
                      decorations.push(
                        Decoration.node(
                          cell.pos,
                          cell.pos + cell.node.nodeSize,
                          { contentEditable: false } as any,
                        ),
                      );
                    });
                  }
                }
              });
            }
          }
        });

        if (decorations.length) {
          return DecorationSet.create(state.doc, decorations);
        }

        return null;
      },
    },
  });

export const getPluginState = (state: EditorState) => {
  return pluginKey.getState(state);
};
