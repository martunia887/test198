import { Plugin, PluginSpec, PluginKey } from 'prosemirror-state';
import { pluginFactory, Reducer, MapState } from './plugin-state-factory';
import {
  Action as StoreAction,
  pluginKey as storeKey,
  PluginStateTracker,
} from './plugin';

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

interface State<PluginState, Action, InitialState extends PluginState> {
  initialState: InitialState;
  reducer: Reducer<PluginState, Action>;
  options?: {
    mapping?: MapState<PluginState>;
    onDocChanged?: MapState<PluginState>;
    onSelectionChanged?: MapState<PluginState>;
  };
}
type ConnectedPlugin<
  PluginState,
  Action,
  InitialState extends PluginState
> = Without<PluginSpec, 'state'> & {
  name: string;
  state: State<PluginState, Action, InitialState>;
};

const createConnectedPlugin = <
  PluginState,
  Action extends StoreAction,
  InitialState extends PluginState
>(
  pluginKey: PluginKey,
  name: string,
  reducer: Reducer<PluginState, Action>,
  options?: {
    mapping?: MapState<PluginState>;
    onDocChanged?: MapState<PluginState>;
    onSelectionChanged?: MapState<PluginState>;
  },
) => {
  const { createCommand, getPluginState, createPluginState } = pluginFactory<
    PluginState,
    Action,
    InitialState
  >(pluginKey, reducer, options);

  const createPluginSpec = (
    initialState: InitialState,
    config: PluginSpec,
  ): PluginSpec => {
    return {
      ...config,
      key: pluginKey,
      view(view) {
        const tracker: PluginStateTracker = storeKey.getState(view.state);
        const untrack = tracker.track(pluginKey, name);
        let originalViewHandler: any;
        if (config.view) {
          originalViewHandler = config.view(view);
        }

        return {
          update(...args) {
            if (originalViewHandler && originalViewHandler.update) {
              originalViewHandler.update(...args);
            }
          },
          destroy(...args) {
            untrack();
            if (originalViewHandler && originalViewHandler.destroy) {
              originalViewHandler.destroy(...args);
            }
          },
        };
      },
      state: createPluginState(initialState),
    };
  };
  return {
    createPluginSpec,
    createCommand,
    getPluginState,
  };
};

export default createConnectedPlugin;
