import { createTag } from '../create-tag';
import { MarkSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

export const styles = `
.${createClassName('mark-underline')} {
  text-decoration: underline;
}
`;

export default function strong({ text }: MarkSerializerOpts) {
  return createTag('span', { class: createClassName('mark-underline') }, text);
}
