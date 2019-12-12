import React, { FunctionComponent } from 'react';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import TaskItem from './Task';
import { TaskItemDefinition } from '@atlaskit/adf-schema';
import { useProviderFactory } from '@atlaskit/editor-common/provider-factory';

interface TaskItemNodeProps {
  node: ProsemirrorNode;
}

function nodeIsEmpty(node: ProsemirrorNode) {
  return node.content.childCount === 0;
}

function handleOnChange(taskId: string, isChecked: boolean): void {
  // TODO: Should implement a way to pass pos and apply function here ()
}

export const TaskItemNode: FunctionComponent<TaskItemNodeProps> = ({
  node,
  children,
}) => {
  const providerFactory = useProviderFactory();
  const { localId, state } = node.attrs as TaskItemDefinition['attrs'];

  return (
    <TaskItem
      taskId={localId}
      isDone={state === 'DONE'}
      onChange={handleOnChange}
      showPlaceholder={nodeIsEmpty(node)}
      providers={providerFactory}
    >
      {children}
    </TaskItem>
  );
};
