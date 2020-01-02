import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';

import { colors } from '@atlaskit/theme';

import { Dispatch } from '../../../event-dispatcher';
import { getActiveColor } from '../utils/color';
import { getDisabledState } from '../utils/disabled';
import { PaletteColor } from '../../../ui/ColorPalette/Palettes/type';
import textColorPalette, {
  textColorPaletteExtended,
} from '../../../ui/ColorPalette/Palettes/textColorPalette';

export type TextColorPluginState = {
  palette: Array<PaletteColor>;
  paletteExtended?: Array<PaletteColor>;
  defaultColor: string;
  disabled?: boolean;
  color: string | null;
  showMoreColors: boolean;
};

export type ActionHandlerParams = {
  dispatch: Dispatch;
  pluginState: TextColorPluginState;
  tr: Transaction;
  params?: {
    color?: string;
    disabled?: boolean;
  };
};

export type TextColorDefaultColor = {
  color: string;
  label: string;
};

export interface TextColorPluginConfig {
  defaultColor: TextColorDefaultColor;
}

export const DEFAULT_COLOR = {
  color: colors.N800.toLowerCase(),
  label: 'Dark gray',
};

export function createInitialPluginState(
  editorState: EditorState,
  pluginConfig?: TextColorPluginConfig,
): TextColorPluginState {
  const defaultColor =
    (pluginConfig && pluginConfig.defaultColor) || DEFAULT_COLOR;

  const palette: Array<PaletteColor> = [
    {
      value: defaultColor.color,
      label: defaultColor.label,
    },
    ...textColorPalette,
  ];

  const paletteExtended: Array<PaletteColor> = [
    {
      value: defaultColor.color,
      label: defaultColor.label,
    },
    ...textColorPaletteExtended,
  ];

  return {
    color: getActiveColor(editorState),
    disabled: getDisabledState(editorState),
    palette,
    defaultColor: palette[0].value,
    showMoreColors: false,
    paletteExtended,
  };
}

export enum ACTIONS {
  RESET_COLOR,
  SET_COLOR,
  TOGGLE_SHOW_MORE_COLORS,
  DISABLE,
}

export const pluginKey = new PluginKey('textColorPlugin');

export function createPlugin(
  dispatch: Dispatch,
  pluginConfig?: TextColorPluginConfig,
): Plugin {
  return new Plugin({
    key: pluginKey,
    state: {
      init(_config, editorState) {
        return createInitialPluginState(editorState, pluginConfig);
      },
      apply(tr, pluginState, _, newState) {
        const meta = tr.getMeta(pluginKey) || {};

        let nextState;
        switch (meta.action) {
          case ACTIONS.RESET_COLOR:
            nextState = { ...pluginState, color: pluginState.defaultColor };
            break;

          case ACTIONS.SET_COLOR:
            nextState = { ...pluginState, color: meta.color, disabled: false };
            break;

          case ACTIONS.TOGGLE_SHOW_MORE_COLORS:
            nextState = {
              ...pluginState,
              showMoreColors: !pluginState.showMoreColors,
            };
            break;

          case ACTIONS.DISABLE:
            nextState = { ...pluginState, disabled: true };
            break;

          default:
            nextState = {
              ...pluginState,
              color: getActiveColor(newState),
              disabled: getDisabledState(newState),
            };
        }

        if (
          (pluginState && pluginState.color !== nextState.color) ||
          (pluginState && pluginState.disabled !== nextState.disabled)
        ) {
          dispatch(pluginKey, nextState);
          return nextState;
        }

        return pluginState;
      },
    },
  });
}
