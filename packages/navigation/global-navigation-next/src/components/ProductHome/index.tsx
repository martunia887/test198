/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Outer } from './styled';
import { productIconStyles, productWordmarkStyles } from './styles';
import { ProductHomeProps } from './types';

export const ProductHome = ({
  icon: Icon,
  wordmark: Wordmark,
}: ProductHomeProps) => (
  <Outer>
    <div css={productWordmarkStyles}>
      <Wordmark />
    </div>
    <div css={productIconStyles}>
      <Icon size="small" />
    </div>
  </Outer>
);
