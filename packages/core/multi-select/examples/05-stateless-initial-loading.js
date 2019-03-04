// @flow
import React from 'react';
import { MultiSelectStateless } from '../';
import type { GroupType } from '../types';

const array: Array<GroupType> = [];
export default () => (
  <MultiSelectStateless
    items={array}
    label="Always loading..."
    isLoading
    loadingMessage="Custom loading message"
    isOpen
    shouldFitContainer
  />
);
