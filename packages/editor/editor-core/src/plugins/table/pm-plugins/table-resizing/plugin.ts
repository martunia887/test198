import { Plugin, PluginKey } from 'prosemirror-state';
import classnames from 'classnames';
import { updateResizeHandle } from './utils';
import {
  ColumnResizingPluginState,
  TableCssClassName as ClassName,
} from '../../types';
import { Dispatch } from '../../../../event-dispatcher';
import { handleMouseDown, handleMouseMove } from './event-handlers';
import {
  pluginFactory,
  MapState,
} from '../../../../utils/plugin-state-factory';
import reducer from './reducer';
import { setResizeHandlePos } from './commands';

export const pluginKey = new PluginKey('tableFlexiColumnResizing');

const cleanState: MapState<ColumnResizingPluginState> = (tr, state) => {
  return {
    ...state,
    resizeHandlePos: null,
    dragging: null,
    lastClick: null,
  };
};

const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
  {
    onDocChanged: cleanState,
    onSelectionChanged: cleanState,
  },
);

export function createPlugin(
  dispatch: Dispatch<ColumnResizingPluginState>,
  {
    lastColumnResizable = true,
    dynamicTextSizing = false,
  }: ColumnResizingPluginState,
) {
  return new Plugin({
    key: pluginKey,
    state: createPluginState(dispatch, {
      lastColumnResizable,
      dynamicTextSizing,
      resizeHandlePos: null,
      dragging: null,
      lastClick: null,
    }),

    props: {
      attributes(state) {
        const pluginState = getPluginState(state);

        return {
          class: classnames(ClassName.RESIZING_PLUGIN, {
            [ClassName.RESIZE_CURSOR]: pluginState.resizeHandlePos !== null,
            [ClassName.IS_RESIZING]: !!pluginState.dragging,
          }),
        };
      },

      handleDOMEvents: {
        mousemove(view, event) {
          handleMouseMove(view, event as MouseEvent, lastColumnResizable);
          const { state } = view;
          const { resizeHandlePos, dragging } = getPluginState(state);
          if (dragging && resizeHandlePos !== null) {
            const domAtPos = view.domAtPos.bind(view);
            updateResizeHandle(state, domAtPos, resizeHandlePos);
          }
          return false;
        },
        mouseleave(view) {
          const { state, dispatch } = view;
          const { resizeHandlePos, dragging } = getPluginState(state);
          if (resizeHandlePos !== null && !dragging) {
            setResizeHandlePos(null)(state, dispatch);
          }

          return true;
        },
        mousedown(view, event) {
          const { resizeHandlePos, dragging } = getPluginState(view.state);
          if (resizeHandlePos !== null && !dragging) {
            const domAtPos = view.domAtPos.bind(view);
            if (
              handleMouseDown(
                view,
                event as MouseEvent,
                resizeHandlePos,
                dynamicTextSizing,
              )
            ) {
              updateResizeHandle(view.state, domAtPos, resizeHandlePos);
              return true;
            }
          }

          return false;
        },
      },
    },
  });
}

export { createCommand, getPluginState };
