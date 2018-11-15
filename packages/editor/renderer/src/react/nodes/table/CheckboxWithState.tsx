import * as React from 'react';
import { Component } from 'react';
import { Checkbox } from '@atlaskit/checkbox';

export interface Props {
  defaultValue: string;
  label?: string;
  onChange?: (meta) => {};
}

export interface State {
  isChecked: boolean;
}

export default class CheckboxWithState extends Component<Props, State> {
  state = { isChecked: false };

  render() {
    const { label, defaultValue } = this.props;
    const { isChecked } = this.state;
    return (
      <Checkbox
        label={label}
        value={defaultValue}
        isChecked={isChecked}
        onChange={this.handleOnChange}
      />
    );
  }

  private handleOnChange = event => {
    const { onChange, defaultValue } = this.props;
    const isChecked = event.target.checked;
    this.setState({ isChecked });
    if (onChange) {
      onChange(isChecked ? defaultValue : '');
    }
  };
}
