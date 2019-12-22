import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';

export default function layoutColumn({ text }: NodeSerializerOpts) {
  return createTag('div', {}, text);
}
