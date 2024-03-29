import { N50 } from '@atlaskit/adf-schema';
import { createTag, serializeStyle } from '../util';
import { NodeSerializerOpts } from '../interfaces';

const baseStyle = {
  'background-clip': 'padding-box',
  height: '2.5em',
  'min-width': '3em',
  'vertical-align': 'top',
  border: `1px solid ${N50}`,
  'border-right-width': 0,
  'border-bottom-width': 0,
  padding: '6px 10px',
};

export default function tableCell({ attrs, text }: NodeSerializerOpts) {
  const { colspan, rowspan, background } = attrs;
  const style = serializeStyle({
    ...baseStyle,
    'background-color': background,
  });

  return createTag(
    'td',
    {
      colspan,
      rowspan,
      style,
    },
    text,
  );
}
