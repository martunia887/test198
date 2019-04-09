import { NodeSpec, Node } from 'prosemirror-model';
import { uuid } from '../../utils';

/**
 * @name slider_node
 */
export interface SliderDefinition {
  type: 'slider';
  attrs: SliderAttributes;
}

export interface SliderAttributes {
  id?: string;
  title?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}
export const slider: NodeSpec = {
  group: 'inline',
  inline: true,
  selectable: true,
  attrs: {
    id: { default: null },
    title: { default: null },
    value: { default: 0 },
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 10 },
  },
  parseDOM: [
    {
      tag: 'input[type="range"]',
      getAttrs(dom: HTMLElement) {
        const { value, min, max, step } = slider.attrs!;
        return {
          id: uuid.generate(),
          value: parseInt(
            dom.getAttribute('data-value') || `${value.default}`,
            10,
          ),
          min: parseInt(dom.getAttribute('data-min') || `${min.default}`, 10),
          max: parseInt(dom.getAttribute('data-max') || `${max.default}`, 10),
          step: parseInt(
            dom.getAttribute('data-step') || `${step.default}`,
            10,
          ),
          title: dom.getAttribute('data-title') || null,
        };
      },
    },
  ],
  toDOM(node: Node) {
    const attrs = {
      type: 'range',
      'data-id': node.attrs.id,
      'data-title': node.attrs.title,
      'data-value': node.attrs.value,
      'data-min': node.attrs.min,
      'data-max': node.attrs.max,
      'data-step': node.attrs.step,
    };
    return ['input', attrs];
  },
};
