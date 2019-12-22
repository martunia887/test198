import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

const className = createClassName('taskList');
const nestedClassName = createClassName('nestedTaskList');

export const styles = `
.${className} {
  margin-top: 12px;
}

.${nestedClassName} {
  margin-top: 0px;
  margin-left: 48px;
}
`;

export default function taskList({ text, parent }: NodeSerializerOpts) {
  return createTag(
    'div',
    {
      class: [
        className,
        parent && parent.type.name === 'taskList' && nestedClassName,
      ]
        .filter(Boolean)
        .join(' '),
    },
    text,
  );
}
