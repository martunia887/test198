// @flow
/** @jsx jsx */

// $FlowFixMe
import { Component, createRef, forwardRef, Fragment, type Node } from 'react';
import createFocusTrap from 'focus-trap';
import { jsx } from '@emotion/core';
import { colors, gridSize, layers } from '@atlaskit/theme';

const NOOP = () => {};

type Props = {
  allowClose: boolean,
  children: Node,
  onClose: (*) => void,
  onOpen: (*) => void,
  target: Object => Node,
};
type State = { isOpen: boolean, placement: 'left' | 'right' };

// smart components

export default class Dropdown extends Component<Props, State> {
  static defaultProps = {
    onClose: NOOP,
    onOpen: NOOP,
  };
  state = { isOpen: false, placement: 'left' };
  dialogRef = createRef();
  targetRef = createRef();
  focusTrap: *;

  resolveTargetRef = (popperRef: *) => (ref: *) => {
    // $FlowFixMe
    this.targetRef(ref);
    popperRef(ref);
  };
  handleKeyDown = ({ key }: *) => {
    if (key === 'Escape') this.close();
  };
  initialiseFocusTrap = () => {
    const trapConfig = {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      fallbackFocus: this.dialogRef.current,
      returnFocusOnDeactivate: true,
    };
    this.focusTrap = createFocusTrap(this.dialogRef.current, trapConfig);

    // allow time for the HTMLElement to render
    setTimeout(() => this.focusTrap.activate(), 1);
  };

  close = (e: *) => {
    if (!this.props.allowClose) return;

    this.setState({ isOpen: false }, () => {
      window.removeEventListener('keydown', this.handleKeyDown);
      this.focusTrap.deactivate();
      this.props.onClose(e);
    });
  };

  open = (e: *) => {
    this.setState({ isOpen: true }, () => {
      window.addEventListener('keydown', this.handleKeyDown);

      if (this.dialogRef.current) {
        this.initialiseFocusTrap();
        // $FlowFixMe
        const { right } = this.dialogRef.current.getBoundingClientRect();
        const placement = right > window.innerWidth ? 'right' : 'left';
        this.setState({ placement });
        this.props.onOpen(e);
      }
    });
  };

  handleClick = (e: *) => {
    const fn = this.state.isOpen ? this.close : this.open;
    fn(e);
  };

  render() {
    const { children, target } = this.props;
    const { isOpen, placement } = this.state;
    const onClick = isOpen ? this.close : this.open;
    const args = { isOpen, onClick, ref: this.targetRef };

    return (
      <Wrapper>
        {target(args)}
        {isOpen ? (
          <Fragment>
            <Dialog placement={placement} ref={this.dialogRef}>
              {children}
            </Dialog>
            <Blanket onClick={this.close} />
          </Fragment>
        ) : null}
      </Wrapper>
    );
  }
}

// Styled Components

const Wrapper = props => <div css={{ position: 'relative' }} {...props} />;
const Blanket = props => (
  <div
    css={{
      position: 'fixed',
      zIndex: layers.blanket(),
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    }}
    {...props}
  />
);
const Dialog = forwardRef(({ placement, ...props }, ref) => (
  <div
    ref={ref}
    css={{
      backgroundColor: 'white',
      borderRadius: 4,
      boxShadow: `0 0 0 1px ${colors.N40A}, 0 4px 11px ${colors.N40A}`,
      marginTop: 8,
      maxWidth: 440,
      minWidth: 160,
      padding: `${gridSize()}px ${gridSize() * 1.5}px`,
      position: 'absolute',
      top: '100%',
      [placement]: 0,
      zIndex: layers.modal(),
    }}
    {...props}
  />
));
