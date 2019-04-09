import { SliderDefinition, SliderAttributes } from '@atlaskit/adf-schema';

export const slider = (attrs: SliderAttributes): SliderDefinition => ({
  type: 'slider',
  attrs,
});
