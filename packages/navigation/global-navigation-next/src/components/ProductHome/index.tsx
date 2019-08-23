import React from 'react';
import { Outer } from './styled';
import { ProductHomeProps } from './types';
import { PRODUCT_HOME_BREAKPOINT } from '../../common/constants';

type Props = ProductHomeProps & {
  width?: number;
};

export const ProductHome = ({
  icon: Icon,
  width,
  wordmark: Wordmark,
}: Props) => (
  <Outer>
    {width && width < PRODUCT_HOME_BREAKPOINT ? (
      <Icon size="small" />
    ) : (
      <Wordmark />
    )}
  </Outer>
);
