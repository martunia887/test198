/** @jsx jsx */
import WidthDetector from '@atlaskit/width-detector';
import { jsx } from '@emotion/core';
import { Fragment, FC } from 'react';
import {
  ProductItemSkeleton,
  PlatformItemSkeleton,
  ProfileItemSkeleton,
} from '../Item';
import { CreateSkeleton } from './Create';
import { ProductHomeSkeleton } from './ProductHome';
import { SearchSkeleton } from './Search';
import getStyles from './styles';

interface Props {
  productItemCount: number;
  platformItemCount: number;
}

export const GlobalNavigationSkeleton: FC<Props> = ({
  productItemCount = 4,
  platformItemCount = 4,
}) => {
  const styles = getStyles();

  return (
    <WidthDetector containerStyle={styles.outer as any}>
      {(width: number | undefined) => (
        <Fragment>
          <div css={styles.left}>
            <ProductHomeSkeleton width={width} />
            {new Array(productItemCount).fill(null).map((_, index) => (
              <ProductItemSkeleton key={index} />
            ))}
          </div>
          <div css={styles.right}>
            <CreateSkeleton width={width} />
            <SearchSkeleton />
            {new Array(productItemCount).fill(null).map((_, index) => (
              <PlatformItemSkeleton key={index} />
            ))}
            <ProfileItemSkeleton />
          </div>
        </Fragment>
      )}
    </WidthDetector>
  );
};
