import { Plugin, PluginKey } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { pluginFactory } from '../../../utils/plugin-state-factory';
export const pluginKey = new PluginKey('smartLocationPlugin');
import { InlineLocationCard } from '../nodeviews/location';

interface SmartLocationPluginState {
  modalOpen: boolean;
}

type SmartLocationPluginAction = {
  type: 'TOGGLE_MODAL';
};

function reducer(
  pluginState: SmartLocationPluginState,
  action: SmartLocationPluginAction,
) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return { ...pluginState, modalOpen: !pluginState.modalOpen };
    default:
      return pluginState;
  }
}

const { createPluginState, createCommand } = pluginFactory(pluginKey, reducer);

const createPlugin = (
  dispatch: Dispatch,
  portalProviderAPI: PortalProviderAPI,
) =>
  new Plugin({
    state: createPluginState(dispatch, { modalOpen: false }),
    key: pluginKey,
    props: {
      nodeViews: {
        inlineLocation: (node, view, getPos) => {
          return new InlineLocationCard(
            node,
            view,
            getPos,
            portalProviderAPI,
            {},
          ).init();
        },
      },
    },
  });

export { createCommand };
export default createPlugin;
