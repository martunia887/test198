//@flow
import React, { Component, Fragment } from 'react';
import { gridSize } from '@atlaskit/theme';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import Pagination from '../src';

const pages = [
  {
    link: '/',
    label: '1',
  },
  {
    link: '/about',
    label: '2',
  },
  {
    link: '/contact',
    label: '3',
  },
];

const Dashboard = () => (
  <div>
    <h1>Dashboard page</h1>
    <PaginationWithSelectPage pageSelected={0} />
  </div>
);
const About = () => (
  <div>
    <h1>About page</h1>
    <PaginationWithSelectPage pageSelected={1} />
  </div>
);
const Contact = () => (
  <div>
    <h1>Contact page</h1>
    <PaginationWithSelectPage pageSelected={2} />
  </div>
);

const PaginationWithSelectPage = ({
  pageSelected,
}: {
  pageSelected: number,
}) => (
  <Pagination styles={{ marginTop: `${gridSize() * 3}px` }}>
    {(LeftNavigator, Page, RightNavigator) => (
      <Fragment>
        {pageSelected !== 0 ? (
          <Link to={pageSelected === 0 ? '' : pages[pageSelected - 1].link}>
            <LeftNavigator />
          </Link>
        ) : (
          <LeftNavigator isDisabled />
        )}
        {pages.map((page, index) => (
          <Page
            key={page.link}
            isSelected={pageSelected === index}
            component={({ className, children }) => (
              <Link to={page.link} className={className} key={`${page.link}`}>
                {children}
              </Link>
            )}
          >
            {page.label}
          </Page>
        ))}
        {pageSelected !== 2 ? (
          <Link to={pageSelected === 2 ? '' : pages[pageSelected + 1].link}>
            <RightNavigator />
          </Link>
        ) : (
          <RightNavigator isDisabled />
        )}
      </Fragment>
    )}
  </Pagination>
);

export default class WithReactRouterLink extends Component<{}> {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/" isExact component={Dashboard} />
        </Switch>
      </HashRouter>
    );
  }
}
