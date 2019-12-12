import React, { FunctionComponent } from 'react';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { TaskListDefinition } from '@atlaskit/adf-schema';

interface TaskListNodeProps {
  node: ProsemirrorNode;
}

export const TaskListNode: FunctionComponent<TaskListNodeProps> = ({
  node,
  children,
}) => {
  const { localId } = node.attrs as TaskListDefinition['attrs'];

  return (
    <div
      data-node-type="actionList"
      data-task-list-local-id={localId || 'local-task-list'}
      style={{
        listStyle: 'none',
        paddingLeft: 0,
      }}
    >
      {children}
    </div>
  );
};
