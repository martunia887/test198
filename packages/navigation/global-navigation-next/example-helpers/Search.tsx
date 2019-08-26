import React from 'react';

import { Search } from '../src';

const drawerContent = () => <div>quick search</div>;

const onDrawerCloseComplete = () => {
  console.log('search close completed');
};

export const DefaultSearch = () => (
  <Search
    drawerContent={drawerContent}
    text="Search"
    onDrawerCloseComplete={onDrawerCloseComplete}
  />
);
