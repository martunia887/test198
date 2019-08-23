import React from 'react';

import { Search, SearchProps } from '../src';

const drawerContent = () => <div>quick search</div>;

const onDrawerCloseComplete = () => {
  console.log('search close completed');
};

export const DefaultSearch = (props: SearchProps) => (
  <Search
    {...props}
    drawerContent={drawerContent}
    text="Search"
    onDrawerCloseComplete={onDrawerCloseComplete}
  />
);
