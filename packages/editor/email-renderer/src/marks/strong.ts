import { createTag } from '../create-tag';
import { MarkSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

export const styles = `
.${createClassName('mark-strong')} {
  font-weight: bold;
}
`;

export default function strong({ text }: MarkSerializerOpts) {
  return createTag('span', { class: createClassName('mark-strong') }, text);
}
