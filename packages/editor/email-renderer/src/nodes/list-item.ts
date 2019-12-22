import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

export const styles = `
.${createClassName('li')} {
  margin-top: 4px;
}
.${createClassName('li')} > p {
  margin-bottom: 0px;
  padding-top: 0px;
}
`;

export default function listItem({ text }: NodeSerializerOpts) {
  return createTag('li', { class: createClassName('li') }, text);
}
