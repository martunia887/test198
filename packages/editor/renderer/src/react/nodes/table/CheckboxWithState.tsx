import * as React from 'react';
import { Component } from 'react';
import { Checkbox } from '@atlaskit/checkbox';

export interface Props {
  name: string;
  label?: string;
  onChange?: (meta) => {};
}

export interface State {
  isChecked: boolean;
}

export default class CheckboxWithState extends Component<Props, State> {
  state = { isChecked: false };

  render() {
    console.log(this.props);
    const { name, label } = this.props;
    const { isChecked } = this.state;
    return (
      <Checkbox
        name={name}
        label={label}
        value={isChecked}
        onChange={this.handleOnChange}
      />
    );
  }

  private handleOnChange = event => {
    const { onChange } = this.props;
    const isChecked = event.target.checked;
    this.setState({ isChecked });
    if (onChange) {
      onChange(isChecked ? '✅' : '');
    }
  };
}
