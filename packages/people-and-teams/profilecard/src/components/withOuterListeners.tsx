import * as React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  handleClickOutside?: () => void;
  handleEscapeKeydown?: () => void;
}

export default function withOuterListeners(Component: any) {
  return class WithOutsideClick extends React.PureComponent<Props> {
    componentDidMount() {
      if (this.props.handleClickOutside) {
        document.addEventListener('click', this.handleClick, false);
      }

      if (this.props.handleEscapeKeydown) {
        document.addEventListener('keydown', this.handleKeydown, false);
      }
    }

    componentWillUnmount() {
      if (this.props.handleClickOutside) {
        document.removeEventListener('click', this.handleClick, false);
      }

      if (this.props.handleEscapeKeydown) {
        document.removeEventListener('keydown', this.handleKeydown, false);
      }
    }

    handleClick = (evt: any) => {
      const { handleClickOutside } = this.props;

      if (handleClickOutside) {
        const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

        if (
          !domNode ||
          (evt.target instanceof Node && !domNode.contains(evt.target))
        ) {
          handleClickOutside();
        }
      }
    };

    handleKeydown = (evt: any) => {
      const { handleEscapeKeydown } = this.props;

      if (handleEscapeKeydown && evt.code === 'Escape') {
        handleEscapeKeydown();
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  };
}
