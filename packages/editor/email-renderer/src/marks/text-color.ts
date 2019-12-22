import { createTag } from '../create-tag';
import { MarkSerializerOpts } from '../interfaces';
import { serializeStyle } from '../serialize-style';

export default function textColor({ mark, text }: MarkSerializerOpts) {
  const css = serializeStyle({ color: mark.attrs.color });

  return createTag('span', { style: css }, text);
}
