import { Dispatch } from '../../event-dispatcher';
import { RefsPluginState, pluginKey } from './pm-plugins/main';

export const handleToggleReference = (
  nodePosition: number,
  pluginState: RefsPluginState,
  dispatch: Dispatch,
) => {
  const nextPluginState = {
    ...pluginState,
    nodePosition,
    showReferenceMenu: !pluginState.showReferenceMenu,
  };
  dispatch(pluginKey, nextPluginState);
  return nextPluginState;
};
