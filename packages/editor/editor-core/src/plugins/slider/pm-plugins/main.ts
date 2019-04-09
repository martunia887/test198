import { Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { findSelectedNodeOfType } from 'prosemirror-utils';

import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { sliderNodeViewFactory } from '../nodeviews/slider';
import { Dispatch } from '../../../event-dispatcher';

export const pluginKey = new PluginKey('sliderPlugin');

export interface SliderState {
  pos?: number;
}

const mapTransaction = (
  pluginState: SliderState,
  tr: Transaction,
  dispatch: Dispatch,
) => {
  const { schema } = tr.doc.type;
  if (findSelectedNodeOfType(schema.nodes.slider)(tr.selection)) {
    const newPluginState = {
      ...pluginState,
      pos: tr.selection.$from.pos,
    };
    dispatch(pluginKey, newPluginState);
    return newPluginState;
  }

  const newPluginState = {
    ...pluginState,
    pos: undefined,
  };
  dispatch(pluginKey, newPluginState);
  return newPluginState;
};

export default function sliderPluginFactory(
  dispatch: Dispatch,
  portalProviderAPI: PortalProviderAPI,
) {
  return new Plugin({
    key: pluginKey,
    state: {
      init: (): SliderState => {
        return {};
      },
      apply: (tr, pluginState) => {
        if (tr.docChanged || tr.selectionSet) {
          return mapTransaction(pluginState, tr, dispatch);
        }
        return pluginState;
      },
    },
    props: {
      nodeViews: {
        slider: sliderNodeViewFactory(portalProviderAPI),
      },
    },
  });
}
