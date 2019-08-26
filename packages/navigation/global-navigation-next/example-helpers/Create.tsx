import React from 'react';

import { Create } from '../src';

const onClick = () => {
  console.log('Create clicked');
};

export const DefaultCreate = () => (
  <Create onClick={onClick} text="Create" />
);
