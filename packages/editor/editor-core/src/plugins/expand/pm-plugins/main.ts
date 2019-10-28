import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  findDomRefAtPos,
  findParentNodeOfType,
  findTable,
} from 'prosemirror-utils';
import { Dispatch } from '../../../event-dispatcher';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import ExpandNodeView from '../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import reducer from '../reducer';
import { setExpand, setParentLayout } from '../commands';

export const pluginKey = new PluginKey('expandPlugin');

const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
  {
    mapping: (tr, pluginState) => {
      if (tr.docChanged && pluginState.expandPosition) {
        const { pos, deleted } = tr.mapping.mapResult(
          pluginState.expandPosition,
        );
        return {
          ...pluginState,
          expandPosition: deleted ? undefined : pos,
        };
      }
      return pluginState;
    },
  },
);

export const createPlugin = (
  dispatch: Dispatch,
  portalProviderAPI: PortalProviderAPI,
) => {
  const state = createPluginState(dispatch, {});

  return new Plugin({
    state: state,
    key: pluginKey,
    props: {
      nodeViews: {
        expand: ExpandNodeView(portalProviderAPI),
        nestedExpand: ExpandNodeView(portalProviderAPI),
      },
    },
    view: (editorView: EditorView) => {
      const domAtPos = editorView.domAtPos.bind(editorView);

      return {
        update: (view: EditorView) => {
          const { state, dispatch } = view;
          const expand = findParentNodeOfType([
            state.schema.nodes.nestedExpand,
            state.schema.nodes.expand,
          ])(state.selection);
          const expandNode = expand ? expand.node : undefined;
          const expandPosition = expand ? expand.pos : undefined;
          const expandRef =
            typeof expandPosition !== 'undefined'
              ? (findDomRefAtPos(expandPosition, domAtPos) as HTMLDivElement)
              : undefined;
          const pluginState = getPluginState(state);

          if (
            pluginState.expandNode !== expandNode ||
            pluginState.expandRef !== expandRef ||
            pluginState.expandPosition !== expandPosition
          ) {
            setExpand(expandNode, expandPosition, expandRef)(state, dispatch);
          }
          const table = findTable(state.selection);
          if (table && pluginState.parentLayout !== table.node.attrs.layout) {
            setParentLayout(table.node.attrs.layout)(state, dispatch);
          }
        },
      };
    },
  });
};

export { createCommand, getPluginState };
