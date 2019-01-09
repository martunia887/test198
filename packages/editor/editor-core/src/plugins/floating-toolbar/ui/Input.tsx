import * as React from 'react';
import { Component } from 'react';
import { Input } from '../../../ui/PanelTextInput/styles';

export interface Props {
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  defaultValue?: string;
  placeholder?: string;
  onBlur?: (text: string) => void;
  onSubmit?: () => void;
  onUnlink?: () => void;
  onOpenLink?: () => void;
}

export interface State {
  text: string;
}

export default class TextField extends Component<Props, State> {
  state: State = { text: '' };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.text);
  };

  render() {
    const { defaultValue, placeholder } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          value={defaultValue}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
      </form>
    );
  }
}
