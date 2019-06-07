import React, { Component } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import NodeResolver from 'react-node-resolver';
import { Manager, Reference, Popper } from '@atlaskit/popper';
import { Props } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';
import { Container } from './styled';

interface PopperProps {
  ref: (node: HTMLElement | null) => void;
  style: React.CSSProperties;
  outOfBoundaries: boolean | null;
}

class InlineDialog extends Component<Props, {}> {
  static defaultProps = {
    children: null,
    content: null,
    isOpen: false,
    onContentBlur: () => {},
    onContentClick: () => {},
    onContentFocus: () => {},
    onClose: () => {},
    placement: 'bottom-start',
  };

  containerRef?: HTMLElement;

  triggerRef?: HTMLElement;

  componentDidUpdate(prevProps: Props) {
    if (typeof window === 'undefined') return;

    if (!prevProps.isOpen && this.props.isOpen) {
      window.addEventListener('click', this.handleClickOutside, true);
    } else if (prevProps.isOpen && !this.props.isOpen) {
      window.removeEventListener('click', this.handleClickOutside);
    }
  }

  componentDidMount() {
    if (typeof window === 'undefined') return;

    if (this.props.isOpen) {
      window.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event: any) => {
    const { isOpen, onClose } = this.props;

    if (event.defaultPrevented) return;

    const container = this.containerRef;
    const trigger = this.triggerRef;
    const { target } = event;

    // exit if we click outside but on the trigger — it can handle the clicks itself
    if (trigger && trigger.contains(target)) return;

    // call onClose if the click originated from outside the dialog
    if (isOpen && container && !container.contains(target)) {
      onClose && onClose({ isOpen: false, event });
    }
  };

  render() {
    const {
      children,
      placement,
      isOpen,
      content,
      onContentBlur,
      onContentFocus,
      onContentClick,
    } = this.props;

    const popper = isOpen ? (
      <Popper placement={placement}>
        {({ ref, style }: PopperProps) => (
          <Container
            onBlur={onContentBlur}
            onFocus={onContentFocus}
            onClick={onContentClick}
            innerRef={node => {
              this.containerRef = node;
              ref(node);
            }}
            style={style}
          >
            {content}
          </Container>
        )}
      </Popper>
    ) : null;

    return (
      <Manager>
        <Reference>
          {({ ref }: PopperProps) => (
            <NodeResolver
              innerRef={(node: HTMLElement) => {
                this.triggerRef = node;
                ref(node);
              }}
            >
              {children}
            </NodeResolver>
          )}
        </Reference>
        {popper}
      </Manager>
    );
  }
}

export { InlineDialog as InlineDialogWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'inlineDialog',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onClose: createAndFireEventOnAtlaskit({
      action: 'closed',
      actionSubject: 'inlineDialog',

      attributes: {
        componentName: 'inlineDialog',
        packageName,
        packageVersion,
      },
    }),
  })(InlineDialog),
);
