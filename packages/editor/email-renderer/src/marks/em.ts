import { createTag } from '../create-tag';
import { MarkSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

export const styles = `
.${createClassName('mark-em')} {
  font-style: italic;
}
`;

export default function em({ text }: MarkSerializerOpts) {
  return createTag('span', { class: createClassName('mark-em') }, text);
}
