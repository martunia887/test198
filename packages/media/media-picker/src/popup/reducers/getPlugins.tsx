import { Action } from 'redux';
import {
  isGetPluginsFullfilledAction,
  isGetPluginsFailedAction,
} from '../actions/getPlugins';
import { State } from '../domain';
import { MediaPickerPlugin } from '../../domain/plugin';

export const getPluginsStarted = (state: State, action: Action): State => {
  return state;
};

export const getPluginsFullfilled = (state: State, action: Action): State => {
  if (isGetPluginsFullfilledAction(action)) {
    const { items } = action;
    return {
      ...state,
      view: {
        ...state.view,
        isLoading: false,
      },
      plugins: mergePlugins(state.plugins, items),
    };
  }

  return state;
};

const mergePlugins = (
  currPlugins: MediaPickerPlugin[] | undefined,
  incomingPlugins: MediaPickerPlugin[],
) => {
  if (currPlugins && currPlugins.length > 0) {
    const newPlugins = incomingPlugins.filter(
      i => !currPlugins.some(c => c.name === i.name),
    );
    return currPlugins.concat(newPlugins);
  } else {
    return incomingPlugins;
  }
};

export const getPluginsFailed = (state: State, action: Action): State => {
  if (isGetPluginsFailedAction(action)) {
    return {
      ...state,
      view: {
        ...state.view,
        hasError: true,
        isLoading: false,
      },
    };
  }

  return state;
};
