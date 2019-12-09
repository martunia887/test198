import { Action } from 'redux';
import {
  isGetPluginsFullfilledAction,
  isGetPluginsFailedAction,
} from '../actions/getPlugins';
import { State } from '../domain';

export const getPluginsStarted = (state: State, action: Action): State => {
  return state;
};

export const getPluginsFullfilled = (state: State, action: Action): State => {
  if (isGetPluginsFullfilledAction(action)) {
    const { items } = action;

    console.log({ items });
    return {
      ...state,
      view: {
        ...state.view,
        isLoading: false,
      },
      plugins: items.concat(state.plugins || []),
    };
  }

  return state;
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
