import { N30A } from '@atlaskit/theme/colors';
import { createTag, serializeStyle } from '../util';

const css = serializeStyle({
  border: 'none',
  'border-bottom': `1px solid ${N30A}`,
});

export default function rule() {
  return createTag('hr', { style: css });
}
