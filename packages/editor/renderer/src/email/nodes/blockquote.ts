import { gridSize } from '@atlaskit/theme/constants';
import { N40, N300 } from '@atlaskit/theme/colors';

import { createTag, serializeStyle } from '../util';
import { NodeSerializerOpts } from '../interfaces';

const css = serializeStyle({
  'border-left': `2px solid ${N40}`,
  color: N300,
  margin: `${gridSize() * 1.5}px 0 0 0`,
  'padding-left': `${gridSize() * 2}px`,
});

export default function blockquote({ text }: NodeSerializerOpts) {
  return createTag('blockquote', { style: css }, text);
}
