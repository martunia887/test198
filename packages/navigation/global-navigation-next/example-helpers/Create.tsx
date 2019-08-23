import React from 'react';

import { Create, CreateProps } from '../src';

const onClick = () => {
  console.log('Create clicked');
};

export const DefaultCreate = (props: CreateProps) => (
  <Create {...props} onClick={onClick} text="Create" />
);
