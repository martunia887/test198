import React from 'react';
import Page from '../src/components/page';
import Pagination from '../src/managed-pagination';

const index = 0;

const leftComponent = ({ onClick }) => <div onClick={onClick}>Hello</div>;

export default () => (
  <Pagination selecetedIndex={1} leftNavigatorComponent={leftComponent}>
    {[...Array(10)].map((_, index) => <Page key={index}>{index + 1}</Page>)}
  </Pagination>
);
