import * as React from 'react';
import { PureComponent } from 'react';
import TaskItem from './TaskItem';
import {
  Appearance,
  ContentRef,
  ReminderTime,
  TaskDecisionProvider,
  User,
  HandlerType,
} from '../types';
import { baseItemFromTaskProps } from '../type-helpers';

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  contentRef?: ContentRef;
  children?: any;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  objectAri?: string;
  containerAri?: string;
  showPlaceholder?: boolean;
  appearance?: Appearance;
  participants?: User[];
  showParticipants?: boolean;
  creator?: User;
  lastUpdater?: User;
  reminderDate?: ReminderTime;
}

export interface State {
  isDone?: boolean;
  lastUpdater?: User;
  reminderDate: ReminderTime;
}

export default class ResourcedTaskItem extends PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline',
  };
  private mounted: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      isDone: props.isDone,
      lastUpdater: props.lastUpdater,
      reminderDate: props.reminderDate,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.subscribe(
      this.props.taskDecisionProvider,
      this.props.containerAri,
      this.props.objectAri,
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.taskDecisionProvider !== this.props.taskDecisionProvider ||
      nextProps.containerAri !== this.props.containerAri ||
      nextProps.objectAri !== this.props.objectAri
    ) {
      this.unsubscribe();
      this.subscribe(
        nextProps.taskDecisionProvider,
        nextProps.containerAri,
        nextProps.objectAri,
      );
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.mounted = false;
  }

  private subscribe(
    taskDecisionProvider?: Promise<TaskDecisionProvider>,
    containerAri?: string,
    objectAri?: string,
  ) {
    if (taskDecisionProvider && containerAri && objectAri) {
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        const { taskId } = this.props;
        const objectKey = { localId: taskId, objectAri, containerAri };
        provider.subscribe(objectKey, {
          callback: this.onStateUpdate,
          type: HandlerType.STATE,
        });
        provider.subscribe(objectKey, {
          callback: this.onReminderUpdate,
          type: HandlerType.REMINDER,
        });
      });
    }
  }

  private unsubscribe() {
    const {
      taskDecisionProvider,
      taskId,
      objectAri,
      containerAri,
    } = this.props;
    if (taskDecisionProvider && containerAri && objectAri) {
      taskDecisionProvider.then(provider => {
        const objectKey = { localId: taskId, objectAri, containerAri };
        provider.unsubscribe(objectKey, {
          callback: this.onStateUpdate,
          type: HandlerType.STATE,
        });
        provider.unsubscribe(objectKey, {
          callback: this.onReminderUpdate,
          type: HandlerType.REMINDER,
        });
      });
    }
  }

  private onStateUpdate = state => {
    this.setState({ isDone: state === 'DONE' });
  };

  private onReminderUpdate = (reminderDate: ReminderTime) => {
    this.setState({ reminderDate });
  };

  private handleOnChange = (taskId: string, isDone: boolean) => {
    const {
      taskDecisionProvider,
      objectAri,
      containerAri,
      onChange,
    } = this.props;
    // Optimistically update the task
    this.setState({ isDone });

    if (taskDecisionProvider && containerAri && objectAri) {
      // Call provider to update task
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        provider.toggleTask(
          baseItemFromTaskProps(this.props),
          isDone ? 'DONE' : 'TODO',
        );

        // onChange could trigger a rerender, in order to get the correct state
        // we should only call onChange once the internal state have been modified
        if (onChange) {
          onChange(taskId, isDone);
        }

        if (isDone) {
          // Undefined provider.getCurrentUser or currentUser shows 'Created By'
          // ie. does not update to prevent incorrect 'Completed By' message
          this.setState({
            lastUpdater: provider.getCurrentUser
              ? provider.getCurrentUser()
              : undefined,
          });
        }
      });
    }
  };

  private onReminderSet = (reminderDate: ReminderTime) => {
    const { objectAri, containerAri, taskDecisionProvider } = this.props;
    if (taskDecisionProvider && containerAri && objectAri) {
      taskDecisionProvider.then(provider => {
        if (provider.updateReminderDate) {
          provider.updateReminderDate(
            baseItemFromTaskProps(this.props),
            reminderDate,
          );
        }
      });
    }
  };

  render() {
    const { isDone, lastUpdater, reminderDate } = this.state;
    const {
      appearance,
      children,
      contentRef,
      creator,
      participants,
      showParticipants,
      showPlaceholder,
      taskId,
      taskDecisionProvider,
    } = this.props;

    return (
      <TaskItem
        isDone={isDone}
        taskId={taskId}
        onChange={this.handleOnChange}
        appearance={appearance}
        contentRef={contentRef}
        participants={participants}
        showParticipants={showParticipants}
        showPlaceholder={showPlaceholder}
        creator={creator}
        lastUpdater={lastUpdater}
        disabled={!taskDecisionProvider}
        onReminderSet={this.onReminderSet}
        reminderDate={reminderDate}
      >
        {children}
      </TaskItem>
    );
  }
}
