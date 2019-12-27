import * as React from 'react';
import { KeyboardEvent, PureComponent } from 'react';
import { Input } from './styles';
import { FocusEvent } from 'react';
import browserData from '@atlaskit/editor-common/src/utils/browser';

export interface Props {
  autoFocus?: boolean | FocusOptions;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: (e: KeyboardEvent) => void;
  placeholder?: string;
  onMouseDown?: Function;
  onKeyDown?: (e: KeyboardEvent<any>) => void;
  // overrides default browser undo behaviour (cmd/ctrl + z) with that function
  onUndo?: Function;
  // overrides default browser redo behaviour (cm + shift + z / ctrl + y) with that function
  onRedo?: Function;
  onBlur?: Function;
  width?: number;
  maxLength?: number;
  testId?: string;
}

export interface State {
  value?: string;
}

export default class PanelTextInput extends PureComponent<Props, State> {
  private input?: HTMLInputElement;
  private focusTimeoutId: number | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.defaultValue || '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        value: nextProps.defaultValue,
      });
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.focusTimeoutId);
  }

  onMouseDown = () => {
    const { onMouseDown } = this.props;
    if (onMouseDown) {
      onMouseDown();
    }
  };

  onBlur = (e: FocusEvent<any>) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }
  };

  render() {
    const { placeholder, width, maxLength, testId } = this.props;
    const { value } = this.state;
    return (
      <Input
        data-testid={testId || ''}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeydown}
        onMouseDown={this.onMouseDown}
        onBlur={this.onBlur}
        innerRef={this.handleRef}
        width={width}
        maxLength={maxLength}
      />
    );
  }

  focus() {
    const { input } = this;
    if (input) {
      const focusOpts =
        typeof this.props.autoFocus === 'object' ? this.props.autoFocus : {};
      input.focus(focusOpts);
    }
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (this.input) {
      this.setState({
        value: this.input.value,
      });
    }

    if (onChange && this.input) {
      onChange(this.input.value);
    }
  };

  private handleKeydown = (e: KeyboardEvent<any>) => {
    const { onUndo, onRedo, onSubmit, onCancel } = this.props;
    if (e.keyCode === 13 && onSubmit) {
      e.preventDefault(); // Prevent from submitting if an editor is inside a form.
      onSubmit(this.input!.value);
    } else if (e.keyCode === 27 && onCancel) {
      onCancel(e);
    } else if (
      typeof onUndo === 'function' &&
      e.key === 'z' &&
      // cmd + z for mac
      ((browserData.mac && e.metaKey && !e.shiftKey) ||
        // ctrl + z for non-mac
        (!browserData.mac && e.ctrlKey))
    ) {
      e.preventDefault();
      onUndo();
    } else if (
      typeof onRedo === 'function' &&
      // cmd + shift + z for mac
      ((browserData.mac && e.metaKey && e.shiftKey && e.key === 'z') ||
        // ctrl + y for non-mac
        (!browserData.mac && e.ctrlKey && e.key === 'y'))
    ) {
      e.preventDefault();
      onRedo();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  private handleRef = (input: HTMLInputElement | null) => {
    if (input instanceof HTMLInputElement) {
      this.input = input;
      if (this.props.autoFocus) {
        // Need this to prevent jumping when we render TextInput inside Portal @see ED-2992
        this.focusTimeoutId = window.setTimeout(() => this.focus());
      }
    } else {
      this.input = undefined;
    }
  };
}
