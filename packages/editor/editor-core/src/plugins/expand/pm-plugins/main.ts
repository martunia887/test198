import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { hasParentNodeOfType, findParentDomRefOfType } from 'prosemirror-utils';
import { Dispatch } from '../../../event-dispatcher';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import ExpandNodeView from '../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { setExpandRef } from '../commands';
import reducer from '../reducer';

export const pluginKey = new PluginKey('expandPlugin');

const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
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
          const {
            selection,
            schema: {
              nodes: { expand, nestedExpand },
            },
          } = state;
          if (hasParentNodeOfType([expand, nestedExpand])(selection)) {
            const expandRef = findParentDomRefOfType(
              [expand, nestedExpand],
              domAtPos,
            )(selection) as HTMLDivElement;
            if (getPluginState(state).expandRef !== expandRef) {
              setExpandRef(expandRef)(state, dispatch);
            }
          }
        },
      };
    },
  });
};

export { createCommand, getPluginState };
