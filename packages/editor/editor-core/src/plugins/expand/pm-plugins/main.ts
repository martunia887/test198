import { Plugin, PluginKey } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import ExpandNodeView from '../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';

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
      },
    },
  });
};

export { createCommand, getPluginState };
