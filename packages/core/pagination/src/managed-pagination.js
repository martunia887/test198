import React, { Component, Fragment, type ComponentType } from 'react';
import Pagination from './components/pagination';
import { LeftNavigator, RightNavigator } from './components/navigators';
import Ellipses from './components/ellipses';
import collapseRange from './util/collapse-range';

type PropsType = {
  children: Array<ComponentType>,
  leftNavigatorComponent: ComponentType,
  rightNavigatorComponent: ComponentType,
  collapseRange: boolean,
  maxVisible: number,
  onChange: Function,
  ellipsis: ComponentType,
  selectedIndex?: number,
  defaultSelectedIndex: number,
};

export default class managedPagination extends Component {
  static defaultProps = {
    leftNavigatorComponent: LeftNavigator,
    rightNavigatorComponent: RightNavigator,
    collapseRange,
    maxVisible: 7,
    defaultSelectedIndex: 1,
    onChange: () => {},
  };

  state = {
    selectedIndex: this.props.selectedIndex || this.props.defaultSelectedIndex,
  };

  onPageChange = page => {
    if (!this.props.selectedIndex) {
      this.setState({
        selectedIndex: page,
      });
    }
    this.props.onChange(page);
  };

  getValueOf = prop => {
    if (this.props[prop]) return this.props[prop];
    return this.state[prop];
  };

  renderRightNavigator = ({ isDisabled, onClick }) => {
    const { rightNavigatorComponent: RightNavigatorComponent } = this.props;
    return (
      <RightNavigatorComponent isDisabled={isDisabled} onClick={onClick} />
    );
  };

  render() {
    const selectedIndex = this.getValueOf('selectedIndex');
    const {
      leftNavigatorComponent: LeftNavigatorComponent,
      rightNavigatorComponent: RightNavigatorComponent,
    } = this.props;

    const pages = React.Children.map(this.props.children, (page, index) =>
      React.cloneElement(page, {
        isSelected: index === selectedIndex,
        onClick: () => this.onPageChange(index),
      }),
    );
    const visiblePages = collapseRange(7, selectedIndex, pages, <Ellipses />);
    console.log(visiblePages);
    return (
      <Pagination>
        {() => (
          <Fragment>
            <LeftNavigatorComponent
              isDisabled={0 === selectedIndex}
              onClick={() => this.onPageChange(selectedIndex - 1)}
            />
            {visiblePages}
            <RightNavigatorComponent
              isDisabled={pages.length - 1 === selectedIndex}
              onClick={() => this.onPageChange(selectedIndex + 1)}
            />
          </Fragment>
        )}
      </Pagination>
    );
  }
}
