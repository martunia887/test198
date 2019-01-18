import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { InputHTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';

export interface Props {
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  defaultValue?: string;
  placeholder?: string;
  onBlur?: (text: string) => void;
  onSubmit?: (text) => void;
  loadItems: () => Promise<any>;
  searchItems: () => Promise<any>;
  maxItems?: number;
}

export interface State {
  text: string;
}

export const Input: ComponentClass<
  InputHTMLAttributes<{}> & { innerRef?: any }
> = styled.input`
  input& {
    border: 0;
    border-radius: 0;
    box-sizing: border-box;
    color: ${colors.N400};
    font-size: 13px;
    line-height: 20px;
    padding: 8px;
    min-width: 145px;
    width: 100%;

    /* Hides IE10+ built-in [x] clear input button */
    &::-ms-clear {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${colors.N400};
      opacity: 0.5;
    }
  }
`;

export default class Typeahead extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: props.defaultValue || '',
    };
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.text);
  };

  handleBlur = e => {
    e.preventDefault();
    this.props.onBlur && this.props.onBlur(this.state.text);
  };

  render() {
    const { placeholder, TypeaheadItems, provider, onSubmit } = this.props;

    return (
      <form>
        <Input
          value={this.state.text}
          onChange={this.handleChange}
          placeholder={placeholder}
          onBlur={this.handleBlur}
          autoFocus
        />
        <TypeaheadItems
          inputValue={this.state.text}
          provider={provider}
          onSubmit={onSubmit}
        />
      </form>
    );
  }
}
