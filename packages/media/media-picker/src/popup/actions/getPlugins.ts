import { Action } from 'redux';
import { MediaPickerPlugin } from '../../domain/plugin';

export const GET_PLUGINS = 'GET_PLUGINS';

export interface GetPluginsAction extends Action {
  type: 'GET_PLUGINS';
}

export const isGetPluginsAction = (
  action: Action,
): action is GetPluginsAction => {
  return action.type === GET_PLUGINS;
};

export const getPlugins = (): GetPluginsAction => {
  return {
    type: GET_PLUGINS,
  };
};

export const GET_PLUGINS_FULLFILLED = 'GET_PLUGINS_FULLFILLED';

export interface GetPluginsFullfilledAction {
  readonly type: 'GET_PLUGINS_FULLFILLED';
  readonly items: MediaPickerPlugin[];
}

export const isGetPluginsFullfilledAction = (
  action: Action,
): action is GetPluginsFullfilledAction => {
  return action.type === GET_PLUGINS_FULLFILLED;
};

export function getPluginsFullfilled(
  items: MediaPickerPlugin[],
): GetPluginsFullfilledAction {
  return {
    type: GET_PLUGINS_FULLFILLED,
    items,
  };
}

export const GET_PLUGINS_FAILED = 'GET_PLUGINS_FAILED';

export interface GetPluginsFailedAction {
  readonly type: 'GET_PLUGINS_FAILED';
}

export const isGetPluginsFailedAction = (
  action: Action,
): action is GetPluginsFailedAction => {
  return action.type === GET_PLUGINS_FAILED;
};

export function getPluginsFailed(): GetPluginsFailedAction {
  return {
    type: GET_PLUGINS_FAILED,
  };
}
