import React, { Component, Fragment, type ComponentType } from 'react';
import Pagination from './components/pagination';
import { LeftNavigator, RightNavigator } from './components/navigators';
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
    console.log(page);
    this.setState({
      selectedIndex: page,
    });
    this.props.onChange(page);
  };

  getValueOf = prop => {
    if (this.props[prop]) return this.props[prop];
    return this.state[prop];
  };

  renderLeftNavigator = ({ isDisabled, onClick }) => {
    const { leftNavigatorComponent: LeftNavigatorComponent } = this.props;
    return <LeftNavigatorComponent isDisabled={isDisabled} onClick={onClick} />;
  };

  renderRightNavigator = ({ isDisabled, onClick }) => {
    const { rightNavigatorComponent: RightNavigatorComponent } = this.props;
    return (
      <RightNavigatorComponent isDisabled={isDisabled} onClick={onClick} />
    );
  };

  render() {
    const {
      leftNavigatorComponent: LeftNavigatorComponent,
      children: Pages,
      rightNavigatorComponent: RightNavigatorComponent,
    } = this.props;
    const selectedIndex = this.getValueOf('selectedIndex');
    const pages = React.Children.map(Pages, (page, index) =>
      React.cloneElement(page, {
        isSelected: index === selectedIndex,
        onClick: () => this.onPageChange(index),
      }),
    );
    return (
      <Pagination>
        {() => (
          <Fragment>
            {(() => {
              const isDisabled = 0 === selectedIndex;
              const onClick = () => this.onPageChange(selectedIndex - 1);
              return this.renderLeftNavigator({ isDisabled, onClick });
            })()}
            {pages}
            {(() => {
              const isDisabled = pages.length - 1 === selectedIndex;
              const onClick = () => this.onPageChange(selectedIndex + 1);
              return this.renderRightNavigator({ isDisabled, onClick });
            })()}
          </Fragment>
        )}
      </Pagination>
    );
  }
}
