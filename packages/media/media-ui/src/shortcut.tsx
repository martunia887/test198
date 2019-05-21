import { Component } from 'react';

export const keyCodes = {
  space: 32,
  m: 77,
};

export interface ShortcutProps {
  keyCode: number;
  handler: () => void;
  preventDefault?: boolean;
}
export class Shortcut extends Component<ShortcutProps, {}> {
  defaultProps = {
    preventDefault: false,
  };

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.release();
  }

  render() {
    return null;
  }

  private keyHandler = (e: KeyboardEvent) => {
    const { keyCode, handler, preventDefault } = this.props;
    if (e.keyCode === keyCode) {
      if (preventDefault) {
        e.preventDefault();
      }
      handler();
    }
  };

  private init = () => {
    document.addEventListener('keydown', this.keyHandler);
  };

  private release = () => {
    document.removeEventListener('keydown', this.keyHandler);
  };
}
