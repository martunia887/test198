import React from 'react';
import { ProductProps } from './types';
import { Outer } from './primitives';

type Props = ProductProps & {
  width?: number;
};

export const ProductHome = ({
  icon: Icon,
  width,
  wordmark: Wordmark,
}: Props) => {
  return (
    <Outer>
      {width && width < 1280 ? <Icon size="small" /> : <Wordmark />}
    </Outer>
  );
};
