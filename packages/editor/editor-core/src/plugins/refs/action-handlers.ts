import { Dispatch } from '../../event-dispatcher';
import { RefsPluginState, pluginKey } from './pm-plugins/main';
import { ReferenceProvider } from './provider';

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

export const handleSetProvider = (provider: ReferenceProvider) => (
  pluginState: RefsPluginState,
  dispatch: Dispatch,
) => {
  const nextPluginState = {
    ...pluginState,
    provider,
  };
  dispatch(pluginKey, nextPluginState);
  return nextPluginState;
};
