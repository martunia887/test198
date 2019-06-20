import * as React from 'react';
import { gridSize } from '@atlaskit/theme';
import { InlineEditableTextfield } from '../src';

interface State {
  firstEditValue: string;
  secondEditValue: string;
  thirdEditValue: string;
  fourthEditValue: string;
  fifthEditValue: string;
}

export default class InlineEditExample extends React.Component<void, State> {
  state = {
    firstEditValue: 'Field value',
    secondEditValue: 'Field value',
    thirdEditValue: 'Field value',
    fourthEditValue: 'Field value',
    fifthEditValue: 'Field value',
  };

  validateValue = '';

  validate = (value: string) => {
    this.validateValue = value;
    return new Promise<{ value: string; error: string } | undefined>(
      resolve => {
        setTimeout(() => {
          if (value.length <= 6) {
            resolve({
              value,
              error: 'Enter a value longer than 6 characters.',
            });
          }
          resolve(undefined);
        }, 500);
      },
    ).then(validateObject => {
      if (validateObject && validateObject.value === this.validateValue) {
        return validateObject.error;
      }
      return undefined;
    });
  };

  onConfirm = (value: string, key: string) => {
    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  render() {
    return (
      <div style={{ padding: `${gridSize()}px ${gridSize()}px` }}>
        <InlineEditableTextfield
          name="firstEditValue"
          defaultValue={this.state.firstEditValue}
          label="Inline editable textfield + hideActionButtons (Enter to confirm, Esc to cancel)"
          onConfirm={(value, name) => this.onConfirm(value, name)}
          placeholder="Click to enter text"
          hideActionButtons
        />
        <InlineEditableTextfield
          name="secondEditValue"
          defaultValue={this.state.secondEditValue}
          label="Inline editable textfield + startWithEditViewOpen"
          onConfirm={(value, name) => this.onConfirm(value, name)}
          placeholder="Click to enter text"
          startWithEditViewOpen
        />
        <InlineEditableTextfield
          name="thirdEditValue"
          defaultValue={this.state.thirdEditValue}
          label="Inline editable textfield + validate"
          onConfirm={(value, name) => this.onConfirm(value, name)}
          placeholder="Click to enter text"
          validate={this.validate}
        />
        <InlineEditableTextfield
          name="fourthEditValue"
          defaultValue={this.state.fourthEditValue}
          label="Inline editable textfield + isRequired"
          onConfirm={(value, name) => this.onConfirm(value, name)}
          placeholder="Click to enter text"
          isRequired
        />
        <InlineEditableTextfield
          name="fifthEditValue"
          defaultValue={this.state.fifthEditValue}
          label="Inline editable textfield + isCompact"
          onConfirm={(value, name) => this.onConfirm(value, name)}
          placeholder="Click to enter text"
          isCompact
        />
      </div>
    );
  }
}
