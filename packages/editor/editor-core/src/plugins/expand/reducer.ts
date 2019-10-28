import { ExpandPluginState, ExpandPluginAction } from './types';

export default (
  pluginState: ExpandPluginState,
  action: ExpandPluginAction,
): ExpandPluginState => {
  switch (action.type) {
    case 'SET_PARENT_LAYOUT':
      return {
        ...pluginState,
        parentLayout: action.data.parentLayout,
      };
    case 'SET_EXPAND':
      return {
        ...pluginState,
        ...action.data,
        parentLayout: action.data.expandNode
          ? pluginState.parentLayout
          : undefined,
      };
    case 'SET_SHOULD_FOCUS_TITLE':
      return {
        ...pluginState,
        shouldFocusTitle: action.data.shouldFocusTitle,
      };

    default:
      return pluginState;
  }
};
