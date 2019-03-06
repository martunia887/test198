// @flow
import React from 'react';
import { StatelessSelect } from '..';

const InitialLoading = () => (
  <StatelessSelect
    items={[]}
    isOpen
    isLoading
    loadingMessage="Custom loading message"
    shouldFitContainer
  />
);

export default InitialLoading;
