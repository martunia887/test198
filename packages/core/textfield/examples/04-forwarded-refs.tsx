import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Textfield from '../src';

class TextFieldExample extends Component<{}> {
  private input: HTMLInputElement | undefined;

  handleRef = (ref: HTMLInputElement) => {
    this.input = ref;
  };

  handleFocus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  render() {
    return (
      <div>
        <Textfield ref={this.handleRef} />
        <p>
          <Button appearance="primary" onClick={this.handleFocus}>
            Focus Textfield
          </Button>
        </p>
      </div>
    );
  }
}

export default TextFieldExample;
