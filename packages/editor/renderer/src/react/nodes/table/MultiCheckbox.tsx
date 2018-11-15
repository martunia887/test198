import * as React from 'react';
import { Component } from 'react';

export interface Props {
  onChange?: (meta) => {};
}

export default class MultiCheckbox extends Component<Props> {
  localState: any;

  constructor(props) {
    super(props);
    this.localState = {};
  }

  render() {
    const { children } = this.props;
    return React.Children.map(children, (child: any) =>
      React.cloneElement(child, {
        onChange: this.handleOnChange,
      }),
    );
  }

  private handleOnChange = value => {
    const { onChange } = this.props;
    this.localState[value] = true;
    if (onChange) {
      onChange(Object.keys(this.localState).join(', '));
    }
  };
}
