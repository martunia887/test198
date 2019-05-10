import * as React from 'react';
import { PureComponent } from 'react';
import { Input } from './styles';

export interface Props {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default class ChromeCollapsed extends PureComponent<Props, {}> {
  private input?: HTMLElement;

  private clickHandler = (evt: React.MouseEvent<HTMLInputElement>) => {
    /**
     * We need this magic for FireFox.
     * The reason we need it is, when, in FireFox, we have focus inside input,
     * and then we remove that input and move focus to another place programmatically,
     * for whatever reason UP/DOWN arrows don't work until you blur and focus editor manually.
     */
    if (this.input) {
      this.input.blur();
    }

    if (this.props.onClick) {
      this.props.onClick(evt);
    }
  };

  private handleInputRef = (ref: HTMLElement) => {
    this.input = ref;
  };

  render() {
    const placeholder = this.props.text || 'Type something…';

    return (
      <Input
        innerRef={this.handleInputRef}
        onClick={this.clickHandler}
        placeholder={placeholder}
      />
    );
  }
}
