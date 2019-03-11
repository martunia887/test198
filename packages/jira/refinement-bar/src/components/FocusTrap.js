// @flow

import React, { type ElementRef, type Node } from 'react';
import tabbable from 'tabbable';
import focusin from 'focusin';

type Props = {
  children: ({ ref: ElementRef<*> }) => Node,
  isActive: boolean,
};

export default class FocusTrap extends React.Component<Props> {
  static defaultProps = {
    isActive: true,
  };
  constructor(props) {
    super(props);

    if (typeof document !== 'undefined') {
      this.originElement = document.activeElement;
    }

    // lazily polyfill focusin for firefox
    if (!this.isPolyfilled) {
      focusin.polyfill();
      this.isPolyfilled = true;
    }

    this.target = React.createRef();
  }
  focus = () => {
    if (this.props.isActive) {
      const target = this.target.current;
      const el = tabbable(target)[0] || target;

      if (el && typeof el.focus === 'function') {
        el.focus();
      }
    }
  };
  handleFocusEvent = event => {
    const el = this.target.current;
    if (el !== event.target && !el.contains(event.target)) {
      this.focus();
    }
  };
  handleClick = event => {
    event.preventDefault();
  };

  componentDidMount() {
    this.focus();

    document.addEventListener('focusin', this.handleFocusEvent);
    document.addEventListener('click', this.handleFocusEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('focusin', this.handleFocusEvent);
    document.removeEventListener('click', this.handleFocusEvent);

    if (this.originElement && typeof this.originElement.focus === 'function') {
      this.originElement.focus();
    }
  }

  render() {
    return this.props.children({ ref: this.target });
  }
}
