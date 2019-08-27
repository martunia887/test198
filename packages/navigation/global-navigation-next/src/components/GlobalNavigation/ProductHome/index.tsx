import React, { Fragment } from 'react';
import { ProductProps } from './types';
import { Outer } from './styled';
import { PRODUCT_HOME_BREAKPOINT } from '../../../common/constants';

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
      {width && width < PRODUCT_HOME_BREAKPOINT ? (
        <Icon size="small" />
      ) : (
        <Fragment>
          <Icon size="small" />
          <Wordmark />
        </Fragment>
      )}
    </Outer>
  );
};

export { ProductHomeSkeleton } from './Skeleton';
