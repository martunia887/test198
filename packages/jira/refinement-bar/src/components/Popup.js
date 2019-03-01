// @flow
/** @jsx jsx */

import React, {
  PureComponent,
  forwardRef,
  type ElementRef,
  type Element as ElementType,
  type Node,
} from 'react';
import { createPortal } from 'react-dom';
import createFocusTrap from 'focus-trap';
import { applyRefs } from 'apply-ref';
import {
  Manager,
  Reference,
  Popper,
  type PopperProps,
  type PopperChildrenProps,
} from 'react-popper';
import { colors, gridSize, layers } from '@atlaskit/theme';
import { jsx } from '@emotion/core';

// ==============================
// Types
// ==============================

type PopperChildren = { children: PopperChildrenProps => Node };
type PopperPropsNoChildren = $Diff<PopperProps, PopperChildren>;
type Props = {
  allowClose: boolean,
  children?: Node | (({ scheduleUpdate: * }) => Node),
  popperProps?: PopperPropsNoChildren,
  target: ({
    ref: ElementRef<*>,
    isOpen: boolean,
    onClick: (*) => void,
  }) => ElementType<*>,
};
type State = {
  isOpen: boolean,
  popperProps: PopperPropsNoChildren,
};

const defaultPopperProps = {
  modifiers: { offset: { offset: `0, 8` } },
  placement: 'bottom-start',
};

// ==============================
// Class
// ==============================

export default class Popup extends PureComponent<Props, State> {
  focusTrap: Object;
  dialogRef: HTMLElement = React.createRef();
  state = { isOpen: false, popperProps: defaultPopperProps };
  constructor(props) {
    super(props);
    this.uniqueDialogKey = Math.random()
      .toString(32)
      .slice(2);
  }
  static getDerivedStateFromProps(p, s) {
    if (p.popperProps !== s.popperProps) {
      return { popperProps: { ...defaultPopperProps, ...p.popperProps } };
    }
    return null;
  }
  static defaultProps = {
    allowClose: true,
    popperProps: defaultPopperProps,
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (isEscapeEvent(event)) {
      this.close(event);
    }
  };
  handleClick = (event: MouseEvent) => {
    const { target } = event;

    if (this.dialogRef.current && !this.dialogRef.current.contains(target)) {
      this.close(event);
    }
  };

  open = event => {
    this.openEvent = event.nativeEvent;

    this.setState({ isOpen: true }, this.initialiseFocusTrap);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleClick);
  };
  close = event => {
    // bail if this is the open event; listeners are bound too quickly...
    if (this.openEvent === event) return;

    // the consumer needs this dialog to remain open, likely until an invalid
    // state is resolved
    if (!this.props.allowClose) return;

    this.setState({ isOpen: false }, this.focusTrap.deactivate);

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleClick);
  };
  initialiseFocusTrap = () => {
    const trapConfig = {
      clickOutsideDeactivates: true, // TODO should respond to `allowClose`
      escapeDeactivates: true, // TODO should respond to `allowClose`
      fallbackFocus: this.dialogRef.current,
      returnFocusOnDeactivate: true,
      // onDeactivate: this.close, // this would be nice...
    };
    this.focusTrap = createFocusTrap(this.dialogRef.current, trapConfig);

    // wait until the dialog is positioned, it begins at left/top 0/0.
    // otherwise the body will be scrolled to top.
    setTimeout(() => {
      this.focusTrap.activate();
    }, 1);
  };

  render() {
    const { children, target } = this.props;
    const { isOpen, popperProps } = this.state;
    const onClick = isOpen ? this.close : this.open;

    const popperInstance = (
      <Popper {...popperProps}>
        {({ placement, ref, style, scheduleUpdate }) => {
          return (
            <Dialog
              ref={applyRefs(ref, this.dialogRef)}
              style={style}
              data-placement={placement}
            >
              {typeof children === 'function'
                ? children({ scheduleUpdate })
                : children}
            </Dialog>
          );
        }}
      </Popper>
    );

    const fixedOrPortal = popperProps.positionFixed
      ? popperInstance
      : createPortal(popperInstance, document.body);

    return (
      <Manager>
        <Reference>{({ ref }) => target({ ref, isOpen, onClick })}</Reference>
        {isOpen ? fixedOrPortal : null}
      </Manager>
    );
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

// ==============================
// Styled Components
// ==============================

export const Dialog = forwardRef((props: *, ref) => {
  const shadow = colors.N40A;
  return (
    <div
      ref={ref}
      css={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        zIndex: layers.layer(),
      }}
      {...props}
    />
  );
});
export const DialogInner = forwardRef(
  ({ isPadded, maxWidth, minWidth, ...props }: *, ref) => (
    <div
      ref={ref}
      css={{
        maxWidth,
        minWidth,
        padding: isPadded ? gridSize() * 1.5 : null,
      }}
      {...props}
    />
  ),
);
DialogInner.defaultProps = {
  isPadded: false,
  maxWidth: 440,
  minWidth: 160,
};
