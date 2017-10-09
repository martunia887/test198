// @flow
import React from 'react';
import Span from '../styled/Chrome';
import type { tagColor, ReactElement } from '../types';

type Props = {
  children: Array<ReactElement>,
  isLink: bool,
  isRemovable: bool,
  isRemoved?: bool,
  isRemoving?: bool,
  isRounded?: bool,
  markedForRemoval: bool,
  onFocusChange: (focused: boolean) => mixed,
  color: tagColor,
};

export default class Chrome extends React.PureComponent<Props> {
  chromeRef: HTMLElement;

  handleKeyPress = (e: KeyboardEvent) => {
    const spacebarOrEnter = (e.key === ' ' || e.key === 'Enter');

    if (this.chromeRef && spacebarOrEnter) {
      const link = this.chromeRef.querySelector('a');
      if (link) link.click();
    }
  }

  handleBlur = () => {
    this.props.onFocusChange(false);
  }

  handleFocus = (e: Event) => {
    if (e.target === this.chromeRef) this.props.onFocusChange(true);
  }

  render() {
    const {
      children, isLink, isRemovable, isRemoved, isRemoving, isRounded, markedForRemoval, color,
    } = this.props;

    const props = {
      innerRef: r => { this.chromeRef = r; },
      isRemovable,
      isRemoved,
      isRemoving,
      isRounded,
      markedForRemoval,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyPress: this.handleKeyPress,
      tabIndex: -1,
      color,
      role: '',
    };

    if (isLink) {
      props.role = 'link';
      props.tabIndex = 0;
    }

    return <Span {...props}>{children}</Span>;
  }
}
