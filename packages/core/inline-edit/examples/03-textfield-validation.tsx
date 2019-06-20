import * as React from 'react';
import TextField from '@atlaskit/textfield';
import { gridSize } from '@atlaskit/theme';

import InlineEdit from '../src';
import ReadViewContainer from '../src/styled/ReadViewContainer';

interface State {
  editValue: string;
}

export default class InlineEditExample extends React.Component<void, State> {
  state = {
    editValue: 'Field Value',
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
        }, 300);
      },
    ).then(validateObject => {
      if (validateObject && validateObject.value === this.validateValue) {
        return validateObject.error;
      }
      return undefined;
    });
  };

  onConfirm = (value: string) => {
    if (value === 'Atlassian') {
      return new Promise<string>(resolve => {
        setTimeout(() => {
          resolve('This is a submission validation error.');
        }, 500);
      });
    }
    this.setState({
      editValue: value,
    });
    return undefined;
  };

  render() {
    return (
      <div style={{ padding: `${gridSize()}px ${gridSize()}px` }}>
        <InlineEdit
          name="example"
          defaultValue={this.state.editValue}
          label="Inline edit validation"
          editView={fieldProps => (
            <TextField {...fieldProps} autoFocus autoComplete="off" />
          )}
          readView={() => (
            <ReadViewContainer>
              {this.state.editValue || 'Click to enter value'}
            </ReadViewContainer>
          )}
          onConfirm={this.onConfirm}
          validate={this.validate}
        />
      </div>
    );
  }
}
