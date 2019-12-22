import { Plugin, PluginKey } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';

import { Dispatch } from '../../../event-dispatcher';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import { setExpandRef } from '../commands';
import ExpandNodeView from '../nodeviews';
import reducer from '../reducer';
import { expandClassNames } from '../ui/class-names';
import { findExpand } from '../utils';

export const pluginKey = new PluginKey('expandPlugin');

function containsClass(
  element: Element | null,
  className: string,
): element is Element {
  return !!element && element.classList.contains(className);
}

const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
);

export const createPlugin = (
  dispatch: Dispatch,
  reactContext: () => { [key: string]: any },
) => {
  const state = createPluginState(dispatch, {});

  return new Plugin({
    state: state,
    key: pluginKey,
    props: {
      nodeViews: {
        expand: ExpandNodeView(reactContext),
        nestedExpand: ExpandNodeView(reactContext),
      },
      handleKeyDown(_view, event) {
        return containsClass(
          event.target as Element,
          expandClassNames.titleContainer,
        );
      },
      handleKeyPress(_view, event) {
        return containsClass(
          event.target as Element,
          expandClassNames.titleContainer,
        );
      },
    },
    // @see ED-8027 to follow up on this work-around
    filterTransaction(tr) {
      if (
        containsClass(document.activeElement, expandClassNames.titleInput) &&
        tr.selectionSet &&
        (!tr.steps.length || tr.isGeneric)
      ) {
        return false;
      }
      return true;
    },
    view: (editorView: EditorView) => {
      const domAtPos = editorView.domAtPos.bind(editorView);

      return {
        update: (view: EditorView) => {
          const { state, dispatch } = view;
          const node = findExpand(state);
          if (node) {
            const expandRef = findDomRefAtPos(
              node.pos,
              domAtPos,
            ) as HTMLDivElement;
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
