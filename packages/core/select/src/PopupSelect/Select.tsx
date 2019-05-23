import React, {
  PureComponent,
  // ElementRef,
  // Element as ElementType,
  // Node,
} from 'react';
import { createPortal } from 'react-dom';
import Select from 'react-select';
import {
  ActionMeta,
  ValueType,
  OptionsType,
  GroupedOptionsType,
} from 'react-select/lib/types';
import { SelectComponents } from 'react-select/lib/components';
import { StylesConfig } from 'react-select/lib/styles';

import createFocusTrap, { FocusTrap } from 'focus-trap';
import { Manager, Reference, Popper, PopperProps } from 'react-popper';
import { Placement as PoperJSPlacements } from 'popper.js';
import NodeResolver from 'react-node-resolver';
import shallowEqualObjects from 'shallow-equal/objects';

import { colors } from '@atlaskit/theme';
import { Omit } from '../../../type-helpers';

import { MenuDialog, DummyControl, defaultComponents } from './components';

/** Are we rendering on the client or server? */
const canUseDOM = () =>
  Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement,
  );

// ==============================
// Types
// ==============================

interface PopperPropsWith extends PopperProps {
  positionFixed?: boolean;
}
type PopperPropsNoChildren = Omit<PopperPropsWith, 'children'>;

interface Props {
  closeMenuOnSelect: boolean;
  components: SelectComponents<any>;
  controlShouldRenderValue: boolean;
  footer?: Node;
  handleKeyDown?: (event: KeyboardEvent) => void;
  maxMenuHeight: number;
  maxMenuWidth: number;
  minMenuWidth: number;
  onChange?: (value: ValueType<HTMLElement>, actionMeta: Object) => void;
  onClose?: () => void;
  onOpen?: () => void;
  options: OptionsType<any>;
  popperProps?: PopperPropsNoChildren;
  searchThreshold: number;
  styles: StylesConfig;
  target: (targetProps: { ref: any; isOpen: boolean }) => React.ReactNode;
}
interface State {
  isOpen?: boolean;
  mergedComponents: Object;
  mergedPopperProps: PopperPropsNoChildren;
}

// ==============================
// Class
// ==============================

const defaultStyles = {
  groupHeading: (provided: {}) => ({ ...provided, color: colors.N80 }),
};

const defaultPopperProps = {
  modifiers: { offset: { offset: `0, 8` } },
  placement: 'bottom-start' as PoperJSPlacements,
  positionFixed: false,
};

const isEmpty = (obj: {}) => Object.keys(obj).length === 0;

export default class PopupSelect extends PureComponent<Props, State> {
  focusTrap: FocusTrap | null = null;

  menuRef: HTMLElement | null = null;

  selectRef: Select<any> | null = null;

  targetRef: HTMLElement | null = null;

  state = {
    isOpen: false,
    mergedComponents: defaultComponents,
    mergedPopperProps: defaultPopperProps,
  };

  static defaultProps = {
    closeMenuOnSelect: true,
    components: {},
    maxMenuHeight: 300,
    maxMenuWidth: 440,
    minMenuWidth: 220,
    popperProps: {},
    searchThreshold: 5,
    styles: {},
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const newState: Partial<State> = {};

    // Merge consumer and default popper props
    const mergedPopperProps = { ...defaultPopperProps, ...props.popperProps };
    if (!shallowEqualObjects(mergedPopperProps, state.mergedPopperProps)) {
      newState.mergedPopperProps = mergedPopperProps;
    }

    // Merge consumer and default components
    const mergedComponents = { ...defaultComponents, ...props.components };
    if (!shallowEqualObjects(mergedComponents, state.mergedComponents)) {
      newState.mergedComponents = mergedComponents;
    }

    if (!isEmpty(newState)) return newState;

    return null;
  }

  componentDidMount() {
    if (typeof window === 'undefined') return;
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('click', this.handleClick);
  }

  // Event Handlers
  // ==============================

  handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    switch (key) {
      case 'Escape':
      case 'Esc':
        this.close();
        break;
      default:
    }
    if (this.props.handleKeyDown) {
      this.props.handleKeyDown(event);
    }
  };

  handleClick = ({ target }: MouseEvent) => {
    const { isOpen } = this.state;
    // appease flow
    if (!(target instanceof Element)) return;

    // NOTE: Why not use the <Blanket /> component to close?
    // We don't want to interupt the user's flow. Taking this approach allows
    // user to click "through" to other elements and close the popout.
    if (isOpen && (this.menuRef && !this.menuRef.contains(target))) {
      this.close();
    }

    // open on target click -- we can't trust consumers to spread the onClick
    // property to the target
    if (!isOpen && (this.targetRef && this.targetRef.contains(target))) {
      this.open();
    }
  };

  handleSelectChange = (
    value: ValueType<HTMLElement>,
    actionMeta: ActionMeta,
  ) => {
    const { closeMenuOnSelect, onChange } = this.props;
    if (closeMenuOnSelect && actionMeta.action !== 'clear') this.close();
    if (onChange) onChange(value, actionMeta);
  };

  // Internal Lifecycle
  // ==============================

  open = () => {
    const { onOpen } = this.props;
    if (onOpen) onOpen();

    this.setState({ isOpen: true }, this.initialiseFocusTrap);

    if (this.selectRef) {
      this.selectRef.openMenu('first');
    }

    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', this.handleKeyDown);
  };

  initialiseFocusTrap = () => {
    const trapConfig = {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      fallbackFocus: this.menuRef ? this.menuRef : undefined,
      returnFocusOnDeactivate: true,
    };

    if (this.menuRef) {
      this.focusTrap = createFocusTrap(this.menuRef, trapConfig);
    }

    // allow time for the HTMLElement to render
    setTimeout(() => {
      if (this.focusTrap) {
        this.focusTrap.activate();
      }
    }, 1);
  };

  close = () => {
    const { onClose } = this.props;
    if (onClose) onClose();

    this.setState({ isOpen: false });

    if (this.focusTrap) {
      this.focusTrap.deactivate();
    }

    if (typeof window === 'undefined') return;
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  // Refs
  // ==============================

  resolveTargetRef = (popperRef: (ref: HTMLElement) => void) => (
    ref: HTMLElement,
  ) => {
    // avoid thrashing fn calls
    if (!this.targetRef && popperRef && ref) {
      this.targetRef = ref;
      popperRef(ref);
    }
  };

  resolveMenuRef = (popperRef: (ref: HTMLElement | null) => void) => (
    ref: HTMLElement | null,
  ) => {
    this.menuRef = ref;
    popperRef(ref);
  };

  getSelectRef = (ref: Select<any> | null) => {
    this.selectRef = ref;
  };

  // Utils
  // ==============================

  // account for groups when counting options
  // this may need to be recursive, right now it just counts one level
  getItemCount = () => {
    const { options } = this.props;
    let count = 0;

    options.forEach(groupOrOption => {
      if (groupOrOption.options) {
        groupOrOption.options.forEach(() => count++);
      } else {
        count++;
      }
    });

    return count;
  };

  getMaxHeight = () => {
    const { maxMenuHeight } = this.props;

    if (!this.selectRef) return maxMenuHeight;

    // subtract the control height to maintain consistency
    const showSearchControl = this.showSearchControl();
    let offsetHeight = 0;

    if (showSearchControl) {
      const controlRef = this.selectRef.controlRef as any; // TODO:

      offsetHeight = controlRef.offsetHeight;
    }

    const maxHeight = maxMenuHeight - offsetHeight;

    return maxHeight;
  };

  // if the threshold is exceeded display the search control
  showSearchControl = () => {
    const { searchThreshold } = this.props;
    return this.getItemCount() > searchThreshold;
  };

  // Renderers
  // ==============================

  renderSelect = () => {
    const { footer, maxMenuWidth, minMenuWidth, target, ...props } = this.props;
    const { isOpen, mergedComponents, mergedPopperProps } = this.state;
    const showSearchControl = this.showSearchControl();
    const portalDestination = canUseDOM() ? document.body : null;
    const components = {
      ...mergedComponents,
      Control: showSearchControl ? mergedComponents.Control : DummyControl,
    };

    if (!portalDestination || !isOpen) return null;

    const popper = (
      <Popper {...mergedPopperProps}>
        {({ placement, ref, style }) => {
          return (
            <NodeResolver innerRef={this.resolveMenuRef(ref)}>
              <MenuDialog
                style={style}
                data-placement={placement}
                minWidth={minMenuWidth}
                maxWidth={maxMenuWidth}
              >
                <Select
                  backspaceRemovesValue={false}
                  controlShouldRenderValue={false}
                  isClearable={false}
                  tabSelectsValue={false}
                  menuIsOpen
                  ref={this.getSelectRef}
                  {...props}
                  styles={{ ...defaultStyles, ...props.styles }}
                  maxMenuHeight={this.getMaxHeight()}
                  components={components}
                  onChange={this.handleSelectChange}
                />
                {footer}
              </MenuDialog>
            </NodeResolver>
          );
        }}
      </Popper>
    );
    return mergedPopperProps.positionFixed
      ? popper
      : createPortal(popper, portalDestination);
  };

  render() {
    const { target } = this.props;
    const { isOpen } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => target({ ref: this.resolveTargetRef(ref), isOpen })}
        </Reference>
        {this.renderSelect()}
      </Manager>
    );
  }
}
