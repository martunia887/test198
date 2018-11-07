//@flow
import React, { Component, Fragment } from 'react';
import Pagination, { collapseRange } from '../src';

const MAX_NUMBER_OF_PAGES = 7;

type State = {
  items: Array<{ value: number }>,
  selected: number,
};

export default class extends Component<{}, State> {
  state = {
    items: pageLinks,
    selected: 1,
  };

  onArrowClicked = (direction?: string) => {
    if (direction === 'previous') {
      this.setState({
        selected: this.state.selected - 1,
      });
    } else {
      this.setState({
        selected: this.state.selected + 1,
      });
    }
  };

  updateTheSelected = (newPage: number) => {
    this.setState({
      selected: newPage,
    });
  };

  render() {
    const pageLinksCollapsed = collapseRange(
      MAX_NUMBER_OF_PAGES,
      this.state.selected,
      this.state.items,
    );
    const { selected } = this.state;
    const firstPage = pageLinksCollapsed[0];
    const lastPage = pageLinksCollapsed[pageLinksCollapsed.length - 1];
    return (
      <Pagination>
        {(LeftNavigator, Link, RightNavigator, Ellipses) => (
          <Fragment>
            <LeftNavigator
              isDisabled={firstPage.value === selected}
              onClick={() => this.onArrowClicked('previous')}
            />
            {pageLinksCollapsed.map((pageLink, index) => {
              if (pageLink === '...') {
                return (
                  <Ellipses
                    //eslint-disable-next-line
                    key={`${pageLink}-${index}`}
                  />
                );
              }
              const { value } = pageLink;
              return (
                <Link
                  key={`${value}`}
                  onClick={() => this.updateTheSelected(value)}
                  isSelected={value === this.state.selected}
                >
                  {value}
                </Link>
              );
            })}
            <RightNavigator
              isDisabled={lastPage.value === selected}
              onClick={() => {
                this.onArrowClicked();
              }}
            />
          </Fragment>
        )}
      </Pagination>
    );
  }
}

const pageLinks: Array<{ value: number }> = [...Array(13)].map((_, index) => ({
  value: index + 1,
}));
