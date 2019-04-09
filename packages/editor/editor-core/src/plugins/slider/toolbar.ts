import { defineMessages } from 'react-intl';
import { FloatingToolbarHandler } from '../floating-toolbar/types';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { pluginKey, SliderState } from './pm-plugins/main';
import { removeSlider, updateAttributes } from './commands';

export const messages = defineMessages({
  removeSlider: {
    id: 'fabric.editor.removeSlider',
    defaultMessage: 'Remove slider',
    description: 'Removes the slider',
  },
  sliderName: {
    id: 'fabric.editor.sliderName',
    defaultMessage: 'Name',
    description: 'Name of the slider',
  },
  sliderOptions: {
    id: 'fabric.editor.sliderOptions',
    defaultMessage: 'Slider options',
    description: 'Opens a menu with additional slider options',
  },
});

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
  providerFactory,
) => {
  const sliderState: SliderState | undefined = pluginKey.getState(state);
  if (sliderState && typeof sliderState.pos === 'number') {
    const { pos } = sliderState;
    const node = state.doc.nodeAt(pos);
    if (!node) {
      return;
    }

    return {
      title: 'Slider toolbar',
      nodeType: state.schema.nodes.slider,
      height: 32,
      width: 200,
      items: [
        {
          type: 'input',
          defaultValue: node.attrs.title,
          onSubmit: text => updateAttributes({ title: text }, pos),
          placeholder: formatMessage(messages.sliderName),
          onBlur: text => updateAttributes({ title: text }, pos),
        },
        {
          type: 'separator',
        },
        {
          type: 'dropdown',
          title: formatMessage(messages.sliderOptions),
          options: [
            // TODO: add options as inputs here: From, To, Step
            {
              title: 'Step',
              onClick: () => {
                return false;
              },
            },
          ],
        },
        {
          type: 'separator',
        },
        {
          type: 'button',
          icon: RemoveIcon,
          onClick: removeSlider(pos),
          selected: false,
          title: formatMessage(messages.removeSlider),
        },
      ],
    };
  }
};
