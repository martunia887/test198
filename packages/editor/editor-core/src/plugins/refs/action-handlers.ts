import { Dispatch } from '../../event-dispatcher';
import { RefsPluginState, pluginKey } from './pm-plugins/main';

export const handleUpdateTitleTarget = (
  nodePosition?: number,
  titleMenuTarget?: HTMLElement,
) => (pluginState: RefsPluginState, dispatch: Dispatch) => {
  const nextPluginState = {
    ...pluginState,
    nodePosition,
    titleMenuTarget,
  };
  dispatch(pluginKey, nextPluginState);
  return nextPluginState;
};
