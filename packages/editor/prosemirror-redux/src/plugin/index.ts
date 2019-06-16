import { Plugin, PluginKey, EditorState } from 'prosemirror-state';

export type Middleware = (
  actions: Array<Action>,
  changes: Array<Changes>,
) => void;
export type UnTrackFn = () => void;
export interface Action {
  type: string;
  payload?: any;
  meta?: any;
}
export interface Changes {
  name: string;
  oldState: any;
  newState: any;
}
export interface PluginStateTracker {
  track(pluginKey: PluginKey, name: string): UnTrackFn;
  detectChanges(
    oldEditorState: EditorState,
    newEditorState: EditorState,
  ): Array<Changes>;
}

export const pluginKey = new PluginKey('redux');

function createPluginStateTracker(): PluginStateTracker {
  const plugins: Array<PluginKey> = [];
  const names = new Map<PluginKey, string>();
  return {
    track(pluginKey, name) {
      plugins.push(pluginKey);
      names.set(pluginKey, name);
      return () => {
        // Untrack plugin
        const index = plugins.indexOf(pluginKey);
        if (index !== -1) {
          names.delete(pluginKey);
          plugins.splice(index, 1);
        }
      };
    },
    detectChanges(oldEditorState, newEditorState) {
      let changes: Array<Changes> = [];
      for (let plugin of plugins) {
        const oldState = plugin.getState(oldEditorState);
        const newState = plugin.getState(newEditorState);
        if (oldState !== newState) {
          changes.push({
            name: names.get(plugin)!,
            newState,
            oldState,
          });
        }
      }
      return changes;
    },
  };
}

const createPlugin = (middlewares?: Array<Middleware>): Plugin => {
  const pluginsStateTracker = createPluginStateTracker();
  const invokeMiddlewares = (
    actions: Array<Action>,
    changes: Array<Changes>,
  ) => {
    if (!middlewares) {
      return;
    }

    for (let middleware of middlewares) {
      middleware(actions, changes);
    }
  };

  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return pluginsStateTracker;
      },
      apply(tr, tracker: PluginStateTracker, oldEditorState, newEditorState) {
        const changes = tracker.detectChanges(oldEditorState, newEditorState);
        if (changes.length > 0) {
          const actions: Array<Action> = tr.getMeta(pluginKey);
          invokeMiddlewares(actions, changes);
        }
        return tracker;
      },
    },
  });
};

export default createPlugin;
