import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { ReactElement } from 'react';
import TaskItemWithProviders from './task-item-with-providers';

const messages = defineMessages({
  placeholder: {
    id: 'fabric.editor.taskPlaceholder',
    defaultMessage: "Type your action, use '@' to assign to someone.",
    description:
      'Placeholder description for an empty action/task in the editor',
  },
});

export interface TaskProps {
  taskId: string;
  isDone: boolean;
  contentRef?: (node: HTMLElement | undefined) => void;
  onChange?: (taskId: string, isChecked: boolean) => void;
  showPlaceholder?: boolean;
  children?: ReactElement<any>;
  providers: {
    [key: string]: Promise<any>;
  };
  disabled?: boolean;
}

export function TaskItem(props: TaskProps & InjectedIntlProps) {
  const {
    providers,
    intl: { formatMessage },
    ...otherProps
  } = props;
  const { taskDecisionProvider, contextIdentifierProvider } = providers;
  const placeholder = formatMessage(messages.placeholder);

  return (
    <TaskItemWithProviders
      {...otherProps}
      placeholder={placeholder}
      taskDecisionProvider={taskDecisionProvider}
      contextIdentifierProvider={contextIdentifierProvider}
    />
  );
}

export default injectIntl(TaskItem);
