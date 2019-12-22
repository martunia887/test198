import React, { Component, KeyboardEvent } from 'react';
import browserData from '@atlaskit/editor-common/src/utils/browser';

export interface UndoableProps {
  onUndoRedo: (value: string) => void;
  input: HTMLInputElement;
}

const HISTORY_STACK_LIMIT = 1000;

export default class UndoableWrapper extends Component<UndoableProps> {
  undoHistory: string[] = [];
  redoHistory: string[] = [];

  componentDidMount() {
    const { input } = this.props;
    if (input) {
      this.addToHistory(input.value || '');
    }
  }

  componentDidUpdate(prevProps: UndoableProps) {
    const { input } = this.props;
    if (!prevProps.input && input) {
      this.addToHistory(input.value || '');
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const { input, onUndoRedo } = this.props;
    const undoHistory = this.undoHistory;
    // undo previous action
    if (
      undoHistory.length > 1 &&
      event.key === 'z' &&
      // cmd + z for mac
      ((browserData.mac && event.metaKey && !event.shiftKey) ||
        // ctrl + z for non-mac
        (!browserData.mac && event.ctrlKey))
    ) {
      event.preventDefault();
      this.redoHistory.push(input.value);
      input.value = undoHistory[undoHistory.length - 2] as string;
      undoHistory.pop();
      onUndoRedo(input.value);
    }

    // redo undone action
    if (
      this.redoHistory.length &&
      // cmd + shift + z for mac
      ((browserData.mac &&
        event.metaKey &&
        event.shiftKey &&
        event.key === 'z') ||
        // ctrl + y for non-mac
        (!browserData.mac && event.ctrlKey && event.key === 'y'))
    ) {
      event.preventDefault();
      //dont push new change if last value in the history is the same
      input.value = this.redoHistory.pop() as string;
      onUndoRedo(input.value);
    }
  };

  // call this method when history needs to be updated (e.g. whenever value changes)
  addToHistory(newValue: string) {
    //dont push new change if last value in the history is the same
    if (
      !this.undoHistory.length ||
      this.undoHistory[this.undoHistory.length - 1] !== newValue
    ) {
      if (this.undoHistory.length >= HISTORY_STACK_LIMIT) {
        this.undoHistory.shift();
      }
      this.undoHistory.push(newValue);
    }
  }

  render() {
    const { children } = this.props;
    return <div onKeyDown={this.onKeyDown}>{children}</div>;
  }
}
