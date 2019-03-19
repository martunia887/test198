import { NodeSerializerOpts } from '../interfaces';
import { createTag, serializeStyle } from '../util';

const diffColor = {
  delete: 'rgba(255, 86, 48, .3)',
  insert: 'rgba(54, 179, 126, .3)',
  change: 'rgba(0, 184, 217, .3)',
};

type DiffType = 'delete' | 'insert' | 'change';

export function inlineDiff({ attrs, text }: NodeSerializerOpts) {
  console.log(attrs);
  const diffType: DiffType = attrs.diffType;
  const css = serializeStyle({
    'background-color': `${diffColor[diffType]}`,
    'border-radius': '3px',
  });
  return createTag('span', { style: css }, text);
}

export function blockDiff({ attrs, text }: NodeSerializerOpts) {
  const diffType: DiffType = attrs.diffType;
  const css = serializeStyle({
    'background-color': `${diffColor[diffType]}`,
    'border-radius': '3px',
    'box-sizing': 'border-box',
    padding: '3px',
  });
  return createTag('div', { style: css }, text);
}
