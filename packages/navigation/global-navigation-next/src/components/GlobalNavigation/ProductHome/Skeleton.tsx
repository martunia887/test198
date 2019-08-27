import React, { Fragment, FC } from 'react';
import { Outer, IconSkeleton, WordmarkSkeleton } from './styled';
import { PRODUCT_HOME_BREAKPOINT } from '../../../common/constants';

type Props = {
  width?: number;
};

export const ProductHomeSkeleton: FC<Props> = ({ width }) => {
  return (
    <Outer>
      {width && width < PRODUCT_HOME_BREAKPOINT ? (
        <IconSkeleton />
      ) : (
        <Fragment>
          <IconSkeleton />
          <WordmarkSkeleton />
        </Fragment>
      )}
    </Outer>
  );
};
