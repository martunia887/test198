import * as React from 'react';
import { slider } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import IconSlider from './ui/icon/Slider';
import sliderPluginFactory from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';

const sliderPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'slider', node: slider }];
  },

  pmPlugins() {
    return [
      {
        name: 'slider',
        plugin: ({ portalProviderAPI, dispatch }) => {
          return sliderPluginFactory(dispatch, portalProviderAPI);
        },
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.slider),
        description: formatMessage(messages.sliderDescription),
        keywords: ['slider', 'range'],
        priority: 600,
        icon: () => <IconSlider label={formatMessage(messages.slider)} />,
        action(insert, state) {
          return insert(state.schema.nodes.slider.createChecked());
        },
      },
    ],
    floatingToolbar: getToolbarConfig,
  },
};

export default sliderPlugin;
